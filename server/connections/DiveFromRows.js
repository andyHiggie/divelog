export const divesFromRows = (rows) => {
    let data = {
        diveInfo: {},
        sites: {},
        countries: {},
        buddies: {}
    };
    let dives = [];
    let buddies = [];

    rows.map((row, index) => {
        let buddy = {
            id: row.buddyid,
            name: row.buddyname,
            images: row.buddyimages.split(', ')
        }
        buddies.push(buddy);
        if (index + 1 < rows.length && rows[index + 1].number === row.number) {
            //more buddies to add so wait...
        } else {
            let site = {
                id: row.siteid,
                name: row.site,
                location: row.location,
                country: row.country,
                images: row.images.split(', '),
            }
            let item = {
                number: row.number,
                depth: row.depth,
                time: row.time,
                date: new Date(row.date).toISOString(),
                site: site,
                comment: row.comment,
                notes: row.notes,
                buddies: buddies
            };
            let marker = {
                lat: row.lat,
                lon: row.lon,
                label: row.site,
                id: row.siteid
            };
            buddies = [];
            dives.push(item);
        }
    });
    data.diveInfo = dives;
    return data;
}