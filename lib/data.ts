import { searchDatasets } from "@/lib/queries/dataset";
import { Dataset } from "@/schemas/dataset.interface";
import { unstable_cache } from "next/cache";
import { z } from "zod";

// FIXME: how can we prevent simulateneous cache revalidations
// when a cache revalidation is requested while another is already
// running? Woudln't happen with revalidate set to false
export const getCachedDatasets = unstable_cache(
  async () => {
    console.log("Revalidating datasets cache: ", new Date().getTime());
    const allDatasets: Dataset[] = [];
    const limit = 10;
    let page = 0;
    while (true) {
      const pageDatasets = await searchDatasets({
        limit,
        offset: limit * page,
        groups: [],
        orgs: [],
        tags: [],
      });

      if (!pageDatasets?.results?.length) {
        break;
      }

      allDatasets.push(...pageDatasets.results);
      page++;
    }
    return allDatasets;
  },
  ["cached-datasets"],
  {
    revalidate: false, // TODO: what happens if the UI triggers a time-based revalidation?
  }
);

export const searchOptionsSchema = z.object({
  limit: z
    .preprocess((x) => Number(x), z.number().min(0).max(25))
    .optional()
    .default(10),
  page: z
    .preprocess((x) => Number(x), z.number().min(1))
    .optional()
    .default(1),
});

type SearchOptions = z.infer<typeof searchOptionsSchema>;

// NOTE: for search, I think we should use a lib like minisearch
// for the FTS, and use a DTO to return results. We could even
// cache this list of datasets DTO. This would reduce data transfer
// and increase performance in the pages that use search
// The search index can be a module-level singleton, it doesn't have
// to be cached
export async function searchCachedDatasets(options: SearchOptions) {
  const { page, limit } = options;
  const allDatasets = await getCachedDatasets();
  const filteredDatasets = allDatasets;
  // NOTE: maybe https://github.com/itemsapi/itemsjs instead of minisearch ?

  const startIdx = (page - 1) * limit;
  const endIdx = startIdx + limit;
  const paginatedDatasets = filteredDatasets.slice(startIdx, endIdx);
  return { results: paginatedDatasets, count: filteredDatasets.length };
}

