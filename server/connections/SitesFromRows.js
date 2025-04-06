export const sitesFromRows = (rows1, rows2) => {
    let sites = [];
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
                numberOfBuddies: rows2[index].buddyCount,
                maxDepth: row.maxDepth,
                avgDepth: row.avgDepth,
                maxTime: row.maxTime,
                avgTime: row.avgTime,
                totalTime: row.totalTime
            };
            let item = {
                id: row.siteid,
                name: row.site,
                location: row.location,
                country: row.country,
                siteComment: row.comment,
                images: row.images.split(', '),
                lat: row.lat,
                lon: row.lon,
                entry: row.entry,
                type: row.type,
                summaryData: summaryData
            };
            sites.push(item);
        }
    });
    data.sites = sites
    return data;
}