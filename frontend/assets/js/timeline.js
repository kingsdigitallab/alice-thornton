/* global d3 */

// JSON data
const jsonData = [
  { year: "1600", event: 0, important: 0 },
  { year: "1601", event: 0, important: 0 },
  { year: "1602", event: 1, important: 1 },
  { year: "1603", event: 0, important: 0 },
  { year: "1604", event: 3, important: 0 },
  { year: "1605", event: 0, important: 0 },
  { year: "1606", event: 0, important: 0 },
  { year: "1607", event: 1, important: 2 },
  { year: "1608", event: 2, important: 0 },
  { year: "1609", event: 4, important: 0 },
  { year: "1610", event: 5, important: 3 },
  { year: "1611", event: 3, important: 0 },
  { year: "1612", event: 4, important: 0 },
  { year: "1613", event: 12, important: 0 },
  { year: "1614", event: 13, important: 1 },
  { year: "1615", event: 4, important: 1 },
  { year: "1616", event: 3, important: 0 },
  { year: "1617", event: 1, important: 0 },
  { year: "1618", event: 2, important: 0 },
  { year: "1619", event: 4, important: 0 },
  { year: "1620", event: 19, important: 1 },
  { year: "1621", event: 3, important: 0 },
  { year: "1622", event: 1, important: 0 },
  { year: "1623", event: 12, important: 0 },
  { year: "1623", event: 4, important: 0 },
];

// Function to create a table for each decade of events
function createTableForEachDecade(data) {
  // Group data by decade
  const groupedByDecade = d3.group(
    data,
    (row) => Math.floor(row.year / 10) * 10
  );

  // Get the maximum number of events in any year
  const maxEventCount = d3.max(data, (d) => d.event);

  // Iterate over each decade group
  groupedByDecade.forEach((decadeData, decade) => {
    console.log(`Creating table for decade: ${decade}s`);
    createTable(decadeData, decade, maxEventCount);
  });
}

// Function to create a table that forms the basis of the data visualisation
function createTable(data, decade, maxEventCount) {
  // Select the data container and add the table
  const container = d3.select("#data");
  const table = container.append("table");

  // Add accessibility caption
  table
    .append("caption")
    .text(`Events in ${decade}s`)
    .attr("class", "visually-hidden");

  // Add table headers
  const headers = Object.keys(data[0]);
  const headerRow = table.append("thead").append("tr");
  headerRow
    .attr("class", "visually-hidden")
    .selectAll("th")
    .data(headers)
    .enter()
    .append("th")
    .text((d) => d);

  // Add table rows
  const rows = table.append("tbody");
  rows.selectAll("tr").data(data).enter().append("tr");

  // Add table data (cells) to rows
  rows
    .selectAll("tr")
    .selectAll("td")
    .data((row) => headers.map((header) => ({ header, value: row[header] }))) // Map header and value
    .enter()
    .append("td")
    // Add a class that matches the header and add 'present' if there are events present
    .attr("class", (d) => (d.value > 0 ? `${d.header} present` : d.header))
    // Set CSS variable for 'event' cells only
    .style("--event-value", (d) =>
      d.header === "event" ? `${(d.value / maxEventCount) * 100}%` : null
    )
    // Wrap the cell content in a <span> for display purposes
    .append("span")
    .text((d) => d.value);
}

// Wrap the code in a window load event
window.onload = function () {
  // Call the function with your JSON data
  createTableForEachDecade(jsonData);
};

// Alternative for when we are drawing from json
// window.onload = function () {
//   d3.json("path/to/data.json").then(jsonData => {
//     createTable(jsonData);
//   }).catch(error => {
//     console.error("Error loading JSON data:", error);
//   });
// };
