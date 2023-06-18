import { Line, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options', 'numRows', 'topLineColor', 'type'],
  mounted() {
    const { numRows, topLineColor, type } = this;
    const topColor = topLineColor || '#E6E6E6';
    const rows = numRows || 5;
    this.renderChart(this.chartData, this.options);
    this.addPlugin({
      id: 'chart-plugin',
      beforeDraw(chart) {
        // If mobile width, show fewer ticks
        if(window.innerWidth > 470) {
          chart.scales['x-axis-0'].options.ticks.minor.maxTicksLimit = 6;
        } else {
          chart.scales['x-axis-0'].options.ticks.minor.maxTicksLimit = 4;
        }
      },
      afterDraw(chart) {
        const {
          ctx,
          canvas,
        } = chart;
        canvas.style.height = '350px';
        canvas.style['margin-left'] = type === 'funding' ? '-8px' : '-20px';
        const yAxis = chart.scales['y-axis-0'];
        yAxis.ticks.forEach((value, index) => {
          const chartHeight = chart.height - 30;
          let lineColor = '#E6E6E6';
          let textColor = '#000';
          if(index === 0 && type === 'funding') {
            textColor = topColor;
          }
          if(type === 'backer' && value === '50%') {
            textColor = '#fe4545';
            lineColor = '#fd9090';
          }
          const { width } = canvas.style;
          const lineLength = width.slice(0, width.length - 2);
          ctx.save();
          ctx.beginPath();
          let y = index === 0 ? 0 : ((chartHeight / rows) * index);
          y = index === rows ? y - 4 : y;
          const x = type === 'funding' ? 10 : 24;
          ctx.moveTo(x, y);
          ctx.strokeStyle = index === 0 ? topColor : lineColor;
          ctx.lineWidth = index === 0 ? 2 : 1;
          ctx.lineTo(lineLength - 22, y);
          ctx.stroke();
          ctx.restore();
          const xOffset = type === 'funding' ? 12 : 30;
          const yOffset = ((chartHeight / (rows)) * index) + 20;
          ctx.font = '600 13px Harmonia';
          ctx.fillStyle = textColor;
          ctx.fillText(value, xOffset, yOffset);
          ctx.restore();
        });
        const points = chart.getDatasetMeta(0).data;
        points.forEach((value, index) => {
          const { _model: { x, y } } = points[index];
          if(index !== 0) {
            const { _model: prevPoints } = points[index - 1];
            ctx.beginPath();
            ctx.moveTo(prevPoints.x, prevPoints.y);
            ctx.strokeStyle = '#2E40EA';
            ctx.lineWidth = 2;
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.restore();
          }
          if(type === 'funding') {
            ctx.beginPath();
            ctx.fillStyle = '#2E40EA';
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
          }
        });
      },
      // afterDraw(chart) {
      //   const {
      //     ctx,
      //     canvas,
      //   } = chart;
      //   canvas.style.height = '350px';
      //   canvas.style['margin-left'] = type === 'funding' ? '-8px' : '-20px';
      //   const yAxis = chart.scales['y-axis-0'];
      //   const chartHeight = chart.height - 30;
      //   yAxis.ticks.forEach((value, index) => {
      //     const xOffset = type === 'funding' ? 12 : 30;
      //     const yOffset = ((chartHeight / (rows)) * index) + 20;
      //     ctx.font = '600 13px Harmonia';
      //     ctx.fillStyle = (index === 0 && type === 'funding') ? topColor : '#000';
      //     ctx.fillText(value, xOffset, yOffset);
      //   });
      // },
    });
  },
};
