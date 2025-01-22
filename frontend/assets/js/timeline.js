/* global d3 */

// JSON containing the event data
const eventsSource = "/assets/js/events.json";

// Map the keys in the data to the desired table headers
const tableHeaderMapping = {
  year: "Year",
  entityEventCount: "Number of Events Recorded in Alice Thornton's Books",
  historicalEventCount: "Number of Historical Events",
  birthEventCount: "Number of Births",
  deathEventCount: "Number of Deaths",
  marriageEventCount: "Number of Marriages",
  entityEvents: "Events Recorded in Alice Thornton's Books",
  historicalEvents: "Historical Events",
  lifetimeEvents: "Important Events During Alice Thornton's Lifetime",
};

// Helper function to create the hidden row containing event details for the modal
function renderHiddenRow(row, tbody, columnSpan) {
  // Filter array fields from the row
  const arrayColumns = Object.keys(row).filter(
    (key) => Array.isArray(row[key]) && row[key].length > 0
  );

  // Skip if no array data exists
  if (arrayColumns.length === 0) return;
  console.log(arrayColumns);

  // Append a new hidden row immediately after the main row
  const hiddenRow = tbody
    .append("tr")
    .attr("class", `hiddenRow details-hidden-${row.year}`);

  const hiddenCell = hiddenRow.append("td").attr("colspan", columnSpan); // Span all columns

  arrayColumns.forEach((key) => {
    const events = row[key];
    if (events.length > 0) {
      // Add a container div for each array column
      const container = hiddenCell
        .append("div")
        .attr("class", `container-${key}`);

      // Add a heading for the column
      container.append("h3").text(tableHeaderMapping[key] || key);

      // Add a list for the array items
      const list = container.append("ul").attr("class", `items-${key}`);

      // Add list items
      list
        .selectAll("li")
        .data(events)
        .enter()
        .append("li")
        .attr("class", (d) => `item-${d.type}`)
        .text((d) => d.title);
    }
  });
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
  // Only include headers for year and event counts (i.e. primitive value columns: single numbers)
  // Event details for the modal will be put into a hidden row later
  const headers = Object.keys(data[0]).filter(
    (key) => !Array.isArray(data[0][key])
  );
  const headerRow = table.append("thead").append("tr");
  headerRow
    .attr("class", "visually-hidden")
    .selectAll("th")
    .data(headers)
    .enter()
    .append("th")
    .text((d) => tableHeaderMapping[d] || d);

  // Add table body
  const tbody = table.append("tbody");

  // Create rows for each data entry
  data.forEach((row) => {
    // Create the main row for year and event counts
    const mainRow = tbody
      .append("tr")
      .attr("class", `details-${row.year} mainRow`);

    mainRow
      .selectAll("td")
      .data(() =>
        headers.map((header) => ({
          header,
          value: row[header],
        }))
      )
      .enter()
      .append("td")
      // Add a class that matches the header and add 'present' if there are events present
      .attr("class", (d) => (d.value > 0 ? `${d.header} present` : d.header))
      // Set CSS variable for entity (book) event cells only
      .style("--event-value", (d) =>
        d.header === "entityEventCount" ? `${scale(d.value)}%` : null
      )
      // Render the year and event count values
      .append("span")
      .text((d) => (d.value != null ? d.value : "N/A"));

    // Create the hidden row for array data
    renderHiddenRow(row, tbody, headers.length);
  });
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
