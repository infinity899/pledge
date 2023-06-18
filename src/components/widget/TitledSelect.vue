<template>
<div class="p-select-wrap">
  <label
    v-if="title"
    class="p-select-title"
    :for="`select${_uid}`"
    :class="{ 'active': (activeLabel || placeholder || (value && value.length)) }"
  >
    {{ title }}
  </label>
  <v-select
    class="p-select"
    :class="inputClass"
    :name="`select${_uid}`"
    :placeholder="placeholder"
    :value="value"
    :searchable="searchable"
    :allow-empty="false"
    :show-labels="false"
    :open-direction="openDirection"
    :options="options"
    :label="label"
    :track-by="trackBy"
    @input="handleChange"
    @open="activeLabel = !activeLabel"
    @close="activeLabel = !activeLabel"
  >
    <!-- Pass on all scoped slots -->
    <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </v-select>
</div>
</template>

<script>
export default {
  name: 'p-select',
  props: {
    value: {
      type: [Number, String, Object],
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    inputClass: {
      type: String,
      default: null,
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    openDirection: {
      type: String,
      default: 'bottom',
    },
    label: {
      type: String,
      default: null,
    },
    trackBy: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      activeLabel: false,
    };
  },
  methods: {
    handleChange(value) {
      this.$emit('input', value);
      this.activeLabel = value.length > 0;
    },
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.p-select-wrap {
  margin-bottom: 15px;
  margin-top: 16px;
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;

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

  label.active {
    top: -12px;
    font-size: 12px;
    color: $grey;
    z-index: 51;
  }

  .multiselect {
    position: static;
    .multiselect__tags {
      height: 48px;
      display: flex;
      align-items: center;
      padding: 12px 35px 12px 16px;
      border-radius: 0;
      border: 1px solid $border-light;
      background: none;
      font-size: 14px;
    }
    .multiselect__placeholder,
    .multiselect__single,
    .multiselect__input {
      font-size: 16px;
      font-weight: 600;
      font-family: $font-title;
      color: $main-black;
      margin-bottom: 0;
      padding: 0;
    }
    .multiselect__placeholder,
    .multiselect__input::placeholder {
      padding: 0;
      color: rgb(117, 117, 117);
    }
    .multiselect__select {
      top: 17px;
      right: 10px;
      height: 20px;
      width: 20px;
      padding: 0;
      &::before {
        background-image: url('../../static/img/icons/ic_down.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 100% 100%;
        border: none;
        position: absolute;
        width: 10px;
        height: 6px;
        margin: 0;
        left: 5px;
        top: 7px;
      }
    }
    &.multiselect--active .multiselect__select {
      transform-origin: center center;
    }
    .multiselect__option {
      @include h4;
      white-space: normal;
      padding: 12px 16px;
    }
    .multiselect__content-wrapper {
      border-radius: 0;
    }
    .multiselect__content .multiselect__option--highlight {
      background: $grey-light;
      color: $main-black;
    }
  }
}
</style>
