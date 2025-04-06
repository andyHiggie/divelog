const filterQuery = "SELECT dives.shore, dives.smallboat, dives.largeboat, dives.cave, dives.fresh, dives.drift, dives.night, dives.reef, dives.wreck, dives.altitude,"
    + "dives.ean, dives.trimix, dives.deco, dives.instructing, dives.dpv, dives.twins, dives.sidemount, dives.rebreather, dives.solo, dives.topten, dives.noteworthy";

const basicDivesQuery = "SELECT sites.siteid, sites.site, sites.location, sites.country, sites.images, sites.lat, sites.lon, dives.number, dives.depth,"
    + " dives.time, dives.date, dives.comment, dives.notes, buddyinfo.buddyid, buddyinfo.name as buddyname, buddyinfo.images as buddyimages";

const fullDivesQuery = "SELECT sites.siteid, sites.site, sites.location, sites.country, sites.images, sites.lat, sites.lon, sites.comment as siteComment, sites.entry, sites.type, dives.number, dives.depth,"
    + " dives.time, dives.date, dives.comment, dives.stops, dives.suit, dives.style, dives.typeofdive, dives.equipmentlist, dives.notes, dives.profile,"
    + " dives.shore, dives.smallboat, dives.largeboat, dives.cave, dives.fresh, dives.drift, dives.night, dives.reef, dives.wreck, dives.altitude,"
    + " dives.ean, dives.trimix, dives.deco, dives.instructing, dives.dpv, dives.twins, dives.sidemount, dives.rebreather, dives.solo, dives.topten, dives.noteworthy,"
    + " buddyinfo.buddyid, buddies.comment as buddyComment, buddyinfo.name as buddyname, buddyinfo.images as buddyimages";

const graphsQuery = "SELECT sites.entry, sites.type, sites.site, sites.siteid, sites.lat, sites.lon, dives.number, dives.depth,"
    + " dives.time, dives.date, dives.stops, dives.suit, dives.style, dives.typeofdive, dives.shore, dives.smallboat, dives.largeboat, dives.cave, dives.wreck,"
    + " dives.ean, dives.reef, dives.trimix, dives.deco, dives.instructing, dives.dpv, dives.twins, dives.sidemount, dives.rebreather, dives.solo, buddyinfo.buddyid";

//const summaryQuery = "SELECT COUNT(dives.number) as diveCount, MAX(dives.depth) as maxDepth, AVG(dives.depth) as avgDepth, AVG(dives.time) as avgTime,"
//+ " MAX(dives.time) as maxTime, COUNT(sites.siteid) as countSites, COUNT(sites.country) as countryCount";

const fullSummaryQuery = "SELECT COUNT(dives.number) as diveCount, MAX(dives.depth) as maxDepth, AVG(dives.depth) as avgDepth, AVG(dives.time) as avgTime,"
    + " MAX(dives.time) as maxTime, SUM(dives.time) as totalTime, COUNT(DISTINCT(sites.siteid)) as siteCount, COUNT(DISTINCT(sites.country)) as countryCount, MIN(dives.date) as startDate, MAX(dives.date) as endDate";

const siteQuery = "SELECT COUNT(dives.number) as diveCount, MAX(dives.depth) as maxDepth, AVG(dives.depth) as avgDepth, AVG(dives.time) as avgTime,"
    + " MAX(dives.time) as maxTime, SUM(dives.time) as totalTime, COUNT(sites.country) as countryCount, sites.siteid, sites.site, sites.location, sites.country, sites.comment, sites.lat, sites.lon, sites.images, sites.entry, sites.type";

const countryQuery = "SELECT COUNT(dives.number) as diveCount, MAX(dives.depth) as maxDepth, AVG(dives.depth) as avgDepth,"
    + " MAX(dives.time) as maxTime, AVG(dives.time) as avgTime, SUM(dives.time) as totalTime, COUNT(DISTINCT(sites.siteid)) as siteCount, sites.country, countries.flag";

const buddyQuery = "SELECT COUNT(dives.number) as diveCount, MAX(dives.depth) as maxDepth, AVG(dives.depth) as avgDepth, SUM(dives.time) as totalTime,"
    + " AVG(dives.time) as avgTime, MAX(dives.time) as maxTime, COUNT(DISTINCT(sites.siteid)) as siteCount, COUNT(DISTINCT(sites.country)) as countryCount, buddyInfo.images, buddyInfo.name as buddyName";

const numBuddiesQuery1 = "SELECT COUNT(DISTINCT(buddies.buddyid)) as buddyCount, COUNT(distinct(dives.number)) as diveCount";
const numBuddiesQuery2 = "SELECT COUNT(DISTINCT(buddies.buddyid)) as buddyCount, dives.number as diveNumber";

const fromDivesSitesBuddies = " FROM dives LEFT JOIN sites ON sites.siteid = dives.siteid LEFT JOIN buddies ON dives.number = buddies.number LEFT JOIN buddyinfo ON buddies.buddyid = buddyinfo.buddyid";
const fromDivesSitesCountries = " FROM dives LEFT JOIN sites ON sites.siteid = dives.siteid LEFT JOIN countries ON sites.country = countries.country";
const fromDivesSites = " FROM dives LEFT JOIN sites ON sites.siteid = dives.siteid";

