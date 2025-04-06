import fs from 'node:fs';
import xml2js from 'xml2js';
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config({ path: "../credentials.env" });

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const readFile = ((filename) => {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        xml2js.parseString(data, (err, result) => {
            if (err) {
                console.log(err);
                return
            }
            const profileData = result.uddf.profiledata[0].repetitiongroup[0].dive[0].samples[0].waypoint;
            const diveNumber = result.uddf.profiledata[0].repetitiongroup[0].dive[0].informationbeforedive[0].divenumber[0];
            const date = result.uddf.profiledata[0].repetitiongroup[0].dive[0].informationbeforedive[0].datetime[0].split('T')[0];
            const maxDepth = Math.round(result.uddf.profiledata[0].repetitiongroup[0].dive[0].informationafterdive[0].greatestdepth[0] * 10) / 10;
            const time = Math.round(result.uddf.profiledata[0].repetitiongroup[0].dive[0].informationafterdive[0].diveduration[0] / 60);
            const avgDepth = Math.round(result.uddf.profiledata[0].repetitiongroup[0].dive[0].informationafterdive[0].averagedepth[0] * 10) / 10;
            let profileArray = [];
            profileData.map((item) => {
                profileArray.push([Math.round((item.divetime / 6) * 10) / 100, Math.round(item.depth * 10) / 10]);
            });
            pool.query('UPDATE dives SET profile = ? WHERE number = ? ', [JSON.stringify(profileArray), diveNumber], (error, result) => {
                if (error) {
                    console.log(error);
                }
                console.log('success' + result.affectedRows)
            });
        });
    });
});

export const readFiles = () => {
    const dirName = './utilities/profileData';
    fs.readdir(dirName, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            files.forEach(file => {
                readFile(dirName + '/' + file);
            });
        }
    });
}