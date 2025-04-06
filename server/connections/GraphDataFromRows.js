export const graphDataFromRows = (rows, rows2) => {
    let data = {
        markers: {
            centerLat: 0,
            centerLon: 0,
            markerList: []
        },
        dates: [],
        depthRange: {
            xLabel: "Depth range in m",
            yLabel: "Number of dives",
            type: "depth",
            title: "Depth range of dives",
            range: [
                [1000, 0],
                [100, 0],
                [90, 0],
                [80, 0],
                [70, 0],
                [60, 0],
                [50, 0],
                [40, 0],
                [30, 0],
                [20, 0],
                [10, 0],
                [0, 0]
            ]
        },
        timeRange: {
            xLabel: "Time range in minutes",
            yLabel: "Number of dives",
            type: "time",
            title: "Time range of dives",
            range: [
                [1000, 0],
                [240, 0],
                [210, 0],
                [180, 0],
                [150, 0],
                [120, 0],
                [90, 0],
                [60, 0],
                [30, 0],
                [0, 0]
            ]
        },
        typeOfEntry: {
            xLabel: "Number of dives",
            yLabel: "Entry type",
            title: "Type of entry",
            stats: [
                ["Shore", 0],
                ["Small boat", 0],
                ["Large boat", 0],
                ["Inland", 0]
            ]
        },
        typeOfDive: {
            xLabel: "Number of dives",
            yLabel: "Dive type",
            title: "Type of dive",
            stats: [
                ["OC recreational", 0],
                ["OC technical", 0],
                ["Rebreather", 0]
            ]
        },
        gasUsed: {
            xLabel: "Number of dives",
            yLabel: "Gas used",
            title: "Gas used",
            stats: [
                ["Air", 0],
                ["EAN", 0],
                ["Trimix", 0]
            ]
        },
        numberOfBuddies: {
            xLabel: "Number of dives",
            yLabel: "Number of buddies",
            title: "Number of buddies",
            stats: [
                ["None", 0],
                ["One", 0],
                ["Two", 0],
                ["Three or more", 0]
            ]
        },
        typeOfSite: {
            xLabel: "Number of dives",
            yLabel: "Site type",
            title: "Type of site",
            stats: [
                ["reef", 0],
                ["wreck", 0],
                ["cavern", 0],
                ["cave", 0],
                ["other", 0]
            ]
        }
    };
    rows.map((row, index) => {
        data.dates.push(row.date);
        if (index === 0) {
            data.markers.centerLat = row.lat;
            data.markers.centerLon = row.lon;
        }
        data.markers.markerList.push({
            lat: row.lat,
            lon: row.lon,
            label: row.site,
            id: row.siteid
        })
        let found = false
        data.depthRange.range.map((item) => {
            if (!found && item[0] < row.depth) {
                item[1]++;
                found = true;
            }
        });
        found = false;
        data.timeRange.range.map((item) => {
            if (!found && item[0] < row.time) {
                item[1]++;
                found = true;
            }
        });
        switch (row.entry) {
            case "Inland":
                data.typeOfEntry.stats[3][1]++;
                break;
            case "Shore":
                data.typeOfEntry.stats[0][1]++;
                break;
            case "Boat":
                if (row.smallboat) {
                    data.typeOfEntry.stats[1][1]++;
                } else if (row.largeboat) {
                    data.typeOfEntry.stats[2][1]++;
                } else if (row.shore) {
                    data.typeOfEntry.stats[0][1]++;
                }
        }
        switch (row.style) {
            case "OC Single":
                data.typeOfDive.stats[0][1]++;
                break;
            case "OC Doubles":
                data.typeOfDive.stats[1][1]++;
                break;
            case "OC Sidemount":
                data.typeOfDive.stats[1][1]++;
                break;
            case "Backmount Rebreather":
                data.typeOfDive.stats[2][1]++;
                break;
            case "Sidemount Rebreather":
                data.typeOfDive.stats[2][1]++;
        }
        if (row.trimix === 1) {
            data.gasUsed.stats[2][1]++;
        } else if (row.ean === 1) {
            data.gasUsed.stats[1][1]++;
        } else {
            data.gasUsed.stats[0][1]++;
        }
        if (row.typeofdive.search(/cavern/i) > -1) {
            data.typeOfSite.stats[2][1]++;
        } else if (row.cave === 1) {
            data.typeOfSite.stats[3][1]++;
        } else if (row.wreck === 1) {
            data.typeOfSite.stats[1][1]++;
        } else if (row.reef === 1) {
            data.typeOfSite.stats[0][1]++;
        } else {
            data.typeOfSite.stats[4][1]++;
        }
        if (row.solo === 1) {
            data.numberOfBuddies.stats[0][1]++;
        } else {
            if (rows2[index].diveNumber === row.number) {
                if (rows2[index].buddyCount === 1) {
                    data.numberOfBuddies.stats[1][1]++;
                } else if (rows2[index].buddyCount === 2) {
                    data.numberOfBuddies.stats[2][1]++;
                } else {
                    data.numberOfBuddies.stats[3][1]++;
                }
            }
        }
    });
    data.timeRange.range.reverse();
    data.depthRange.range.reverse();
    return data;
}