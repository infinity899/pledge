<template>
<div v-if="numRows" class="insights-graph">
  <Chart
    :chartData="dataCollection"
    :options="options"
    :numRows="numRows"
    :topLineColor="topLineColor"
    :type="type"
  />
</div>
</template>

<script>
import * as moment from 'moment';
import { formatWithCommas } from '@/utils/stringUtils';

import Chart from '@/components/manager/Chart';

const getTickAmt = (goal, rows, type) => {
  const val = (goal / rows).toFixed(0);
  return type === 'funding' ? Math.round(val / 100) * 100 : val;
};

export default {
  name: 'graph',
  components: {
    Chart,
  },
  props: {
    graphData: {
      type: Array,
      default: () => [],
    },
    start: {
      type: Object,
      default: null,
    },
    end: {
      type: Object,
      default: null,
    },
    goal: {
      type: Number,
      default: 0,
    },
    numRows: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    topLineColor: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      dataCollection: {},
      options: {
        layout: {
          padding: {
            top: 2,
            bottom: 1,
          },
        },
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem) => {
              const amt = formatWithCommas(tooltipItem.yLabel);
              return `$${amt} raised`;
            },
            title: (tooltipItem, d) => {
              const graphData = d.datasets[0].data;
              const { index } = tooltipItem[0];
              const dates = this.getDates();
              const date = dates[index].format('ddd MMM DD');
              const prevIdx = index === 0 ? 0 : index - 1;
              const diff = graphData[index] - graphData[prevIdx];
              const displayDiff = diff === 0 ? '' : `(+$${formatWithCommas(diff)})`;
              return `${date}   ${displayDiff}`;
            },
          },
          backgroundColor: '#fff',
          titleFontColor: '#979797',
          titleSpacing: 6,
          bodyFontColor: '#2D3E50',
          bodyFontStyle: 'bold',
          bodySpacing: 6,
          xPadding: 12,
          yPadding: 12,
          cornerRadius: 0,
          displayColors: false,
          borderWidth: 2,
          borderColor: '#979797',
          yAlign: 'bottom',
          xAlign: 'center',
          caretPadding: 20,
          caretSize: 0,
          enabled: this.type === 'funding',
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              fontSize: 14,
              fontColor: '#808080',
              fontWeight: '600',
              fontFamily: 'Harmonia',
              maxRotation: 0,
              labelOffset: this.type === 'backer' ? 20 : 8,
            },
          }],
          yAxes: [{
            ticks: {
              callback: (value, index) => {
                if(value === 0) return '';
                if(this.type === 'funding') {
                  const amt = `${formatWithCommas(value)}`;
                  const suffix = (index === 0 && this.status !== 'progress') ? ' Goal' : '';
                  const displayAmount = amt + suffix;
                  return `$${displayAmount}`;
                }
                return `${value}%`;
              },
              max: this.goal,
              min: 0,
              stepSize: getTickAmt(this.goal, this.numRows, this.type),
              display: false,
            },
            gridLines: {
              drawBorder: false,
              display: false,
            },
          }],
        },
      },
    };
  },
  methods: {
    getDiff(idx) {
      const prevIdx = idx === 0 ? 0 : idx - 1;
      const diff = this.graphData[idx] - this.graphData[prevIdx];
      return diff;
    },
    getDates() {
      const dates = [];
      const currDay = moment(this.start);

      while(currDay.isBefore(this.end)) {
        dates.push(currDay.clone());
        currDay.add(1, 'd');
      }
      return dates;
    },
    getLabels() {
      const dates = this.getDates();
      return dates.map(d => d.format('MMM DD'));
    },
    fillData() {
      this.dataCollection = {
        labels: this.getLabels(),
        datasets: [
          {
            backgroundColor: '#d9dbfc',
            data: this.graphData,
            pointRadius: 0,
            borderWidth: 0,
          },
        ],
      };
    },
  },
  mounted() {
    this.fillData();
  },
};
</script>

<style lang="scss">

.insights-graph {
  width: calc(100% + 28px);
  margin: 10px 0 10px 0;
  min-height: 250px;
  max-height: 350px;
  min-width: 510px;

  @media (max-width: 560px) {
    min-width: unset;
  }
}
</style>
