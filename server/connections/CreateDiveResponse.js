import { createDiveQuery } from "./CreateQuery.js";
import { divesFromRows } from "./FullDiveFromRows.js";

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

export const getDiveResponse = (async (pool, req) => {
    const queries = createDiveQuery(req);
    const rows = await getRows(pool, queries.query, queries.array);
    return divesFromRows(rows);

});