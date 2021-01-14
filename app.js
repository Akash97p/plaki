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

var responseObj;
function wikiScraper(placeName) {
    var place = new Object();
    options.path = '/api/rest_v1/page/summary/' + placeName[0].toUpperCase() + placeName.substring(1);
    const req = https.get(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        res.on("data", function (response) {
            responseObj = JSON.parse(response);
            if (("coordinates" in responseObj)) {
                console.log('its a place');
                place.name = responseObj.title;
                place.coordinates = responseObj.coordinates;
                place.description = responseObj.description;
                place.extract = responseObj.extract;
                place.image = responseObj.originalimage.source;
                place.pageid = responseObj.pageid;
                place.error = {
                    ststus: false
                }
            }
            else {
                console.log('not a place');
                place.error = {
                    ststus: true,
                    message: `${placeName} is not a place`
                }
            }
        });
    });
    console.log(responseObj);
    return responseObj;
}

app.get('/api', (req, res) => {
    var place = new Object();
    var placeName = req.query.place;
    options.path = '/api/rest_v1/page/summary/' + placeName[0].toUpperCase() + placeName.substring(1);
    const request = https.get(options, resp => {
        console.log(`statusCode: ${resp.statusCode}`)
        if (resp.statusCode < 300) {
            resp.on("data", function (response) {
                responseObj = JSON.parse(response);
                if (("coordinates" in responseObj)) {
                    console.log('its a place');
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
                        message: `${placeName} is not a place`
                    }
                    res.send({ place: place });
                }

            });
        }
        else if (resp.statusCode >=300 && resp.statusCode < 400) {
            console.log('not a place');
            place.error = {
                status: true,
                message: `chack the term ${placeName}`
            }
            res.json(place);
        }
        else if (resp.statusCode > 400) {
            console.log('not a place');
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