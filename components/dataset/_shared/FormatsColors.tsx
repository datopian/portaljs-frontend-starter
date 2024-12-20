const TextColors = {};
const BgColors = {};

export const resourceFormatColors = {
  PDF: "#D32F2F", // Bold red for important, universal documents
  CSV: "#FFD54F", // Bright yellow for tabular, spreadsheet-like structure
  JSON: "#81D4FA", // Light blue for web-friendly, structured data
  ODS: "#AED581", // Green for open-source and eco-friendly format
  XLS: "#4CAF50", // Standard green for Excel spreadsheets
  XLSX: "#66BB6A", // Slightly lighter green for updated Excel format
  DOC: "#1E88E5", // Bright blue for Word documents
  SHP: "#8E24AA", // Purple for complex geospatial data
  HTML: "#FF7043", // Bright orange for web markup
  XML: "#F4511E", // Deep orange for structured, tree-like data
  ZIP: "#757575", // Neutral gray for compressed archives
  TXT: "#9E9D24", // Yellow-green for simple text
  TSV: "#FFA000", // Deep amber for tab-separated values
  GEOJSON: "#43A047", // Forest green for geospatial JSON
  WMS: "#4DD0E1", // Aqua blue for map services
  KML: "#7CB342", // Olive green for Keyhole markup (mapping)
  GPX: "#64B5F6", // Light sky blue for GPS data
  MP4: "#E57373", // Soft red for video format
  AVI: "#FFAB91", // Peach for an older video format
  JSONL: "#0288D1", // Darker blue for streaming JSON
  DOCX: "#1976D2", // Rich blue for modern Word format
  PPT: "#FF9800", // Bright orange for presentations
  PPTX: "#FB8C00", // Slightly darker orange for modern presentations
  RAR: "#5D4037", // Dark brown for compressed archives
  TAR: "#6D4C41", // Earthy brown for tarballs
  JPG: "#FFEB3B", // Bright yellow for photography
  PNG: "#4FC3F7", // Sky blue for lossless graphics
  SVG: "#66BB6A", // Green for scalable and eco-friendly vector graphics
};

Object.keys(resourceFormatColors).forEach((format) => {
  TextColors[format] = `text-[${resourceFormatColors[format]}]`;
  BgColors[format] = `bg-[${resourceFormatColors[format]}]`;
});

export const resourceTextColors = TextColors;

export const resourceBgColors = BgColors;
