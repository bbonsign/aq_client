<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form id="search-form" method="GET" action="" @submit="searchSubmit">
      <label for="search">
        Search for measurements by US city (cities with data available from
        OpenAQ will appear in the completion menu as you type. Combines results
        from the local API with the OpenAQ API. The OpenAQ results are limited
        to 5 measurements.):
      </label>
      <br />
      <input
        v-model="searchCity"
        id="search"
        list="cities"
        type="search"
        placeholder="Search by city..."
        autocomplete="off"
      />
      <datalist id="cities">
        <option v-for="(city, idx) of cities" :key="idx" :value="city"></option>
      </datalist>
    </form>
    <MeasurementsChart :chart-data="chartdata" />
    <p>Number of results: {{ chartdata.datasets.length }}</p>
    <p>(The chart isn't very meaningful, just a proof of concept. )</p>
  </div>
</template>


<script>
import { usCities } from "../usCities.js";
// import { myAQ /*openAQ*/ } from "../apis.js";
// import {  openAQ /*myAQ*/ } from "../apis.js";
import { openAQ, myAQ } from "../apis.js";

import MeasurementsChart from "./MeasurementsChart.vue";

const colorMap = {
  bc: "red",
  co: "grey",
  no2: "blue",
  o3: "purple",
  pm10: "yellow",
  pm25: "orange",
  so2: "green",
};

export default {
  name: "Main",
  components: {
    MeasurementsChart,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      searchCity: "",
      cities: usCities,
      chartdata: { datasets: [] },
    };
  },
  methods: {
    fillChartData(measurements) {
      const datasets = measurements.map((m) => {
        return {
          label: m.parameter.name,
          backgroundColor: colorMap[m.parameter.name],
          data: [m.value],
        };
      });
      this.chartdata = { datasets };
    },
    async searchSubmit(event) {
      event.preventDefault();
      let myData;
      try {
        const _myData = await myAQ.get("measurements/", {
          location__city__name: this.searchCity,
        });
        myData = _myData.results;
      } catch (e) {
        console.log(e);
        myData = [];
      }
      let openData;
      try {
        const _openData = await openAQ.get("measurements/", {
          city: this.searchCity,
          limit: 5,
        });
        openData = _openData.results.map((m) => {
          return { ...m, parameter: { name: m.parameter } };
        });
      } catch (e) {
        console.log(e);
        openData = [];
      }
      this.fillChartData(myData.concat(openData));
    },
  },
  mounted() {
    // openAQ.get('parameters/').then(console.log);
    // myAQ.get("parameters/").then(console.log);
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

input {
  border: none;
  border-radius: 3px;
  font-size: 1.1rem;
  margin: 9px 15px;
  padding: 5px 15px;
}
</style>
