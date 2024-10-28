import MiniSearch from 'minisearch'
import { Group } from '@portaljs/ckan'
import GroupCard from './GroupCard'

export default function ListOfGroups({
  groups,
  searchString,
  miniSearch,
}: {
  groups: Array<Group>
  searchString: string
  miniSearch: MiniSearch<any>
}) {
  //We only do search when the string is different from ""
  //Because otherwise minichsearch gives an empty list

  //We also only hide the element instead of recreating
  //Because thats faster especially to the display image
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {groups.map((group) => (
        <div
          className={`col-span-1 ${
            searchString !== '' &&
            !miniSearch
              .search(searchString, { prefix: true })
              .find((result) => result.id === group.id)
              ? 'hidden'
              : 'block'
          }`}
          key={group.id}
        >
          <GroupCard
            description={group.description}
            display_name={group.display_name}
            image_display_url={group.image_display_url}
            name={group.name}
          />
        </div>
      ))}
    </section>
  )
}
