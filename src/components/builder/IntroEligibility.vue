<template>
<div class="builder-intro-eligibility">
  <h1 class="intro-header">
    {{ $t('builder_intro.intro_eligibility.title') }}
  </h1>
  <div class="intro-eligibility-desc">
    {{ $t('builder_intro.intro_eligibility.desc') }}
  </div>
  <div class="intro-eligibility-checks">
    <CheckboxTree :initialData="checks" :onCheck="checked" />
  </div>
  <button
    :class="{ disabled: !eligible, 'builder-continue-button': true }"
    @click="continueClick"
  >
    {{ $t('builder_intro.intro_eligibility.button_text') }}
    <Arrow :color="'white'" />
  </button>
</div>
</template>

<script>
import CheckboxTree from '@/components/widget/CheckboxTree.vue';
import Arrow from '@/components/svg/Arrow.vue';

export default {
  name: 'builder-intro-eligibility',
  components: {
    Arrow,
    CheckboxTree,
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
  data() {
    return {
      checks: this.$t('builder_intro.intro_eligibility.checks'),
    };
  },
  methods: {
    continueClick() {
      if(this.eligible) {
        this.$emit('complete');
      }
    },
    checked(data) {
      const eligible = data.every(item => item.checked);
      if(eligible !== this.eligible) {
        this.$emit('update:eligible', eligible);
      }
    },
  },
  mounted() {
    this.checked(this.checks);
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.builder-intro-eligibility {
  text-align: center;
  h1 {
    margin-top: 80px;
  }
  .intro-eligibility-desc {
    @include p_large;
    margin-top: 24px;
  }
  .intro-eligibility-checks {
    width: 100%;
    max-width: 600px;
    margin: 40px auto;
    .p-checkbox-wrap {
      width: 100%;
      border: 1px solid $border-light;
      margin-top: 16px;
      .p-checkbox {
        width: 100%;
        display: flex;
        align-items: center;
        .checkmark {
          margin-left: 12px;
          top: 16px;
        }
        .checkbox-text {
          display: inline-block;
          width: 100%;
          padding: 12px 0 12px 16px;
          text-align: left;
        }
      }
    }
  }
  .builder-continue-button {
    width: 200px;
    margin-top: 16px;
  }
}
</style>
