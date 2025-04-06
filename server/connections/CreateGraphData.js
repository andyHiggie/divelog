import { createGraphQuery } from "./CreateQuery.js";
import { graphDataFromRows } from "./GraphDataFromRows.js";

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

export const getGraphsResponse = (async (pool, req) => {
    const queries = createGraphQuery(req);
    const rows1 = await getRows(pool, queries.query1, queries.array);
    const rows2 = await getRows(pool, queries.query2, queries.array);
    return graphDataFromRows(rows1, rows2);
});