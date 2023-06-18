<template>
<div v-if="project" class="shipping-options container">
  <div class="dashboard-content">
    <h3>{{ $t('dashboard.rewards.shipping_title') }}</h3>
    <div class="text">
      {{ $t('dashboard.rewards.shipping_text1') }}
    </div>
    <div class="link">
      {{ $t('dashboard.rewards.shipping_link') }}
    </div>
    <hr>
    <div class="section">
      <h3>{{ $t('dashboard.rewards.shipping_quantity') }}</h3>
      <div class="section-text">
        {{ $t('dashboard.rewards.shipping_quantity_text') }}
      </div>
      <div class="section-button">
        {{ $t('dashboard.rewards.shipping_quantity_button') }}
      </div>
    </div>
    <hr>
    <div class="section">
      <h3>{{ $t('dashboard.rewards.shipping_bundle') }}</h3>
      <div class="section-text">
        {{ $t('dashboard.rewards.shipping_bundle_text') }}
      </div>
      <div class="section-button">
        {{ $t('dashboard.rewards.shipping_bundle_button') }}
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'dashboard-rewards-shipping',
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
};

</script>

<style lang="scss" scoped>
@import 'general.scss';
@import 'snippets.scss';
@import 'widgets.scss';

.shipping-options {
  margin-top: 72px;
  margin-bottom: 96px;
  .dashboard-content {
    .text {
      @include p_large;
      margin-top: 20px;
    }
    .link {
      margin-top: 24px;
      @include button_small_text;
      color: $main-blue;
    }
    hr {
      margin: 64px 0;
    }
    .section {
      .section-text {
        margin-top: 8px;
      }
      .section-button {
        @include blue-button($type: secondary);
        margin-top: 32px;
        width: 100%;
      }
    }
  }
}
</style>
