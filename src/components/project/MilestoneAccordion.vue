<template>
<div class="milestone-accordion">
  <div class="milestone-accordion-header">
    <div class="h1">
      {{ $t('project.campaign.timeline_title') }}
    </div>
    <p class="p_large">
      {{ $t('project.campaign.timeline_desc') }}
    </p>
    <a class="link" target="_blank" href="https://medium.com/@pledgecamp/why-does-pledgecamp-use-milestones-810de28e9ad1">{{ $t('project.campaign.timeline_help') }}</a>
  </div>
  <div class="milestone-accordion-panel">
    <div v-for="(item, index) in data" :key="index" class="milestone-item">
      <div class="milestone-date">
        <div class="h3 date">
          {{ getDate(item.date) }}
        </div>
        <div class="h5 month">
          {{ getMonth(item.date) | uppercase }}
        </div>
      </div>
      <div class="milestone-content">
        <div class="h4 title">
          {{ item.name }}
        </div>
        <CollapsibleText :text="item.description" textClass="p_small description">
          <div class="release-percent">
            <Lock />
            <span>{{ $tc('project.campaign.funds_released', item.release_percent) }}</span>
          </div>
        </CollapsibleText>
        <!-- TODO <p>{{ item.date | from_eth_date }}</p> -->
      </div>
      <div class="line" />
    </div>
  </div>
</div>
</template>

<script>
import * as moment from 'moment';
import Lock from '@/components/svg/Lock.vue';
import CollapsibleText from '@/components/widget/CollapsibleText';

export default {
  name: 'milestone-accordion',
  components: {
    Lock,
    CollapsibleText,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    data: {
      type: Array,
      default: () => [],
    },
    milestoneClick: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    getDate(ethDate) {
      return moment(ethDate * 1000).format('D');
    },
    getMonth(ethDate) {
      return moment(ethDate * 1000).format('MMM');
    },
  },
};
</script>

<style lang="scss">
@import '@/static/css/general.scss';

.milestone-accordion {
  background-color: $blue-light;
  padding: 48px 30px;
  overflow: hidden;
  .milestone-accordion-header {
    padding: 0 20px;
    margin-bottom: 60px;
    .h1 {
      margin: 0 0 32px;
    }
    .link {
      text-decoration: underline;
    }
  }
  .milestone-accordion-panel {
    overflow: hidden;
    transition: height 0.2s ease-out;
    .milestone-item {
      display: flex;
      position: relative;
      .milestone-date {
        padding-top: 30px;
        text-align: center;
        width: 30px;
        .date, .month {
          line-height: 1;
        }
      }
      .milestone-content {
        margin-left: 32px;
        background: white;
        padding: 40px 32px 32px;
        margin-bottom: 48px;
        .title {
          margin-bottom: 8px;
        }
        .description {
          opacity: 0.8;
          margin-bottom: 20px;
        }
        .release-percent {
          @include button_large_text;
          color: black;
          line-height: 1em;
          span {
            padding-left: 16px;
          }
        }
      }
      .line {
        position: absolute;
        border-left: 1px solid rgba($main-blue, 0.3);
        top: 90px;
        bottom: -10px;
        left: 12px;
      }
      &:last-of-type {
        .line {
          display: none;
        }
      }
    }
  }
  @media (max-width: $desktop-width-small) {
    padding: 80px;
  }
  @media (max-width: $tablet-width) {
    padding: 50px 20px;
    margin-left: -20px;
    margin-right: -20px;
  }
  @media (max-width: $mobile-width) {
    .milestone-accordion-header {
      .h1 {
        @include h2;
      }
    }
    .milestone-accordion-panel .milestone-item {
      flex-direction: column;
      .milestone-date {
        padding-top: 20px;
        padding-bottom: 16px;
        text-align: left;
      }
      .milestone-content {
        margin-left: 0;
        margin-bottom: 80px;
      }
      .line {
        top: unset;
        bottom: 0;
        height: 60px;
        left: 15px;
      }
    }
  }
}
</style>
