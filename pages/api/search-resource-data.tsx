import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import Papa from "papaparse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, query } = req.query;

  if (!url) {
    res.status(400).json({ error: "Missing 'url' query parameter." });
    return;
  }

  try {
    // Fetch the CSV file from the provided URL
    const response = await fetch(url as string);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV file: ${response.statusText}`);
    }

    const csvData = await response.text();

    // Parse the CSV data using PapaParse
    const rows = parseCsv(csvData);

    // Check if any row has a column matching the query
    const matchingRows = rows.filter((row) =>
      Object.values(row).some((columnValue) =>
        columnValue
          .toString()
          .toLowerCase()
          .includes((query as string).toLowerCase())
      )
    );

    res.status(200).json(matchingRows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
}

// Helper function to parse CSV data into JSON
function parseCsv(data: string): any[] {
  const result = Papa.parse(data, {
    header: true,
    skipEmptyLines: true,
  });

  if (result.errors.length > 0) {
    throw new Error(
      `CSV parsing errors: ${result.errors.map((e) => e.message).join(", ")}`
    );
  }

  return result.data;
}
