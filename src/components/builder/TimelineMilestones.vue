<template>
<div v-if="project" class="timeline-milestones">
  <div
    v-for="(milestone, idx) in milestones"
    :key="idx.toString()"
    class="timeline-milestone"
    @click="$emit('onMilestoneClick', milestone)"
  >
    <div class="bullet-wrap">
      <div
        class="bullet-line"
        :class="{ 'first': idx === 0, 'last': idx === (milestones.length - 1), 'only': milestones.length === 1 }"
      />
      <div class="bullet">
        <Bullet :color="idx === 0 ? '#2E40EA' : '#000'" />
      </div>
    </div>
    <div class="milestone-info">
      <div class="date">
        {{ milestone.date.format('MMM DD') }}
      </div>
      <h4>{{ milestone.name }}</h4>
      <CollapsibleText
        :text="milestone.description"
        textClass="desc"
        :showMore="false"
      >
        <div v-if="milestone.release_percent" class="release">
          <Lock color="#000" />
          <div>
            {{ $tc('dashboard.timeline.funds_raised', milestone.release_percent) }}
          </div>
        </div>
      </CollapsibleText>
    </div>
  </div>
</div>
</template>

<script>
import Bullet from '@/components/svg/Bullet.vue';
import Lock from '@/components/svg/Lock.vue';
import CollapsibleText from '@/components/widget/CollapsibleText';

export default {
  name: 'timeline-milestones',
  components: {
    Bullet,
    Lock,
    CollapsibleText,
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
  computed: {
    milestones() {
      return [
        {
          name: 'Funds Raised',
          date: this.project.end_time,
        },
        ...this.project.milestones,
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'general.scss';

.timeline-milestones {
  margin-bottom: 32px;
  cursor: pointer;
  .timeline-milestone {
    display: flex;
    flex-direction: row;
    .bullet-wrap {
      position: relative;

      .bullet-line {
        width: 10px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: -31px;
        border-left: 1px solid $border-light;

        &.first {
          top: 40px;
        }
        &.last {
          bottom: calc(100% - 35px);
        }
        &.only {
          display: none;
        }
      }

      .bullet {
        position: absolute;
        top: 20px;
        left: -40px;
      }
    }
    .milestone-info {
      width: 100%;
      border: 1px solid $white;
      padding: 16px 48px 16px 16px;
      &:hover {
        border: 1px solid $border-lighter;
        transition: all 0.3s ease;
      }
      .date {
        @include subheading;
        color: $grey50;
      }
      .desc {
        @include p_small;
        margin-top: 8px;
      }
      .release {
        @include button_large_text;
        margin-top: 8px;
        display: flex;
        svg {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
