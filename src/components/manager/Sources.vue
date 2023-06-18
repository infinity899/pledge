<template>
<div class="insights-sources">
  <div class="insights-header">
    {{ $t('manager.insights.sources.header') }}
  </div>
  <div
    v-for="source in sources"
    :key="source.name"
    class="source"
  >
    <div class="sources-line">
      <div
        class="line-blue"
        :style="{ width: `${source.percent}%` }"
      />
    </div>
    <div class="source_name">
      {{ source.name }}
    </div>
    <div class="source_value">
      {{ `${source.percent}% ($${source.total_usd.toLocaleString()})` }}
    </div>
  </div>
</div>
</template>

<script>
// TODO -- remove once API is implemented
const TEST_SOURCES = [
  {
    name: 'Pledgecamp',
    percent: 59,
    total_usd: 50000,
  },
  {
    name: 'External Referrers',
    percent: 30,
    total_usd: 40000,
  },
  {
    name: 'Custom Referrers',
    percent: 11,
    total_usd: 12000,
  },
];

export default {
  name: 'insights-sources',
  data() {
    return {
      sources: [],
    };
  },
  methods: {
    getSources() {
      this.sources = TEST_SOURCES;
    },
  },
  created() {
    this.getSources();
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.insights-sources {
  width: 35%;

  .source {
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 32px;
    @include h5;

    .source_name {
      width: 50%;
    }
    .source_value {
      width: 50%;
      text-align: right;
      color: rgba(0, 0, 0, 0.5);
    }
    .sources-line {
      width: 100%;
      background-color: $blue-med;
      height: 8px;
      margin-bottom: 8px;
      .line-blue {
        background-color: $main-blue;
        height: 100%;
      }
    }
  }

  @media (max-width: $tablet-width-large) {
    width: 100%;
    max-width: 600px;
    margin: 40px auto 0;
  }
}
</style>
