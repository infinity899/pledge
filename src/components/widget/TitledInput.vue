<template>
<div class="p-input-wrap">
  <component
    :is="rows ? 'textarea' : mask ? 'the-mask' : 'input'"
    :rows="rows"
    :type="password || type || 'text'"
    :autocomplete="autocomplete || 'off'"
    :step="step"
    :min="min"
    :max="max"
    class="p-input"
    :class="{
      'error-input' : showError || errorMessage,
      'has-prefix': prefix || hasIcon,
      'has-suffix': suffix,
      [inputClass]: inputClass
    }"
    :name="`input${_uid}`"
    :placeholder="placeholder"
    :value.prop="value"
    :disabled="isDisabled"
    :maxlength="maxLength"
    :mask="mask"
    :masked="!!mask"
    @input="handleInput"
    @focusout="!mask && $emit('focusout', $event.target.value)"
    @focusout.native="mask && $emit('focusout', $event.target.value)"
    @keydown="handleKeydown"
    @keydown.native="handleKeydown"
  />
  <label
    v-if="title"
    class="p-input-title"
    :for="`input${_uid}`"
    :class="{ 'active': (placeholder || value) }"
  >
    {{ title }}
  </label>
  <span v-if="prefix" class="prefix">{{ prefix }}</span>
  <span v-if="suffix" class="suffix">{{ suffix }}</span>
  <img
    v-if="hasIcon"
    :src="require('@/static/img/icons/ic_dollar.png')"
    class="input-icon input-icon-dollar icon-size-small"
  >
  <img
    v-if="type === 'password'"
    :src="showPasswordFlag ? require('@/static/img/icons/ic_hidden.png') : require('@/static/img/icons/ic_eye.png')"
    class="input-icon input-icon-eye icon-size-small"
    @click="togglePassword"
  >
  <div v-if="errorMessage" class="error">
    <Info color="#EC4A29" class="error-icon icon-size-small" />
    <span>{{ errorMessage }}</span>
  </div>
</div>
</template>

<script>
import { TheMask } from 'vue-the-mask';
import Info from '@/components/svg/Info.vue';

export default {
  name: 'p-input',
  components: {
    Info,
    TheMask,
  },
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    rows: {
      type: Number,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    autocomplete: {
      type: String,
      default: null,
    },
    step: {
      type: String,
      default: null,
    },
    min: {
      type: String,
      default: null,
    },
    max: {
      type: String,
      default: null,
    },
    prefix: {
      type: String,
      default: null,
    },
    suffix: {
      type: String,
      default: null,
    },
    errorMessage: {
      type: String,
      default: null,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
    showError: Boolean,
    inputClass: {
      type: String,
      default: null,
    },
    maxLength: {
      type: Number,
      default: undefined,
    },
    mask: {
      type: [String, Array],
      default: '',
    },
  },
  data() {
    return {
      showPasswordFlag: false,
    };
  },
  computed: {
    password() {
      return this.showPasswordFlag ? 'text' : false;
    },
  },
  methods: {
    togglePassword() {
      this.showPasswordFlag = !this.showPasswordFlag;
    },
    handleInput(e) {
      if(!this.mask) {
        if((this.type === 'number' || this.type === 'percent') && this.max) {
          let val = e.target.value;
          if(this.type === 'percent') {
            val = val.replace('%', '');
          }
          const num = parseInt(val);
          const updatedValue = Math.min(num, parseInt(this.max));
          this.$emit('input', updatedValue);
          this.$forceUpdate();
        } else {
          this.$emit('input', e.target.value);
        }
      } else {
        this.$emit('input', e);
      }
    },
    handleKeydown(e) {
      // prevent negative numbers
      if((this.type === 'number' || this.type === 'percent') && this.min && parseInt(this.min) >= 0) {
        if(e.keyCode === 189) {
          e.preventDefault();
        }
      }
      // make delete button work if percent
      // TODO - move this to a more specific component or find a simpler way
      if(this.type === 'percent' && e.keyCode === 8) {
        if(e.target.value.length >= 2) {
          let val = e.target.value.split('%')[0];
          val = val.slice(0, val.length - 1);
          if(val.length) {
            e.target.value = `${val}%`;
          } else {
            e.target.value = '';
            this.$emit('input', 0);
          }
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.p-input-wrap {
  margin-bottom: 15px;
  margin-top: 16px;
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  > input {
    box-sizing: border-box;
    padding-top: 3px;
  }

  > textarea {
    box-sizing: border-box;
    padding-top: 10px;
  }

  label {
    @include subtitle;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.4);
    letter-spacing: 0;
    position: absolute;
    background-color: #fff;
    margin-left: 12px;
    top: 13px;
    padding: 0 4px;
    pointer-events: none;
    transition: 0.2s ease all;
  }

  label.active,
  .p-input:focus ~ label {
    top: -12px;
    font-size: 12px;
    color: $grey;
  }

  .prefix {
    @include subtitle;
    position: absolute;
    top: 13px;
    left: 10px;
    width: 20px;
    text-align: center;
  }

  .suffix {
    @include subtitle;
    color: $black-light;
    font-size: 16px;
    position: absolute;
    top: 13px;
    right: 10px;
  }

  .input-icon {
    position: absolute;
    top: 17px;
    width: auto;
    height: 14px;

    &.input-icon-dollar {
      left: 18px;
    }

    &.input-icon-eye {
      right: 18px;
      z-index: 9;
      cursor: pointer;
    }
  }

  .p-input {
    @include input;

    &.has-prefix {
      padding-left: 36px;

      &::-webkit-input-placeholder {
        font-weight: 300;
      }
    }
    &.has-suffix {
      padding-right: 72px;
    }

    &::placeholder {
      color: $black-light;
    }
    &:disabled {
      background-color: #fff !important;
    }
  }

  textarea.p-input {
    height: auto;
  }

  .error {
    @include error;
  }
  .bo {
    border: 1px solid red;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
