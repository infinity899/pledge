<template>
<div
  :class="[ 'copy-button-animate', styleClass, icon && 'icon' ]"
  @click="executeCopy"
>
  <span :class="{ fade }">
    {{ buttonText }}
  </span>
  <svg
    v-if="icon"
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.3245 1.04189L15.9563 1.67372L15.9528 1.67301C16.5891 2.30885 16.9466 3.17152 16.9466 4.07108C16.9466 4.97063 16.5891 5.8333 15.9528 6.46914L11.8445 10.5775C11.2099 11.2152 10.3464 11.5723 9.44676 11.5691C8.54735 11.5722 7.68414 11.2151 7.04976 10.5775C6.86151 10.4004 6.78461 10.1349 6.84911 9.88467C6.91362 9.63442 7.10929 9.43916 7.35968 9.37519C7.61006 9.31121 7.87541 9.38867 8.05206 9.57731C8.42108 9.94855 8.92332 10.1567 9.44676 10.1553C9.97076 10.1566 10.4735 9.94825 10.8429 9.5766L14.9512 5.46826C15.3217 5.09812 15.5299 4.59587 15.5299 4.07214C15.5299 3.54841 15.3217 3.04616 14.9512 2.67601L14.3187 2.04347C13.5473 1.2739 12.2985 1.2739 11.5271 2.04347L9.47297 4.09764C9.19504 4.36608 8.75325 4.36224 8.48002 4.08901C8.20679 3.81578 8.20295 3.37399 8.47139 3.09606L10.5291 1.04189C11.8554 -0.27731 13.9982 -0.27731 15.3245 1.04189ZM5.46947 14.9528L7.40818 13.0148L7.41031 13.0127C7.58935 12.8338 7.85024 12.764 8.09471 12.8296C8.33917 12.8952 8.53007 13.0862 8.5955 13.3307C8.66092 13.5753 8.59093 13.8361 8.41189 14.015L6.47389 15.9523C5.83814 16.5888 4.97544 16.9464 4.07583 16.9464C3.17622 16.9464 2.31351 16.5888 1.67776 15.9523L1.04593 15.3212C0.409999 14.6853 0.0527344 13.8228 0.0527344 12.9235C0.0527344 12.0242 0.409999 11.1617 1.04593 10.5258L5.15426 6.41743C6.47919 5.09426 8.62546 5.09426 9.95039 6.41743L10.5829 7.04926C10.8603 7.32663 10.8603 7.77632 10.5829 8.05368C10.3056 8.33104 9.85588 8.33104 9.57851 8.05368L8.94597 7.42185C8.17466 6.65141 6.92504 6.65141 6.15372 7.42185L2.04539 11.5302C1.27464 12.3011 1.27464 13.5508 2.04539 14.3217L2.67722 14.9528C3.45834 15.6992 4.68836 15.6992 5.46947 14.9528Z" fill="#fff" />
  </svg>
</div>
</template>

<script>
import { copy } from '@/utils/docUtils';

export default {
  name: 'copy-button',
  props: {
    copyText: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    icon: Boolean,
    styleClass: {
      type: String,
      default: 'copy-button',
    },
  },
  data() {
    return {
      fade: false,
      buttonText: this.text,
    };
  },
  methods: {
    executeCopy() {
      copy(document, this.copyText);
      if(!this.fade) {
        this.fade = true;
        setTimeout(this.unfade, 300);
      }
    },
    unfade() {
      this.fade = false;
      this.buttonText = this.$t('copied');
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.copy-button {
  @include button($main-black, large);
  padding: 4px 0 0 0;
  display: flex;

  &.icon {
    justify-content: space-between;
  }
}
.copy-button-animate {
  span {
    transition: opacity 0.25s ease;
  }
  span.fade {
    opacity: 0;
  }
}
</style>
