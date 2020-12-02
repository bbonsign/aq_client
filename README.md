# aq_client
A fronted for the OpenAq + aq_api Api's.
It provides a search box that auto-completes to cities available in the OpenAq database, then combines measurements
from OpenAq and the local aq_api to make a bar chart (the chart itself doesn't display interesting information, but just
is meant to illustrate how the page can update as the user searches for different cities.  If the local api is not running,
the searches should still work, just displaying results from the OpenAq Api (which I hard coded to limit to just 5 measurements).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Discussion
In order to avoid cors errors from this app making requests to the aq_api running locally, I proxy for `http://localhost:8000` in [vue.config.js](./vue.config.js).

This fronted is pretty minimal, since setting up the local api took longer that I was hoping.
There isn't currently a form for submitting new measurements, though there is an api endpoint that supports adding a measurement:
```bash
curl -d '{"parameter": "no2", "date": "2020-11-30T21:00:00Z", "value": 3.14, "city": "SWEETWATER"}' -H 'content-type: application/json' "http://localhost:8000/api/v1/measurements/add/"
```
I would've liked to provide a way for the user to upload a csv file to upload measurements in bulk.

Project structure:
```
src
├── components
│  ├── Main.vue   -- Container for the seach and graph (this could be moved to App.vue) 
│  └── MeasurementsChart.vue 
├── apis.js       -- Utility for accessing both Api's: local aq_api and OpenAq
├── App.vue
├── main.js       
└── usCities.js   -- List of cities from OpenAq, used for the search completion
```
