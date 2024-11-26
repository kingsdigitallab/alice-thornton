/* global d3 */

// JSON containing the event data
const eventsSource = "/assets/js/event-counts-by-year.json";

// Map the keys in the data to the desired table headers
const tableHeaderMapping = {
  year: "Year",
  event: "Number of Events",
  important: "Number of Important Historical Events",
};

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
    .text((d) => tableHeaderMapping[d] || d);

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

// Load the data JSON and then create the tables
window.onload = function () {
  d3.json(eventsSource)
    .then((jsonData) => {
      createTableForEachDecade(jsonData);
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });
};
