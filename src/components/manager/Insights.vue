<template>
<div v-if="project" class="manager-insights">
  <BackerInsight
    v-if="status !== 'open'"
    :project="project"
    :status="status"
    :backerVoteData="backerVoteData"
  />
  <StorefrontInsight
    v-if="status === 'completed'"
    :project="project"
    :status="status"
    :salesData="salesData"
  />
  <CampaignInsight
    :project="project"
    :status="status"
    :fundingData="fundingData"
  />
  <Handbook />
  <Search />
</div>
</template>

<script>
import BackerInsight from '@/components/manager/BackerInsight.vue';
import CampaignInsight from '@/components/manager/CampaignInsight.vue';
import StorefrontInsight from '@/components/manager/StorefrontInsight.vue';
import Handbook from '@/components/manager/Handbook.vue';
import Search from '@/components/manager/Search.vue';

export default {
  name: 'manager-insights',
  components: {
    BackerInsight,
    CampaignInsight,
    StorefrontInsight,
    Handbook,
    Search,
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      // expanded: true,
      // collapsibleHeight: 'auto',
      fundingData: [ // TODO: how will we be getting data for funding per day?
        0, 0, 0, 0, 1000000, 1000000, 1000000, 2000000, 2000000, 2000000,
        2500000, 2500000, 3000000, 3000000, 3200000, 3200000, 3400000, 3600000, 3600000, 4000000,
        4200000, 4200000, 4200000, 4400000, 4400000, 4600000, 4700000, 4900000, 4900000, 5000000,
        5400000, 5400000, 5500000, 5500000, 5800000, 5800000, 5900000, 5900000,
      ],
      salesData: [ // TODO: how will we be getting data for funding per day?
        0, 0, 0, 0, 1000000, 1000000, 1000000, 2000000, 2000000, 2000000,
        2500000, 2500000, 3000000, 3000000, 3200000, 3200000, 3400000, 3600000, 3600000, 4000000,
        4200000, 4200000, 4200000, 4400000, 4400000, 4600000, 4700000, 4900000, 4900000, 5000000,
        5400000, 5400000, 5500000, 5500000, 5800000, 5800000, 5900000, 5900000,
      ],
      backerVoteData: [ // TODO: how will we be getting data for funding per day?
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 95, 95,
        90, 90, 90, 85, 85, 85, 85, 85, 85, 85,
        80, 80, 80, 80, 80, 75, 70, 70, 70,
      ],
    };
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.manager-insights {
  margin-bottom: 75px;

  .insights-section {
    margin: 0 auto;

    &.progress-main {
      padding-bottom: 20px;
      border-bottom: 1px solid $border-light;
    }

    .insights-content {
      width: 100%;
      display: flex;
      flex-direction: row;
      padding: 56px 0 80px;

      &:not(:last-child) {
        border-bottom: 1px solid $border-light;
      }

      .insights-header {
        @include h3;
        margin-bottom: 10px;
        padding: 5px 0;
      }

      .funding-progress {
        width: 65%;
        display: flex;
        flex-direction: column;
        height: 400px;
        max-height: 400px;
        padding-right: 50px;
      }
    }
  }

  .insights-summary {
    @include h4;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .summary-header {
      @include h3;
      margin-bottom: 24px;
    }
    .summary-details {
      @include h5;
      display: flex;
      flex-direction: row;
      & > div {
        line-height: 22px;
        padding-top: 3px;
        &:not(:last-child) {
          margin-right: 30px;
          padding-right: 30px;
          border-right: 1px solid $border-light;
        }
      }
    }
  }

  .insights-metrics {
    display: flex;
    flex-flow: row wrap;
    padding: 8px 0;

    .detail {
      margin-right: 24px;
      &:not(:last-child) {
        min-width: 120px;
        border-right: 1px solid $grey-light;
      }
      > div:first-child {
        @include h3;
      }
      > div:nth-child(2) {
        @include subheading;
        color: $grey-medium;
        font-size: 14px;
      }
      &:last-child {
        margin-right: 0;
        border-right: none;
        color: $grey;
      }
    }
    .break-tablet, .break-mobile {
      display: none;
      width: 100%;
      height: 0;
    }
    @media (max-width: $tablet-width-large) and (min-width: 578px) {
      .break-tablet {
        display: block;
      }
      .detail:nth-child(n+5) {
        padding-top: 40px;
      }
      .detail:nth-child(4) {
        margin-right: 0;
        border-right: none;
      }
    }
    @media (max-width: 577px) {
      .detail {
        width: 50%;
        margin: 0;
        &:last-child {
          border-right: 1px solid $grey-light;
        }
        &:nth-child(n+3) {
          padding-top: 40px;
        }
        &.detail-even {
          padding-left: 24px;
        }
      }
    }
    .cat {
      color: $grey-medium;
      margin-left: 5px;
      font-size: 18px;
      line-height: 24px;
    }
  }

  @media (max-width: $tablet-width-large) {
    .insights-section {
      .insights-content {
        flex-wrap: wrap;
        .funding-progress {
          width: 100%;
          padding-right: 0;
          margin: 0 auto;
        }
      }
    }
  }
  @media (max-width: $tablet-width) {
    .insights-section .insight-rewards-wrap {
      display: none;
    }
  }

  @media (max-width: $mobile-width) {
    .insights-summary {
      .summary-details {
        display: block;
        & > div {
          &:not(:last-child) {
            border-right: none;
          }
        }
      }
    }
  }
}
.learn-more {
  @include button_small_text;
  color: $main-blue;
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;
  img {
    height: 8px;
  }
}

#collapsible {
  max-height: 1500px;
  transition: max-height 0.5s ease-in;
  overflow: hidden;

  @media (max-width: $tablet-width-large) {
    max-height: 2200px;
  }
}
</style>
