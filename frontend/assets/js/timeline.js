/* global d3 */

// JSON containing the event data
const eventsSource = "/assets/js/events.json";

// Map the keys in the data to the desired table headers
const tableHeaderMapping = {
  year: "Year",
  entityEventCount: "Number of Book Events",
  politicalEventCount: "Number of Historical and Political Events",
  entityEvents: "Events Recorded in Alice Thornton's Books",
  politicalEvents: "Coinciding Historical and Political Events",
  lifetimeEvents: "Important Events During Alice Thornton's Lifetime",
};

// Helper function to output HTML from data array
// Complex event data is returned in list format for display intended as a modal
// Primitive (single) values are returned as-is wrapped in a <span> for display
function renderCellContent(cellData, container) {
  // Handle complex event data (array values)
  if (Array.isArray(cellData)) {
    const className = container.attr("class");

    // Wrap everything in the cell in a <div>
    const cellContainer = container
      .attr("aria-expanded", "false")
      .append("div")
      .attr("class", "modal-content visually-hidden");

    // Only add heading and list if there are items
    if (cellData.length > 0) {
      // Add heading based on column heading
      cellContainer.append("h3").text(() => {
        return tableHeaderMapping[className] || "";
      });

      // Add a list to hold all the event items
      const listContainer = cellContainer
        .append("ul")
        .attr("class", () => `items-${className}`);

      cellData.forEach((item) => {
        listContainer
          .append("li")
          .attr("class", `item-${item.type}`)
          .text(item.title);
      });
    }
  } else {
    // Handle simple data (primitive values)
    container.append("span").text(cellData != null ? cellData : "N/A");
  }
}

// Function to create a table for each decade of events
function createTableForEachDecade(data) {
  const yearObjects = data.data;
  // Group data by decade
  const groupedByDecade = d3.group(
    yearObjects,
    (row) => Math.floor(row.year / 10) * 10
  );

  // Non-linear scale to make smaller bubbles a bit larger relatively
  const maxEventCount = d3.max(yearObjects, (d) => d.entityEventCount); // Maximum number of events in any year
  const scale = d3
    .scalePow()
    .exponent(0.8)
    .domain([0, maxEventCount])
    .range([0, 100]);

  // Iterate over each decade group
  groupedByDecade.forEach((decadeData, decade) => {
    console.log(`Creating table for decade: ${decade}s`);
    createTable(decadeData, decade, scale);
  });
}

// Function to create a table that forms the basis of the data visualisation
function createTable(data, decade, scale) {
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
  rows
    .selectAll("tr")
    .data(data)
    .enter()
    .append("tr")
    .attr("class", (d) => `details-${d.year}`);

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
      d.header === "entityEventCount" ? `${scale(d.value)}%` : null
    )
    // Render cell content HTML
    .each((d, i, nodes) => renderCellContent(d.value, d3.select(nodes[i])));
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
