const expectedEntityEventsList = [
  {
    year: 1650,
    entityEvents: [
      {
        type: "event",
        id: "1",
        sortkey: "",
        search: "",
        title: "",
        cat: "",
        group: "",
        date: "1650",
        pages: {},
        books: [],
      },
      {
        type: "event",
        id: "5",
        sortkey: "",
        search: "",
        title: "",
        cat: "",
        group: "",
        date: "1650~",
        pages: {},
        books: [],
      },
      {
        type: "event",
        id: "7",
        sortkey: "",
        search: "",
        title: "",
        cat: "",
        group: "",
        date: "1650-02-14/1655-03-02",
        pages: {},
        books: [],
      },
    ],
  },
  {
    year: 1651,
    entityEvents: [
      {
        type: "event",
        id: "2",
        sortkey: "",
        search: "",
        title: "",
        cat: "",
        group: "",
        date: "1651",
        pages: {},
        books: [],
      },
      {
        type: "event",
        id: "3",
        sortkey: "",
        search: "",
        title: "",
        cat: "",
        group: "",
        date: "1651",
        pages: {},
        books: [],
      },
    ],
  },
  { year: 1652, entityEvents: [] },
];

const expectedHistoricalEventsList = [
  {
    year: 1650,
    historicalEvents: [
      {
        type: "historical-event",
        id: "11",
        title: "War of the Words",
        description: "",
        date: "1650",
      },
    ],
  },
  {
    year: 1651,
    historicalEvents: [
      {
        type: "historical-event",
        id: "12",
        title: "Restoration of the Chaise Longue",
        description: "",
        date: "1651",
      },
      {
        type: "historical-event",
        id: "13",
        title: "Battle of Hastings",
        description: "",
        date: "1651",
      },
    ],
  },
  { year: 1652, historicalEvents: [] },
];

const expectedLifetimeEventsList = [
  {
    year: 1650,
    lifetimeEvents: [
      {
        type: "lifetime-event",
        id: "21",
        title: "Birth of a new era",
        description: "",
        date: "1650",
      },
    ],
  },
  {
    year: 1651,
    lifetimeEvents: [
      {
        type: "lifetime-event",
        id: "22",
        title: "Marriage of convenience",
        description: "",
        date: "1651",
      },
      {
        type: "lifetime-event",
        id: "23",
        title: "Death of a salesman",
        description: "",
        date: "1651",
      },
    ],
  },
  { year: 1652, lifetimeEvents: [] },
];

module.exports = {
  expectedEntityEventsList,
  expectedHistoricalEventsList,
  expectedLifetimeEventsList,
};
