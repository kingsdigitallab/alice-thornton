/* global d3 */

// JSON containing the event data
const eventsSource = "/assets/js/events.json";

// Map the keys in the data to the desired table headers
const tableHeaderMapping = {
  year: "Year",
  entityEventCount: "Number of Events in Thornton's Books",
  historicalEventCount: "Number of Historical Events",
  birthEventCount: "Number of Births",
  deathEventCount: "Number of Deaths",
  marriageEventCount: "Number of Marriages",
  entityEvents: "Events in Thornton's Books",
  historicalEvents: "Historical Events",
  lifetimeEvents: "Important Events in Thornton's Life",
};

/*
HELPER FUNCTIONS
*/

// Helper function to add CSS class names to cells based on lifetime events in the data
function addLifetimeCss(row, columnKey, subtype) {
  if (!row.lifetimeEvents || !row[columnKey] || row[columnKey] <= 0) return "";

  const matchingEvents = row.lifetimeEvents.filter(
    (event) => event.subtype === subtype
  );

  return matchingEvents
    .map((event) => event.cssClass || "") // Remove empty classes
    .filter((cssClass) => cssClass !== "") // Join multiple classes (if any) with spaces
    .join(" ");
}

// Helper function to create the hidden row containing event details for the modal
function renderHiddenRow(row, tbody, columnSpan) {
  // Filter array fields from the row
  const arrayColumns = Object.keys(row).filter(
    (key) => Array.isArray(row[key]) && row[key].length > 0
  );

  // Skip if no array data exists
  if (arrayColumns.length === 0) return;

  // Add a toggle button to the corresponding main row's year cell
  // Button is for screen readers only; visual users click on the row
  const mainRowYearCell = d3.select(`.details-${row.year} .year`);
  mainRowYearCell
    .append("button")
    .attr("class", "toggle-button visually-hidden")
    .attr("data-target", `hidden-${row.year}`)
    .text("Toggle details");

  // Append a new hidden row immediately after the main row
  const hiddenRow = tbody
    .append("tr")
    .attr("id", `hidden-${row.year}`) // Unique id as target for mainRow data-target
    .attr("class", `hiddenRow details-hidden-${row.year}`)
    .attr("hidden", true);

  const hiddenCell = hiddenRow.append("td").attr("colspan", columnSpan); // Span all columns

  arrayColumns.forEach((key) => {
    const events = row[key];
    const eventCount = events.length;
    if (eventCount > 0) {
      const container = hiddenCell
        .append("div")
        .attr("class", `container-${key}`);

      // If there's only one event, replace "Events" with "Event"
      let eventLabel = tableHeaderMapping[key] || key;
      if (eventCount === 1) {
        eventLabel = eventLabel.replace("Events", "Event");
      }
      // Heading for column, including the number of events
      container.append("h3").text(`${eventCount} ${eventLabel}`);

      // List for the array items
      const list = container.append("ul").attr("class", `items-${key}`);

      // List items, with specific handling for historical events
      list
        .selectAll("li")
        .data(events)
        .enter()
        .append("li")
        .attr("class", (d) => `item-${d.type}`)
        .each(function (d) {
          const listItem = d3.select(this);

          // Title as header only for historical events
          if (key === "historicalEvents") {
            listItem.append("h4").text(d.title);
          } else {
            listItem.text(d.title);
          }

          // Image with alt text
          if (d.image) {
            listItem
              .append("img")
              .attr("src", d.image)
              .attr("alt", d.imageAlt || "Event image")
              .attr(
                "class",
                d.imageOrientation ? `img-${d.imageOrientation}` : ""
              );
          }

          // Description
          if (d.description) {
            listItem.append("p").text(d.description);
          }
        });
    }
  });

  // Add a close button at the bottom of the hidden row
  // For both screen readers and visual users
  hiddenCell
    .append("div")
    .attr("class", "hidden-row-footer")
    .append("button")
    .attr("class", "hidden-close")
    .attr("data-target", `hidden-${row.year}`)
    .text("Close");
}

// Helper function to initialise toggle row interactions
function initializeRowInteractions() {
  // Handle row clicks for visual users
  d3.selectAll(".mainRow").on("click", function () {
    const targetId = d3.select(this).attr("data-target");
    const hiddenRow = d3.select(`#${targetId}`);

    if (!hiddenRow.node()) return; // Skip if no hidden row exists for this main row

    const isExpanded = d3.select(this).attr("aria-expanded") === "true";

    // Close all other open rows so that the row can be used as a modal
    d3.selectAll(".hiddenRow:not([hidden])").each(function () {
      d3.select(this).attr("hidden", true);
      const parentRow = d3.select(`.mainRow[data-target="${this.id}"]`);
      if (parentRow.node()) {
        parentRow.attr("aria-expanded", "false");
      }
    });

    // Toggle the current hidden row
    d3.select(this).attr("aria-expanded", !isExpanded);
    hiddenRow.property("hidden", isExpanded);

    // Disable scrolling on body when the hidden row is made visible
    const scrollY = window.scrollY; // Store the scroll position otherwise it gets lost
    d3.select("body")
      .classed("no-scroll", !isExpanded)
      .attr("data-scroll-position", scrollY);
  });

  // Handle "Toggle Details" button clicks for screen reader users
  d3.selectAll(".toggle-button").on("click", function (event) {
    event.stopPropagation(); // Prevent row click behavior interfering

    const targetId = d3.select(this).attr("data-target");
    const hiddenRow = d3.select(`#${targetId}`);

    if (!hiddenRow.node()) return;

    const isExpanded = !hiddenRow.property("hidden");

    // Only toggle the current hidden row without affecting others
    const parentRow = d3.select(`.mainRow[data-target="${targetId}"]`);
    if (parentRow.node()) {
      parentRow.attr("aria-expanded", !isExpanded);
    }

    hiddenRow.property("hidden", isExpanded);
  });

  // Handle "Close" button clicks for all users
  d3.selectAll(".hidden-close").on("click", function () {
    const targetId = d3.select(this).attr("data-target");
    const hiddenRow = d3.select(`#${targetId}`);

    if (!hiddenRow.node()) return;

    // Close the specific hidden row
    hiddenRow.property("hidden", true);

    // Re-enable scrolling on body when hidden row is hidden again
    const savedScrollY = d3.select("body").attr("data-scroll-position");
    d3.select("body").classed("no-scroll", false);
    window.scrollTo(0, savedScrollY); // Restore scroll position

    // Update the aria-expanded attribute on the parent row
    const parentRow = d3.select(`.mainRow[data-target="${targetId}"]`);
    if (parentRow.node()) {
      parentRow.attr("aria-expanded", "false");
    }
  });
}

