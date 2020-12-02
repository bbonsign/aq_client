<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
//  props: ['chartData'],
  data: () => ({
//    chartdata: {
//      labels: ["January", "February"],
//      datasets: [
//        {
//          label: "Data One",
//          backgroundColor: "blue",
//          data: [40, 20],
//        },
//      ],
//    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style>
</style>

