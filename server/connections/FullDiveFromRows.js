export const divesFromRows = (rows) => {
    let data = {
        diveInfo: {},
        sites: {},
        countries: {},
        buddies: {}
    };
    let dives = [];
    let buddies = [];

    const possibleFilters = ['shore', 'smallboat', 'largeboat', 'cave', 'fresh', 'drift', 'night', 'reef', 'wreck', 'altitude', 'ean', 'trimix', 'deco', 'instructing', 'dpv', 'twins', 'sidemount', 'rebreather', 'topten', 'noteworthy'];
    let categories = [];

    rows.map((row, index) => {
        let buddy = {
            id: row.buddyid,
            name: row.buddyname,
            images: row.buddyimages.split(', '),
            comment: row.buddyComment
        }
        buddies.push(buddy);
        if (index + 1 < rows.length && rows[index + 1].number === row.number) {
            //more buddies to add so wait...
        } else {
            possibleFilters.map((item) => {
                if (row[item] === 1) {
                    let text = item[0].toLocaleUpperCase() + item.substring(1);
                    text = text.replace('boat', ' boat');
                    text = text.replace('ten', ' ten');
                    categories.push(text);
                }
            });
            let markers = {
                centerLat: row.lat,
                centerLon: row.lon,
                markerList: [{
                    lat: row.lat,
                    lon: row.lon,
                    label: row.site,
                    id: row.siteid
                }]
            }
            let site = {
                id: row.siteid,
                name: row.site,
                location: row.location,
                country: row.country,
                images: row.images.split(', '),
                comment: row.siteComment,
                notes: row.notes,
                lat: row.lat,
                lon: row.lon,
                entry: row.entry,
                type: row.type,
                markers: markers
            }
            let item = {
                number: row.number,
                depth: row.depth,
                time: row.time,
                date: new Date(row.date).toISOString(),
                site: site,
                comment: row.comment,
                stops: row.stops,
                equipment: {
                    Suit: row.suit,
                    Style: row.style
                },
                equipmentList: row.equipmentlist,
                typeOfDive: row.typeofdive,
                categories: categories,
                buddies: buddies,
                notes: row.notes,
                profile: JSON.parse(row.profile),
            };
            buddies = [];
            dives.push(item);
        }
    });
    data.diveInfo = dives;
    return data;
}