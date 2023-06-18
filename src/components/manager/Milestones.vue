<template>
<div v-if="project" class="insights-milestones">
  <div class="insights-header">
    {{ $t('manager.insights.milestones.header') }}
  </div>
  <div
    v-for="milestone in project.milestones"
    :key="milestone.id"
    class="milestone"
  >
    <div class="row">
      <div class="name">
        {{ milestone.name }}
      </div>
      <div class="confidence" :class="'confidence_minus'">
        {{ getConfidence(milestone) }}
      </div>
    </div>
    <div class="row">
      <div class="date">
        {{ getDate(milestone) }}
      </div>
      <div class="confidence_label">
        {{ $t('manager.insights.milestones.confidence') }}
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'insights_milestones',
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
  methods: {
    getConfidence(_milestone) {
      // TODO: how will changes in backer confidence for a milestone be determined?
      return '-2%';
    },
    getDate(milestone) {
      return milestone.date.format('MMM DD');
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.insights-milestones {
  width: 35%;

  .milestone {
    margin-bottom: 32px;

    .row {
      display: flex;
      flex-flow: row wrap;
      @include h5;

      .name, .date {
        width: 50%;
      }
      .confidence, .confidence_label {
        @include h4;
        width: 50%;
        text-align: right;
        &.confidence_minus {
          color: $orange-med;
        }
        &.confidence_plus {
          color: $main-blue;
        }
      }
      .date, .confidence_label {
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }

  @media (max-width: $tablet-width-large) {
    width: 100%;
    max-width: 600px;
    margin: 50px auto 0;
  }
}

</style>
