<template>
<transition name="modal">
  <div
    class="modal-outer"
    :class="expanded ? 'modal-expanded' : ''"
    @click="handleClickOutside"
  >
    <slot v-if="expanded" name="expandedHeader">
      <div class="expanded-header">
        <Logo :showLabel="false" />
        <div class="login-modal-close" @click="$emit('cancel')">
          <div>{{ $t('close') }}</div>
          <img class="close-img" :src="require('@/static/img/icons/ic_close.png')">
        </div>
      </div>
    </slot>
    <div class="modal-inner" :class="expanded ? 'inner-expanded' : ''">
      <div class="modal-top">
        <img
          v-if="!expanded && cancelable"
          class="cancel"
          :src="require('@/static/img/icons/ic_close.png')"
          @click="$emit('cancel')"
        >
      </div>
      <!-- slot for optional image -->
      <slot name="image" />
      <div v-if="title" class="modal-header">
        {{ title }}
      </div>
      <!-- slot for variable content -->
      <slot name="content" />
      <div
        v-if="submitable"
        class="submit-button"
        @click="$emit('submit')"
      >
        {{ submitText }}
      </div>
      <div
        v-if="cancelable && cancelText"
        class="cancel-button"
        @click="$emit('cancel')"
      >
        {{ cancelText }}
      </div>
    </div>
  </div>
</transition>
</template>

<script>
/*

Usage:

  <Modal
    :cancelable="true"
    title="New Question & Answer"
    @submit="handleSubmit"
    @cancel="handleCancel"
    submitText="Publish Project"
    cancelText="Cancel"
    expanded="true"
  >
    <template v-slot:image>
      <div class="rocket">
        <img class="rocket-img" :src="require('@/static/img/art_icons/recently_launched_small.png')" />
      </div>
    </template>
    <template v-slot:content>
      <div class="question-submit">
        CONTENT
      </div>
    </template>
  </Modal>

*/
import Logo from '@/components/nav/Logo.vue';

export default {
  name: 'modal_widget',
  components: {
    Logo,
  },
  props: {
    cancelable: {
      type: Boolean,
      default: true,
    },
    submitable: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: null,
    },
    expanded: Boolean,
    submitText: {
      type: String,
      default: null,
    },
    cancelText: {
      type: String,
      default: null,
    },
  },
  methods: {
    handleClickOutside(e) {
      if(
        !this.expanded
        && (typeof e.target.className === 'string')
        && (e.target.className.split(' ').indexOf('modal-outer') >= 0)
      ) {
        this.$emit('cancel');
      }
    },
    handleEscape(e) {
      if(e.key === 'Escape') {
        this.$emit('cancel');
      }
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleEscape);
    document.body.classList.add('noscroll');
  },
  destroyed() {
    document.removeEventListener('keydown', this.handleEscape);
    document.body.classList.remove('noscroll');
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.modal-outer {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: rgba(255, 255, 255, 0.9);
  transition: opacity 0.3s ease;
  z-index: 2000;

  &.modal-expanded {
    background-color: $white;
  }

  .expanded-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 32px 40px 0;
  }
}
.modal-inner {
  max-width: 640px;
  padding: 0 40px 48px;
  margin: 10vh auto;
  background-color: $white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);

  &.inner-expanded {
    margin: 0 auto;
    box-shadow: unset;
  }

  @media (max-width: $tablet-width) {
    margin: 0 auto;
  }
}
.modal-top {
  position: relative;
  height: 40px;
  margin-right: -40px;

  .cancel {
    position: absolute;
    height: 20px;
    width: 20px;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
}

.modal-header {
  @include h2;
  margin-bottom: 24px;
}
.modal-main {
  margin-bottom: 40px;
}
.submit-button {
  @include button($main-black, full);
}
.cancel-button {
  @include button($white, full);
  color: $col-error;
}

</style>
