import Link from "next/link";
import { Dataset } from "@portaljs/ckan";
import styles from "../../styles/IndividualPage.module.scss";

export default function ListOfDatasets({
  datasets,
}: {
  datasets: Array<Dataset>;
}) {
  return (
    <div className={styles.grid}>
      {datasets.map((dataset) => (
        <Link
          key={dataset.id}
          href={`/org/${dataset.organization?.name}/${dataset.name}`}
          className={styles.card}
        >
          <h2>{dataset.title} &rarr;</h2>
          <p>{dataset.notes}</p>
        </Link>
      ))}
    </div>
  );
}
