export const summaryDataFromRows = (row, row2) => {
    let data = {
        summaryData: {
            numberOfDives: row[0].diveCount,
            numberOfSites: row[0].siteCount,
            numberOfCountries: row[0].countryCount,
            startDate: row[0].startDate,
            endDate: row[0].endDate,
            numberOfBuddies: row2[0].buddyCount,
            maxDepth: row[0].maxDepth,
            avgDepth: row[0].avgDepth,
            maxTime: row[0].maxTime,
            avgTime: row[0].avgTime,
            totalTime: row[0].totalTime
        },
    };
    return data;
}