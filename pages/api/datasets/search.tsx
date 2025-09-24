import { searchCachedDatasets, searchOptionsSchema } from "@/lib/data";
import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const validatedOptions = searchOptionsSchema.parse(req.query);
      const results = await searchCachedDatasets(validatedOptions);

      res.status(200).json(results);
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(400).json({ message: "Validation Error", errors: e.issues });
      }
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
