const today = new Date().toISOString().split("T")[0];

export const defaultStartEnds = {
    startDate: "1991-06-29",
    endDate: today,
    startNumber: 1,
    endNumber: 3129,
    startDepth: 0,
    endDepth: 121,
    startTime: 0,
    endTime: 538,
    minDate: "1991-06-29",
    maxDate: today,
    minNumber: 1,
    maxNumber: 3129,
    minDepth: 0,
    maxDepth: 121,
    minTime: 0,
    maxTime: 538
};

export const defaultTileData = {
    diveInfo: {},
    sites: {},
    countries: {},
    buddies: {}
}

export const defaultFormats = {
    depthFormat: "m",
    dateFormat: "UK",
    maxTimeFormat: "minutes",
    cumuTimeFormat: "hours"
}

export const defaultSearchOptions = {
    dives: [
        ["main", "Dive", 1],
        ["comment", "Comment", 1],
        ["equipmentlist", "Equipment", 1],
        ["typeofdive", "Type of dive", 1]
    ],
    sites: [
        ["main", "Site", 1],
        ["site", "Site name", 1],
        ["location", "Location", 1],
        ["country", "Country", 1],
        ["comment", "Description", 1],
    ],
    buddies: [
        ["main", "Buddy", 1],
        ["name", "Name", 1],
        ["comment", "Comment", 1]
    ]
};

export const siteOptions = {
    dives: [
        ["main", "Dive", 0],
        ["comment", "Comment", 0],
        ["equipmentlist", "Equipment", 0],
        ["typeofdive", "Type of dive", 0]
    ],
    sites: [
        ["main", "Site", 0.4],
        ["site", "Site name", 1],
        ["location", "Location", 0],
        ["country", "Country", 0],
        ["comment", "Description", 0],
    ],
    buddies: [
        ["main", "Buddy", 0],
        ["name", "Name", 0],
        ["comment", "Comment", 0]
    ]
};

export const countryOptions = {
    dives: [
        ["main", "Dive", 0],
        ["comment", "Comment", 0],
        ["equipmentlist", "Equipment", 0],
        ["typeofdive", "Type of dive", 0]
    ],
    sites: [
        ["main", "Site", 0.4],
        ["site", "Site name", 0],
        ["location", "Location", 0],
        ["country", "Country", 1],
        ["comment", "Description", 0],
    ],
    buddies: [
        ["main", "Buddy", 0],
        ["name", "Name", 0],
        ["comment", "Comment", 0]
    ]
};

export const buddyOptions = {
    dives: [
        ["main", "Dive", 0],
        ["comment", "Comment", 0],
        ["equipmentlist", "Equipment", 0],
        ["typeofdive", "Type of dive", 0]
    ],
    sites: [
        ["main", "Site", 0],
        ["site", "Site name", 0],
        ["location", "Location", 0],
        ["country", "Country", 0],
        ["comment", "Description", 0],
    ],
    buddies: [
        ["main", "Buddy", 0.4],
        ["name", "Name", 1],
        ["comment", "Comment", 0]
    ]
};

export const defaultCheckboxList = [
    ['Shore', 'shore', - 1],
    ['Small boat', 'smallboat', - 1],
    ['Large boat', 'largeboat', - 1],
    ['Cave', 'cave', - 1],
    ['Fresh', 'fresh', - 1],
    ['Drift', 'drift', - 1],
    ['Night', 'night', - 1],
    ['Reef', 'reef', - 1],
    ['Wreck', 'wreck', - 1],
    ['Altitude', 'altitude', - 1],
    ['EAN', 'ean', - 1],
    ['Trimix', 'trimix', - 1],
    ['Deco', 'deco', - 1],
    ['Instructing', 'instructing', - 1],
    ['DPV', 'dpv', - 1],
    ['Twins', 'twins', - 1],
    ['Sidemount', 'sidemount', - 1],
    ['Rebreather', 'rebreather', - 1],
    ['Top ten', 'topten', - 1],
    ['Noteworthy', 'noteworthy', - 1]
];

export const defaultPostData = {
    searchTerm: "",
    groupBy: "",
    searchOptions: defaultSearchOptions,
    startEnds: defaultStartEnds,
    checkboxList: defaultCheckboxList
}

