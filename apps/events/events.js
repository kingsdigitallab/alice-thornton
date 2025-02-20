"use strict";

const fs = require("fs");

const sourceEntities = require("../../frontend/assets/js/entities.json");
const sourceHistoricalEvents = require("./data/historical-events.json");
const sourceLifetimeEvents = require("./data/lifetime-events.json");

const target = "../../frontend/assets/js/events.json";

class Events {
  // Default startYear is beginning of decade of AT's birth
  // Default endYear is year of AT's death
  constructor(startYear = 1620, endYear = 1707) {
    this.data = [];
    this.startYear = startYear;
    this.endYear = endYear;
    // Initialise the skeleton of years
    for (
      let year = parseInt(this.startYear);
      year <= parseInt(this.endYear);
      year++
    ) {
      this.data.push({ year });
    }
  }

  // Helper to find the earliest possible year in an EDTF date
  // See: https://www.loc.gov/standards/datetime/
  // In the absence of complex requirements we use the simplest approach of regex
  findEarliestYear(edtfDate) {
    if (typeof edtfDate !== "string") {
      return null;
    }
    const match = edtfDate.match(/^\d{4}/);
    return match ? parseInt(match[0], 10) : null;
  }

  // Count number of events per year of specified type, with optional subtype
  // Optional subtype is the starting substring of the "title" field
  // Subtype is case insensitive
  countEventsPerYear(
    eventsData,
    eventType,
    propertyName,
    titleStartSubstring = null
  ) {
    this.data.forEach((yearEntry) => {
      const year = yearEntry.year;

      yearEntry[propertyName] = eventsData.data.filter((event) => {
        const matchesType = event.type === eventType;
        const matchesYear = this.findEarliestYear(event.date) === year;
        const matchesSubstring = titleStartSubstring
          ? event.title &&
            event.title
              .toLowerCase()
              .startsWith(titleStartSubstring.toLowerCase())
          : true;
        return matchesType && matchesYear && matchesSubstring;
      }).length;
    });
  }

  // Add list of events per year of specified type from json file
  addEventsPerYear(eventsData, eventType, propertyName) {
    // Initialize the specified property as an empty list for each year
    this.data.forEach((yearEntry) => {
      if (!yearEntry[propertyName]) {
        yearEntry[propertyName] = [];
      }
    });

    // Iterate through events to assign them to the correct year
    eventsData.data.forEach((event) => {
      if (event.type === eventType) {
        const year = this.findEarliestYear(event.date);
        const yearEntry = this.data.find((entry) => entry.year === year);
        if (yearEntry) {
          yearEntry[propertyName].push(event);
        }
      }
    });
  }

  // Write the compiled events data to the target file
  writeJson(encoding = "utf8") {
    const data = {
      meta: {
        // Add metadata to distinguish files generated at different times
        dateCreated: new Date().toISOString(),
      },
      data: this.data,
    };
    const eventsStr = JSON.stringify(data, null, 2);

    try {
      fs.writeFileSync(target, eventsStr, encoding);
      console.log(
        `WRITE ${target} (${(eventsStr.length / 1024 / 1024).toFixed(2)} MB)`
      );
    } catch (error) {
      console.error(`Failed to write file ${target}:`, error.message);
    }
  }
}

module.exports = Events;

if (require.main === module) {
  const events = new Events();
  events.countEventsPerYear(sourceEntities, "event", "entityEventCount");
  events.countEventsPerYear(
    sourceHistoricalEvents,
    "historical-event",
    "historicalEventCount"
  );
  events.countEventsPerYear(
    sourceLifetimeEvents,
    "lifetime-event",
    "birthEventCount",
    "birth"
  );
  events.countEventsPerYear(
    sourceLifetimeEvents,
    "lifetime-event",
    "deathEventCount",
    "death"
  );
  events.countEventsPerYear(
    sourceLifetimeEvents,
    "lifetime-event",
    "marriageEventCount",
    "marriage"
  );
  events.addEventsPerYear(
    sourceHistoricalEvents,
    "historical-event",
    "historicalEvents"
  );
  events.addEventsPerYear(
    sourceLifetimeEvents,
    "lifetime-event",
    "lifetimeEvents"
  );
  events.addEventsPerYear(sourceEntities, "event", "entityEvents");
  events.writeJson();
}
