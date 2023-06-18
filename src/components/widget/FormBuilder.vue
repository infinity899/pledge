<template>
<div class="form-wrapper">
  <TitledInput
    v-for="field in formModel.fields"
    :key="field.key"
    v-model="fieldData[field.key]"
    :autocomplete="field.autocomplete || 'off'"
    :title="labels[field.key].placeholder"
    :errorMessage="errors[field.key]"
    :class="field.style"
    @input="$delete(errors, field.key)"
    @focusout="validateField(field)"
  />
  <slot />
</div>
</template>

<script>
/**
 * A widget that generates a set of input fields
 * @displayName Form Builder
 */

import TitledInput from '@/components/widget/TitledInput.vue';

export default {
  name: 'form-builder',
  components: {
    TitledInput,
  },
  props: {
    /**
     * Data that defines generated input fields.
     * {
     *   key: <string>,
     *   fields: [
     *     { key: <string>, autocomplete: <string>, validator: <function> },
     *     ...
     *   ],
     * }
     */
    formModel: {
      type: Object,
      default: () => {},
    },
    /**
     * Text labels for input placeholder and error labels
     * <key> must match a field key provided in `formModel`
     * {
     *    "<key>": {
     *      "placeholder": <string>,
     *      "error_label": <string>
     *    },
     *    ...
     * }
     */
    labels: {
      type: Object,
      default: () => {},
    },
    // Stores all field data according to field key
    // Form data
    fieldData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      errors: {},
    };
  },
  computed: {
    isValid() {
      const isEmptyForm = Object.keys(this.formModel.fields).length === 0;
      const hasError = Object.values(this.errors).filter(val => val.length > 0);

      return !isEmptyForm && hasError.length === 0;
    },
  },
  watch: {
    isValid(val) {
      /**
       * Emit event to notify parent when isValid changes
       *
       * @property {string} id the form identifier
       * @property {boolean} val New value of isValid
       */
      this.$emit('validate', { id: this.formModel.key, val });
    },
  },
  methods: {
    validateField({ key, validator, optional }) {
      const inputValue = this.fieldData[key];
      const label = this.labels[key].error_label.toLowerCase();

      if(!optional && !inputValue) {
        this.$set(this.errors, key, this.$t('form.errors.VALUE_MISSING', { label }));
        return false;
      }

      if(inputValue && validator && !validator(inputValue)) {
        this.$set(this.errors, key, this.$t('form.errors.VALUE_INVALID', { label }));
        return false;
      }

      this.$set(this.errors, key, '');

      return true;
    },
  },

};
</script>

<style lang="scss" scoped>
.form-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  > div {
    width: 100%;
  }
}
</style>
