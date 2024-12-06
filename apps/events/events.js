"use strict";

const fs = require("fs");

const sourceEntities = require("../../frontend/assets/js/entities.json");
const sourceBookPeriods = require("./data/book-writing-periods.json");
const sourcePoliticalEvents = require("./data/political-events.json");

const target = "../../frontend/assets/js/events.json";

class Events {
  // Default startYear is beginning of decade of AR's birth
  // Default endYear is year of AR's death
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

  // Add number of entity events per year
  countEntityEvents(entities) {
    this.data.forEach((yearEntry) => {
      const year = yearEntry.year;
      yearEntry.entityEventCount = entities.data.filter(
        (entity) =>
          entity.type === "event" && this.findEarliestYear(entity.date) === year
      ).length;
    });
  }

  // Add number of political events per year
  countPoliticalEvents() {}

  // Add list of entity events per year from `entities.json`
  listEntityEventsEachYear(entities) {
    // Initialise an empty list for each year
    this.data.forEach((yearEntry) => {
      if (!yearEntry.entityEvents) {
        yearEntry.entityEvents = [];
      }
    });

    // Iterate through entities to assign them to the correct year
    entities.data.forEach((entity) => {
      if (entity.type === "event") {
        const year = this.findEarliestYear(entity.date);
        const yearEntry = this.data.find((entry) => entry.year === year);
        if (yearEntry) {
          yearEntry.entityEvents.push(entity);
        }
      }
    });
  }

  //   8. List of political events from `political-events.json`
  listPoliticalEventsEachYear() {}

  //   6. List of books written in each year
  listBooksWrittenEachYear() {}

  // Write the compiled events data to the target file
  writeJson() {
    const data = {
      meta: {
        // Add metadata to distinguish files generated at different times
        dateCreated: new Date().toISOString(),
      },
      data: this.data,
    };
    let eventsStr = JSON.stringify(data, null, 2);
    fs.writeFileSync(target, eventsStr, "utf8");
    console.log(
      `WRITE ${target} (${(eventsStr.length / 1024 / 1024).toFixed(2)} MB)`
    );
  }
}

module.exports = Events;

if (require.main === module) {
  const events = new Events();
  events.countEntityEvents(sourceEntities);
  events.listEntityEventsEachYear(sourceEntities);
  console.log(events.data);
  //   events.writeJson();
}