const whereCheckboxes = ((checkboxList, startEnds) => {
    let returnString = '';
    let varArray = [];
    let first = true;
    checkboxList.map((checkbox) => {
        if (Number(checkbox[2]) > -1) {
            if (first) {
                first = false;
                returnString += " WHERE dives." + checkbox[1] + " = ?";
            } else {
                returnString += " AND dives." + checkbox[1] + " = ?";
            }
            varArray.push(checkbox[2]);
            return returnString;
        } else {
            return '';
        }
    });
    if (first) {
        returnString += " WHERE";
    } else {
        returnString += " AND";
    }
    returnString += " dives.date >= ? AND dives.date <= ? AND dives.time >= ? AND dives.time <= ? AND dives.depth >= ? AND dives.depth <= ? AND dives.number >= ? AND dives.number <= ?";
    varArray = varArray.concat([startEnds.minDate, startEnds.maxDate, startEnds.minTime, startEnds.maxTime, startEnds.minDepth, startEnds.maxDepth, startEnds.minNumber, startEnds.maxNumber]);
    return { query: returnString, array: varArray };
});

const andSearch = ((searchTerm, searchOptions, varArray) => {
    if (searchTerm !== "") {
        const tables = ["dives", "sites", "buddies"];
        let returnString = "";
        let first = true;
        for (let i = 0; i < tables.length; i++) {
            if (parseFloat(searchOptions[tables[i]][0][2]) > 0) {
                searchOptions[tables[i]].map((item, index) => {
                    if (index > 0) {
                        if (item[2] === 1) {
                            if (first) {
                                first = false;
                                returnString += " AND (" + tables[i] + "." + item[0] + " LIKE ?";
                            } else {
                                returnString += " OR " + tables[i] + "." + item[0] + " LIKE ?";
                            }
                            varArray.push(`%${searchTerm}%`);
                        }
                    }
                })
            }
        }
        returnString += ")";
        returnString = returnString.replace("buddies.name", "buddyInfo.name");
        return { query: returnString, array: varArray };
    } else {
        return { query: "", array: varArray };
    }
})

export const createTileQuery = ((req) => {
    const { searchTerm, groupBy, searchOptions, startEnds, checkboxList } = req;
    const checkboxData = whereCheckboxes(checkboxList, startEnds);
    const searchData = andSearch(searchTerm, searchOptions, checkboxData.array);
    let query1 = basicDivesQuery + fromDivesSitesBuddies + " WHERE dives.number IN (SELECT DISTINCT(dives.number)" + fromDivesSitesBuddies + checkboxData.query + searchData.query + ") ORDER BY dives.number DESC";
    let query2 = "";
    if (groupBy === "site") {
        query1 = siteQuery + fromDivesSitesCountries + " WHERE dives.number IN (SELECT DISTINCT(dives.number)" + fromDivesSitesBuddies + checkboxData.query + searchData.query + ") GROUP BY sites.site ORDER BY diveCount DESC";
        query2 = numBuddiesQuery1 + fromDivesSitesBuddies + " WHERE dives.number IN (SELECT DISTINCT(dives.number)" + fromDivesSitesBuddies + checkboxData.query + searchData.query + ") GROUP BY sites.site ORDER BY diveCount DESC";
    } else if (groupBy === "country") {
        query1 = countryQuery + fromDivesSitesCountries + " WHERE dives.number IN (SELECT DISTINCT(dives.number)" + fromDivesSitesBuddies + checkboxData.query + searchData.query + ") GROUP BY sites.country ORDER BY diveCount DESC";
        query2 = numBuddiesQuery1 + fromDivesSitesBuddies + " WHERE dives.number IN (SELECT DISTINCT(dives.number)" + fromDivesSitesBuddies + checkboxData.query + searchData.query + ") GROUP BY sites.country ORDER BY diveCount DESC";
    } else if (groupBy === "buddy") {
        query1 = buddyQuery + fromDivesSitesBuddies + checkboxData.query + searchData.query + " GROUP BY buddies.buddyid ORDER BY diveCount DESC";
    }
    return { query1, query2, array: searchData.array };
});

export const createSummaryQuery = ((req) => {
    const { searchTerm, searchOptions, startEnds, checkboxList } = req;
    const checkboxData = whereCheckboxes(checkboxList, startEnds);
    const searchData = andSearch(searchTerm, searchOptions, checkboxData.array);
    const query1 = fullSummaryQuery + fromDivesSites + " WHERE dives.number IN (SELECT DISTINCT(dives.number)" + fromDivesSitesBuddies + checkboxData.query + searchData.query + ")";
    const query2 = numBuddiesQuery1 + fromDivesSitesBuddies + " WHERE dives.number IN (SELECT DISTINCT(dives.number)" + fromDivesSitesBuddies + checkboxData.query + searchData.query + ")";
    return { query1, query2, array: searchData.array }
});

export const createGraphQuery = ((req) => {
    const { searchTerm, searchOptions, startEnds, checkboxList } = req;
    const checkboxData = whereCheckboxes(checkboxList, startEnds);
    const searchData = andSearch(searchTerm, searchOptions, checkboxData.array);
    const query1 = graphsQuery + fromDivesSitesBuddies + checkboxData.query + searchData.query + " GROUP BY dives.number";
    const query2 = numBuddiesQuery2 + fromDivesSitesBuddies + " WHERE dives.number IN (SELECT DISTINCT(dives.number)" + fromDivesSitesBuddies + checkboxData.query + searchData.query + ") GROUP BY dives.number";
    return { query1, query2, array: searchData.array }
});

export const createDiveQuery = ((req) => {
    const query = fullDivesQuery + fromDivesSitesBuddies + " WHERE dives.number = ?";
    const array = [req.id];
    return { query, array };
});