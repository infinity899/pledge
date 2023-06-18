<template>
<div class="updates-why">
  <div class="why-header">
    {{ $t('manager.updates.why') }}
  </div>
  <div class="why-content">
    {{ $t('manager.updates.reasons') }}
  </div>
  <a
    class="best-practices"
    target="_blank"
    href="https://medium.com/@pledgecamp/how-to-write-great-project-updates-3866d509eefc"
  >
    {{ $t('manager.updates.best') }}
  </a>
</div>
</template>

<script>

export default {
  name: 'updates-why',
};
</script>

<style lang="scss">
@import 'general.scss';

.updates-why {
  width: 100%;

  .why-header {
    @include h3;
    padding: 5px 0;
  }
  .why-content {
    @include p_small;
    margin: 10px 0;
  }
  .best-practices {
    @include subtitle;
    color: $main-blue;
    cursor: pointer;
    margin-top: 24px;
  }
}
</style>
