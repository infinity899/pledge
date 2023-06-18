<template>
<div class="container manager-shipping">
  {{ $t('manager.shipping.placeholder') }}
</div>
</template>

<script>

export default {
  name: 'manager-shipping',
  components: {

  },
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss">
.manager-shipping {
  min-height: 400px;
}
</style>

