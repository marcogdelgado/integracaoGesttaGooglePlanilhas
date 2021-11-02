const fs = require('fs');
const { google } = require('googleapis');
const readCsv = require('./leCsv.js');
const path = require('path')
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];


module.exports = () => {
    try {
        fs.readFile('./src/uteis/credenciais.json', (err, content) => {
            if (err) return console.log('Error loading client secret file:', err);
            authorize(JSON.parse(content), listMajors);
        });

        function authorize(credentials, callback) {
            const { client_email, private_key } = credentials;
            const oAuth2Client = new google.auth.JWT(
                client_email, null, private_key, SCOPES);
            oAuth2Client.authorize((err, tokens) => {
                if (err) {
                    console.log(err)
                    return
                }

                console.log('Connected')
            })
            callback(oAuth2Client);

        }

        function listMajors(auth) {
            let file = fs.readdirSync('./src/downloads', { encoding: 'utf-8' });
            console.log(file)
            let { arrayCsv, header } = readCsv(path.join('./src/', 'downloads', file[0]))
            arrayCsv = arrayCsv.map(item => {
                return Object.values(item)
            })

            let values = [
                header
                , ...arrayCsv
            ];
            const data = [{
                range: 'Página1!A1',
                values,
            }];
            const resource = {
                data,
                valueInputOption: 'USER_ENTERED',
            };
            const sheets = google.sheets({ version: 'v4', auth });
            sheets.spreadsheets.values.batchUpdate({
                spreadsheetId: '1zoeeZOMtGOL-H5pX4sEB-bI3WfVYOOB_T3i-KqwTuGw',
                resource
            }, (err, res) => {
                if (err) return console.log('The API returned an error: ' + err);
            });
        }
    } catch (error) {
        return escreve() 
    }
};