export const buddiesFromRows = (rows) => {
    let buddies = [];
    let data = {
        diveInfo: {},
        sites: {},
        countries: {},
        buddies: {}
    };
    rows.map((row) => {
        let summaryData = {
            numberOfDives: row.diveCount,
            numberOfSites: row.siteCount,
            numberOfCountries: row.countryCount,
            maxDepth: row.maxDepth,
            avgDepth: row.avgDepth,
            maxTime: row.maxTime,
            avgTime: row.avgTime,
            totalTime: row.totalTime
        };
        let item = {
            name: row.buddyName,
            images: row.images.split(', '),
            summaryData: summaryData
        };
        buddies.push(item);
    });
    data.buddies = buddies;
    return data;
}