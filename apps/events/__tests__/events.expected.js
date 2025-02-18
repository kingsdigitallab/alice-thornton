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
        image: "assetpath/",
        imageAlt: "image description",
        imageOrientation: "landscape",
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
        image: "assetpath/",
        imageAlt: "image description",
        imageOrientation: "portrait",
        date: "1651",
      },
      {
        type: "historical-event",
        id: "13",
        title: "Battle of Hastings",
        description: "",
        image: "assetpath/",
        imageAlt: "image description",
        imageOrientation: "landscape",
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
        subtype: "birth",
        id: "21",
        title: "Birth of a new era",
        description: "",
        cssClass: "alice",
        date: "1650",
      },
    ],
  },
  {
    year: 1651,
    lifetimeEvents: [
      {
        type: "lifetime-event",
        subtype: "marriage",
        id: "22",
        title: "Marriage of convenience",
        description: "",
        cssClass: "alice",
        date: "1651",
      },
      {
        type: "lifetime-event",
        subtype: "death",
        id: "23",
        title: "Death of a salesman",
        description: "",
        cssClass: "alice",
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
