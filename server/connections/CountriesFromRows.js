export const countriesFromRows = (rows1, rows2) => {
    let countries = [];
    let data = {
        diveInfo: {},
        sites: {},
        countries: {},
        buddies: {}
    };
    rows1.map((row, index) => {
        if (rows2[index].diveCount === row.diveCount) {
            let summaryData = {
                numberOfDives: row.diveCount,
                numberOfSites: row.siteCount,
                numberOfBuddies: rows2[index].buddyCount,
                maxDepth: row.maxDepth,
                avgDepth: row.avgDepth,
                maxTime: row.maxTime,
                avgTime: row.avgTime,
                totalTime: row.totalTime
            };
            let item = {
                country: row.country,
                image: row.flag,
                summaryData: summaryData
            };
            countries.push(item);
        }
    })
    data.countries = countries;
    return data;
}