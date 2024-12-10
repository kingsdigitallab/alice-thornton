const testEntities = require("./__mocks__/entities-mock.json");
const testPoliticalEvents = require("./__mocks__/political-events-mock.json");
const expectedData = require("./events.expected.js");
const Events = require("../events.js");

let expectedEvents;
let startYear;
let endYear;

beforeEach(() => {
  expectedEvents = [{ year: 1650 }, { year: 1651 }, { year: 1652 }];
  startYear = expectedEvents[0].year;
  endYear = expectedEvents[expectedEvents.length - 1].year;
});

test("Add yearly events from startYear to endYear inclusive", () => {
  const events = new Events(startYear, endYear);
  expect(events.data).toEqual(expectedEvents);
});

describe("Find the earliest year in an EDTF date", () => {
  const events = new Events();
  test.each([
    ["1650", 1650], // Simple year
    ["1650~", 1650], // Approximate year
    ["1650?", 1650], // Uncertain year
    ["1650%", 1650], // Uncertain approximate year
    ["1650-05", 1650], // Month
    ["1650-54~", 1650], // Approximate month
    ["1650-03-19", 1650], // Day
    ["1650/1655", 1650], // Year range
    ["1650%/1668", 1650], // Uncertain approximate range
    ["1650%/1655%", 1650], // Uncertain approximate range
    ["1650~/1652%", 1650], // Approximate uncertain range
    ["1650-12/1659-12", 1650], // Month range
    ["1650-02-14/1655-03-02", 1650], // Day range
    ["1650-09-17/1669-01", 1650], // Uneven range
    ["1650-06/1651-02-14", 1650], // Uneven range
    ["1650-05~/1652-08~", 1650], // Approximate month range
    ["1650-11~", 1650], // Approximate month
    ["", null], // Empty string
    [null, null], // Invalid input
  ])("parses %s to find earliest year %s", (input, expected) => {
    const result = events.findEarliestYear(input);
    expect(result).toBe(expected);
  });
});

test("Add number of entity events per year", () => {
  const events = new Events(startYear, endYear);
  events.countEntityEvents(testEntities);
  expect(events.data).toEqual([
    { year: 1650, entityEventCount: 3 },
    { year: 1651, entityEventCount: 2 },
    { year: 1652, entityEventCount: 0 },
  ]);
});

test("Add number of political events per year", () => {
  const events = new Events(startYear, endYear);
  events.countPoliticalEvents(testPoliticalEvents);
  expect(events.data).toEqual([
    { year: 1650, politicalEventCount: 1 },
    { year: 1651, politicalEventCount: 2 },
    { year: 1652, politicalEventCount: 0 },
  ]);
});

test("Add list of entity events per year", () => {
  const events = new Events(startYear, endYear);
  events.listEntityEventsEachYear(testEntities);
  expect(events.data).toEqual(expectedData.expectedEntityEventsList);
});

test("Add list of political events per year", () => {
  const events = new Events(startYear, endYear);
  events.listPoliticalEventsEachYear(testPoliticalEvents);
  expect(events.data).toEqual(expectedData.expectedPoliticalEventsList);
});
