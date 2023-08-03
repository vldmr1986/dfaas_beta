const {google} = require('googleapis');
const path = require("path");
const process = require("process");
const {promises: fs} = require("fs");
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/spreadsheets'];
const credentials = path.join(__dirname, 'secrets', 'secrets.json');
const { GOOGLE_SPREADSHEET_ID } = process.env;


async function excelAppendRow(data){
    const {name, surname, country, email} = data;
    const [_login, domain] = email.split("@");
    try {
        const auth = await google.auth.getClient({
            scopes: SCOPES,
            keyFilename: credentials
        });

        const sheets = google.sheets({version: 'v4', auth});

        const response1 = await sheets.spreadsheets.values.append({
            range: "Sheet1!A2:F",
            spreadsheetId: GOOGLE_SPREADSHEET_ID,
            resource: {
                values: [[name, surname, email, country, domain, new Date()]]
            },
            insertDataOption: "INSERT_ROWS",
            responseValueRenderOption: "UNFORMATTED_VALUE",
            valueInputOption: "RAW",
        });
        console.log("response", response1.data);
    } catch (error){
        console.error("Excel: Can not append ", {
            data,
            error
        })
    }
}

async function getRows(){
    const auth = await google.auth.getClient({
        scopes: SCOPES,
        keyFilename: credentials
    });

    const sheets = google.sheets({version: 'v4', auth});
    const [row, column] = ["A1","C1"];
    // const [row, column] = ["A1","C1"];
    const range = "Sheet1!"+row + ":" + column;

    const response = await sheets.spreadsheets.values.get({
        range,
        spreadsheetId: GOOGLE_SPREADSHEET_ID
    });

    console.log("response", response.data.values);
}

module.exports = {
    excelAppendRow
}



