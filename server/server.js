import { getTileResponse } from "./connections/CreateTileResponse.js";
import { getDiveResponse } from "./connections/CreateDiveResponse.js";
import { getSummaryResponse } from "./connections/CreateSummaryResponse.js";
import { getGraphsResponse } from "./connections/CreateGraphData.js";
import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import cors from "cors";

// import { readFiles } from './utilities/loadProfile.js';

// readFiles();

dotenv.config({ path: "../../../../credentials.env" });//deployment
//dotenv.config({ path: "../credentials.env" });//testing

if (typeof (PhusionPassenger) !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}


const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: true }));

app.post('/tiles', async (req, res) => {
    const response = await getTileResponse(pool, req.body);
    res.send({ response });
});

app.post('/dive', async (req, res) => {
    const response = await getDiveResponse(pool, req.body);
    res.send({ response });
});

app.post('/summary', async (req, res) => {
    const response2 = await getSummaryResponse(pool, req.body);
    const response = await getGraphsResponse(pool, req.body);
    response.summaryData = response2.summaryData;
    res.send({ response });
});

if (typeof (PhusionPassenger) !== 'undefined') {
    app.listen('passenger');
} else {
    app.listen(5000, (() => {
        console.log("server started on port 5000");
    }));
};