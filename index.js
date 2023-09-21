const qr = require('qrcode');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname));

const server = app.listen(3030, () => {
    console.log('SERVER_IS_RUNNING');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/generateQR', (req, res) => {
    const url = _.get(req, ["body", "url"]);
    const option = {
        color: {
            dark: '#000',
            light: '#fff'
        }
    }
    qr.toDataURL(url, option, (err, url) => {
        if(err) {
            console.log('GENERATE_FAIL');
            return res.status(400).json({
                resCode: 400,
                resMessage: 'Error'+err
            });
        } else {
            return res.status(200).json({
                resCode: 200,
                resMessage: 'Success',
                resResult: url
            });
        }
    });
});

module.exports = server;