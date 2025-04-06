import { createTileQuery } from "./CreateQuery.js";
import { divesFromRows } from "./DiveFromRows.js";
import { sitesFromRows } from "./SitesFromRows.js";
import { countriesFromRows } from "./CountriesFromRows.js";
import { buddiesFromRows } from "./BuddiesFromRows.js";

const getRows = (async (pool, query, array) => {
    return new Promise((resolve, reject) => {
        pool.query(query, array, (error, rows) => {
            if (error) {
                return reject(error);
            }
            return resolve(rows);
        });
    });
});

export const getTileResponse = (async (pool, req) => {
    const queries = createTileQuery(req);
    if (req.groupBy === "") {
        const rows = await getRows(pool, queries.query1, queries.array);
        return divesFromRows(rows);
    } else if (req.groupBy === "country") {
        const rows1 = await getRows(pool, queries.query1, queries.array);
        const rows2 = await getRows(pool, queries.query2, queries.array);
        return countriesFromRows(rows1, rows2);
    } else if (req.groupBy === "site") {
        const rows1 = await getRows(pool, queries.query1, queries.array);
        const rows2 = await getRows(pool, queries.query2, queries.array);
        return sitesFromRows(rows1, rows2);
    } else if (req.groupBy === "buddy") {
        const rows = await getRows(pool, queries.query1, queries.array);
        return buddiesFromRows(rows);
    }
});