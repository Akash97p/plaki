const https = require('https')
const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var options = {
    hostname: 'en.wikipedia.org',
    port: 443,
}

app.get('/', function (req, res) {
    res.redirect(301, 'https://github.com/Akash97p/plaki')
  })

app.get('/api', (req, res) => {
    var place = new Object();
    var placeName = req.query.place;
    options.path = '/api/rest_v1/page/summary/' + placeName[0].toUpperCase() + placeName.substring(1);
    const request = https.get(options, resp => {
        if (resp.statusCode < 300) {
            resp.on("data", function (response) {
                responseObj = JSON.parse(response);
                if (("coordinates" in responseObj)) {
                    place.name = responseObj.title;
                    place.description = responseObj.description;
                    place.coordinates = responseObj.coordinates;
                    place.extract = responseObj.extract;
                    place.image = responseObj.originalimage.source;
                    place.pageid = responseObj.pageid;
                    place.error = {
                        status: false
                    }
                    res.json(place);
                }
                else {
                    place.error = {
                        status: true,
                        message: `according to wikipedia ${placeName} is not likely a place`
                    }
                    res.json(place);
                }

            });
        }
        else if (resp.statusCode >=300) {
            place.error = {
                status: true,
                message: `${placeName} not found`
            }
            res.json(place);
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(" Server is running at port 3000 \r\n ☼ http://localhost:3000");
});