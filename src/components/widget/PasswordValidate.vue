<template>
<div class="validate">
  <div class="validate-item">
    <div class="icon">
      <img
        v-if="validLength"
        class="check"
        :src="require('@/static/img/icons/ic_check.png')"
      >
      <img
        v-if="!validLength"
        class="close"
        :src="require('@/static/img/icons/ic_close.png')"
      >
    </div>
    <div>{{ $t('auth.checks.chars') }}</div>
  </div>
  <div class="validate-item">
    <div class="icon">
      <img
        v-if="includesNum"
        class="check"
        :src="require('@/static/img/icons/ic_check.png')"
      >
      <img
        v-if="!includesNum"
        class="close"
        :src="require('@/static/img/icons/ic_close.png')"
      >
    </div>
    <div>{{ $t('auth.checks.number') }}</div>
  </div>
  <div class="validate-item">
    <div class="icon">
      <img
        v-if="validCase"
        class="check"
        :src="require('@/static/img/icons/ic_check.png')"
      >
      <img
        v-if="!validCase"
        class="close"
        :src="require('@/static/img/icons/ic_close.png')"
      >
    </div>
    <div>{{ $t('auth.checks.case') }}</div>
  </div>
</div>
</template>

<script>
const regexTest = (str, reg) => {
  const regex = RegExp(reg);
  return regex.test(str);
};

export default {
  name: 'password-validate',
  props: {
    password: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      validCase: false,
      validLength: false,
      includesNum: false,
    };
  },
  computed: {
    passwordValid() {
      return this.validCase && this.validLength && this.includesNum;
    },
  },
  watch: {
    password(pass) {
      this.handlePasswordInput(pass);
    },
  },
  methods: {
    handlePasswordInput(pass) {
      this.includesNum = regexTest(pass, /[0-9]+/);
      this.validCase = regexTest(pass, /[a-z]+/) && regexTest(pass, /[A-Z]+/);
      this.validLength = pass.length >= 8;
      this.$emit('passwordValidation', this.passwordValid);
    },
  },
  mounted() {
    this.handlePasswordInput(this.password);
  },
};
</script>

<style lang="scss" scoped>
@import 'widgets.scss';

.validate {
  @include p_info;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 15px;
  .validate-item {
    margin-right: 10px;
    height: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .icon {
      height: 15px;
      width: 15px;
    }
  }
  .check {
    padding-bottom: 2px;
    width: 12px;
    filter: invert(19%) sepia(96%) saturate(2869%) hue-rotate(234deg) brightness(91%) contrast(103%);
  }
  .close {
    padding-bottom: 1px;
    width: 10px;
    filter: invert(11%) sepia(99%) saturate(6577%) hue-rotate(2deg) brightness(99%) contrast(112%);
  }
}
</style>