/*
TABLE CREATION FUNCTIONS
*/

// Function to create a table for each decade of events
function createTableForEachDecade(data) {
  const yearObjects = data.data;
  const groupedByDecade = d3.group(
    yearObjects,
    (row) => Math.floor(row.year / 10) * 10
  );

  const maxEventCount = d3.max(yearObjects, (d) => d.entityEventCount);

  // Non-linear scale to make smaller values a bit larger relatively
  // Scaled value is used in the frontend by the CSS to control the size of visual elements
  const scale = d3
    .scalePow()
    .exponent(0.8)
    .domain([0, maxEventCount])
    .range([0, 80]);

  groupedByDecade.forEach((decadeData, decade) => {
    createTable(decadeData, decade, scale);
  });
}

// Function to create a table that forms the basis of the data visualisation
function createTable(data, decade, scale) {
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

  const tbody = table.append("tbody");

  // Create rows for each data entry
  data.forEach((row) => {
    // Create the main row for year and event counts
    const mainRow = tbody
      .append("tr")
      .attr("class", `details-${row.year} mainRow`)
      .attr("data-target", `hidden-${row.year}`)
      .attr("aria-expanded", "false")
      .attr("aria-description", "Toggle details");

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
      .attr("class", (d) => {
        // Add a class that matches the header
        let baseClass = d.header;

        // Add 'present' only if the value is greater than 0 and the field is not 'year'
        if (d.value > 0 && d.header !== "year") {
          baseClass += " present";
        }

        // Define a mapping of headers to event subtypes
        const lifetimeEventMapping = {
          birthEventCount: "birth",
          deathEventCount: "death",
          marriageEventCount: "marriage",
        };

        // Add CSS classes for any lifetime event subtype in the mapping
        if (lifetimeEventMapping[d.header]) {
          baseClass += ` ${addLifetimeCss(
            row,
            d.header,
            lifetimeEventMapping[d.header]
          )}`;
        }

        return baseClass;
      })
      // Set CSS variable for entity (book) event cells only
      .style("--event-value", (d) =>
        d.header === "entityEventCount" ? `${scale(d.value)}%` : null
      )
      .each((d, i, nodes) => {
        const cell = d3.select(nodes[i]);

        // Add the year value as a span
        cell.append("span").text(d.value != null ? d.value : "N/A");

        // Add data attributes for when the books were written
        // so that symbols/tooltips can be added using pseudo element selectors
        if (d.header === "year") {
          const bookData = {
            1659: { id: "R", tooltip: "Book Rem: written c.1659-1673" },
            1668: { id: "1", tooltip: "Book One: written c.1668-1687" },
            1685: { id: "2", tooltip: "Book Two: written c.1685-1695" },
            1692: { id: "3", tooltip: "Book Three: written c. 1692-1696" },
          };

          const year = d.value.toString();

          if (bookData[year]) {
            cell.attr("data-book-id", bookData[year].id);
            cell.attr("data-book-tooltip", bookData[year].tooltip);
          }
        }

        // Add data-title for birth, death, marriage, and historical event counts
        cell.attr("data-title", (d) => {
          if (
            [
              "birthEventCount",
              "deathEventCount",
              "marriageEventCount",
            ].includes(d.header)
          ) {
            // Find the first matching lifetime event
            const matchingEvent = row.lifetimeEvents?.find(
              (event) => event.subtype === d.header.replace("EventCount", "")
            );
            return matchingEvent ? matchingEvent.title : null;
          } else if (d.header === "historicalEventCount") {
            // Get all historical event titles and join them
            const historicalTitles = row.historicalEvents
              ?.map((event) => event.title)
              .filter(Boolean)
              .join("& ");
            return historicalTitles && historicalTitles.length > 0
              ? historicalTitles
              : null;
          }
          return null;
        });

        // Add data attribute for tooltips for entity (book) and historical event counts
        cell.attr("data-tooltip-suffix", (d) => {
          if (
            (d.header === "entityEventCount" ||
              d.header === "historicalEventCount") &&
            d.value > 0
          ) {
            const eventType =
              d.header === "entityEventCount"
                ? "book event"
                : "historical event";
            return d.value === 1 ? eventType : `${eventType}s`; // Singular for 1, plural for 2+
          }
          return null; // No attribute for 0 events
        });
      });

    // Create the hidden row for array data
    renderHiddenRow(row, tbody, headers.length);
  });
}

// Load the data JSON and then create the tables
window.onload = function () {
  d3.json(eventsSource)
    .then((jsonData) => {
      createTableForEachDecade(jsonData);
      initializeRowInteractions();
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });
};
