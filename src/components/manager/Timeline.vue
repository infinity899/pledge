<template>
<div class="container manager-timeline">
  {{ $t('manager.timeline.placeholder') }}
</div>
</template>

<script>
export default {
  name: 'manager-timeline',
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss">
.manager-timeline {
  min-height: 400px;
}
</style>
