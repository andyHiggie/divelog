import { createSummaryQuery } from "./CreateQuery.js";
import { summaryDataFromRows } from "./SummaryDataFromRows.js";

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

export const getSummaryResponse = (async (pool, req) => {
    const queries = createSummaryQuery(req);
    const rows = await getRows(pool, queries.query1, queries.array);
    const rows2 = await getRows(pool, queries.query2, queries.array);
    return summaryDataFromRows(rows, rows2);
});