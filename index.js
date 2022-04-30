const express = require('express');
const {google} = require('googleapis');
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets.readonly"
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({version: "v4", auth: client});

    const spreadsheetId = "1C73h7ikdd_eSVxX75vxlcxJvfH0B6pROjr_uxfALGEk";
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });
    const getRows = await googleSheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Sheet1",
    });
    console.log(getRows.data.values);
    res.render("index", {data: getRows.data.values});
});

app.listen(3000, ()=>{
    console.log("Listening on port 3000");
})