<template>
<div class="updates-empty">
  <div>{{ $t('manager.updates.empty') }}</div>
  <div class="create" @click="$emit('newUpdate')">
    {{ $t('manager.updates.create') }}
  </div>
</div>
</template>

<script>

export default {
  name: 'updates-empty',
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.updates-empty {
  @include h4;
  min-height: 300px;
  width: 95%;
  margin: 10px 10px 10px 0;
  background-color: $bg-grey-light;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div:first-child {
    opacity: 0.5;
  }

  .create {
    @include button($main-black, small);
    margin-top: 20px;
  }
}
</style>
