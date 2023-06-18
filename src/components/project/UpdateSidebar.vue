<template>
<ul class="update-sidebar">
  <li
    v-for="(update, index) in updates"
    :key="index"
    class="update"
    :class="{ 'selected': (update.index === selected), 'inactive' : (update.index === -1) }"
    @click="() => onSelect(update.index)"
  >
    <span class="bullet-container">
      <svg
        class="update-sidebar-bullet"
        width="18px"
        height="18px"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z M12,19 C15.8659932,19 19,15.8659932 19,12 C19,8.13400675 15.8659932,5 12,5 C8.13400675,5 5,8.13400675 5,12 C5,15.8659932 8.13400675,19 12,19 Z M12,16 C9.790861,16 8,14.209139 8,12 C8,9.790861 9.790861,8 12,8 C14.209139,8 16,9.790861 16,12 C16,14.209139 14.209139,16 12,16 Z" />
      </svg>
    </span>
    <div class="update-sidebar-container">
      <p class="update-sidebar-date">
        {{ update.date }}
      </p>
      <p class="update-sidebar-description">
        {{ update.name }}
      </p>
      <button
        class="update-sidebar-cta"
        @click="()=>toggleDetailView()"
      >
        {{ $t('project.updates.mobile_cta') }}
      </button>
    </div>
  </li>
</ul>
</template>

<script>
export default {
  name: 'update-sidebar',
  props: {
    updates: {
      type: Array,
      default: null,
    },
    selected: {
      type: Number,
      default: 0,
    },
    onSelect: {
      type: Function,
      default: () => {},
    },
    toggleDetailView: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
@import 'general.scss';
@import 'widgets.scss';

.update-sidebar {
  .update {
    position: relative;
    background-color: $section-highlight;
    border: 1px solid transparent;
    padding: 14px 20px;
    margin-bottom: 32px;
    margin-left: 56px;
    cursor: pointer;

    .bullet-container {
      &::after {
        content: '';
        display: inline-block;
        width: 47px;
        background: #d4d8fa;
        height: 1px;
        left: -48px;
        bottom: 50%;
        position: absolute;
      }
      .update-sidebar-bullet {
        position: absolute;
        left: -56px;
        top: calc(50% - 9px);
        background-color: #fff;
        z-index: 2;

        path {
          transform: translate(-3px, -3px);
        }
      }
    }

    &:not(:last-child) .bullet-container::before {
      content: '';
      display: inline-block;
      width: 1px;
      background: #d4d8fa;
      height: 50%;
      left: -56px;
      bottom: -8px;
      position: absolute;
      transform: translateX(8px);
    }

    &:not(:first-child)::before {
      content: '';
      display: inline-block;
      width: 1px;
      background: #d4d8fa;
      height: calc(50% + 40px);
      left: -56px;
      top: -40px;
      position: absolute;
      transform: translateX(8px);
    }

    &:hover:not(.selected) {
      background-color: $white;
      border-color: #abb3f7;
    }

    &.selected {
      border-color: #abb3f7;
      .update-sidebar-bullet {
        path {
          fill: $main-blue;
        }
      }
    }

    .update-sidebar-container {

      .update-sidebar-date {
        @include subheading;
        margin: 4px 0 0;
        color: rgba(0, 0, 0, 0.5);
        display: flex;
      }
      .update-sidebar-description {
        margin: 0 0 8px 0;
        @include h4;
      }
      .update-sidebar-cta {
        display: none;
      }
    }

    &.inactive {
      background-color: $white;
      pointer-events: none;

      .bullet-container svg {
        display: none;
      }

      &:not(:last-child) .bullet-container::before {
        content: '';
        bottom: 0;
      }

      .update-sidebar-container {
        .update-sidebar-description {
          @include subheading;
          text-transform: uppercase;
        }

        .update-sidebar-cta {
          display: none;
        }
      }
    }
  }

  @media (max-width: $mobile-width) {
    display: flex;
    flex-direction: column;
    align-items: center;

    .update {
      padding: 14px 0 0 0;
      margin: 0 0 32px 0;
      background-color: white;
      border: none;
      &::before {
        display: none !important;
      }
      .bullet-container {
        display: none;
      }
      .update-sidebar-bullet {
        display: none;
      }
      .update-sidebar-container {
        display: flex;
        flex-direction: column;
        > * {
          align-self: center;
        }
        .update-sidebar-cta {
          @include link;
          font-size: 12px;
          text-transform: uppercase;
          display: block;
          margin-top: 12px;
        }
      }
    }
  }
}

</style>
