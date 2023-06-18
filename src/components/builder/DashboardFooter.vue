<template>
<div class="dashboard-footer">
  <div class="container">
    <div class="wrap">
      <div class="text">
        <h5>{{ $t('dashboard.continue') }}</h5>
        <router-link :to="{ name: link }">
          <div class="link">
            <h1>{{ label }}</h1>
            <Arrow color="#2e40ea" />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Arrow from '@/components/svg/Arrow.vue';

export default {
  name: 'dashboard-footer',
  components: {
    Arrow,
  },
  props: {
    label: {
      type: String,
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'general.scss';

.dashboard-footer {
  height: 280px;
  background-color: $section-highlight;

  .container {
    height: 100%;
  }
  .wrap {
    display: flex;
    align-items: center;
    padding: 0 7%;
    height: 100%;
    .text {
      margin-left: auto;
      min-width: 500px;
      .link {
        display: flex;
        align-items: center;
        h1 {
          color: $main-blue;
          margin: 16px 8px 8px 0;
        }
      }
    }
  }
  @media (max-width: $mobile-width) {
    .wrap .text {
      min-width: unset;
      margin-left: 0;
    }
  }
}

</style>
