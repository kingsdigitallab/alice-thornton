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

const expectedPoliticalEventsList = [
  {
    year: 1650,
    politicalEvents: [
      {
        type: "political-event",
        id: "11",
        title: "War of the Words",
        description: "",
        date: "1650",
      },
    ],
  },
  {
    year: 1651,
    politicalEvents: [
      {
        type: "political-event",
        id: "12",
        title: "Restoration of the Chaise Longue",
        description: "",
        date: "1651",
      },
      {
        type: "political-event",
        id: "13",
        title: "Battle of Hastings",
        description: "",
        date: "1651",
      },
    ],
  },
  { year: 1652, politicalEvents: [] },
];

module.exports = { expectedEntityEventsList, expectedPoliticalEventsList };
