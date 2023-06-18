<template>
<form class="builder-intro-name" @submit="continueClick">
  <h1 class="intro-header">
    {{ $t('builder_intro.intro_name.title') }}
  </h1>
  <div
    class="intro-name-desc"
    v-html="$t('builder_intro.intro_name.description')"
  />
  <input
    :value="name"
    :placeholder="$t('builder_intro.intro_name.placeholder')"
    @input="$emit('update:name', $event.target.value)"
  >
  <button
    type="submit"
    :class="{ disabled: !name, 'builder-continue-button': true }"
  >
    {{ $t('builder_intro.continue') }}
    <Arrow :color="'white'" />
  </button>
</form>
</template>

<script>
import Arrow from '@/components/svg/Arrow.vue';

export default {
  name: 'builder-intro-name',
  components: {
    Arrow,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Number,
      required: true,
    },
    eligible: Boolean,
  },
  methods: {
    continueClick(e) {
      e.preventDefault();
      if(this.name) {
        this.$emit('nextTab');
      }
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.builder-intro-name {
  text-align: center;
  h1 {
    margin-top: 80px;
  }
  .intro-name-desc {
    @include p_large;
    margin-top: 32px;
  }
  input {
    @include input;
    margin-top: 24px;
    max-width: 600px;
    width: 100%;
  }
}

@media (max-width: $mobile-width) {
  .builder-intro {
    h1 { margin-top: 48px; }
    button { width: 100%; }
  }
}
</style>
