<template>
<div class="titlebar">
  <div class="titlebar-title">
    <h1>{{ title }}</h1>
    <div v-if="subtitle" class="titlebar-subtitle">
      {{ subtitle }}
    </div>
    <slot />
  </div>
</div>
</template>

<script>

export default {
  name: 'title-bar',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">

.titlebar-title {
  background-color: $grey-light;
  box-sizing: border-box;
  padding: 30px 8px 50px 8px;
  text-align: center;
}
.titlebar-subtitle {
  margin-bottom: 10px;
  padding: 0 10%;
}
</style>
