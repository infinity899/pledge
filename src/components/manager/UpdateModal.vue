<template>
<transition name="modal">
  <div class="update-edit-modal">
    <div class="update-edit container">
      <div class="update-edit-header">
        <div class="update-edit-header-left">
          <Logo :showLabel="false" />
          <div
            class="update-modal-exit"
            @click="handleExit"
          >
            <Arrow color="#2e40ea" :back="true" />
            <span class="update-save-exit">
              {{ draft ? $t('manager.updates.save_draft') : $t('manager.updates.save') }}
            </span>
          </div>
        </div>
        <div class="update-post">
          <div
            v-if="saving !== null"
            class="saving"
          >
            {{ saving ? `${$t('manager.updates.saving')}...` : $t('manager.updates.saved') }}
          </div>
          <div
            class="post-button"
            :class="{ disabled: !name }"
            @click="handlePost"
          >
            {{ draft ? $t('manager.updates.post') : $t('manager.updates.options') }}
          </div>
        </div>
      </div>
      <div class="update-modal">
        <div class="modal-info">
          <div class="instructions">
            <div class="give">
              {{ $t('manager.updates.give') }}
            </div>
            <div class="tell">
              {{ $t('manager.updates.tell') }}
            </div>
            <div class="best-practices">
              {{ $t('manager.updates.best_give') }}
            </div>
          </div>
        </div>
        <div class="modal-main">
          <input
            v-model="name"
            class="update-title"
            :placeholder="$t('manager.updates.placeholders.write')"
            :maxLength="40"
            @input="handleInput"
          >
          <textarea
            v-model="description"
            class="update-details"
            :placeholder="$t('manager.updates.placeholders.details')"
            rows="10"
            :maxLength="500"
            @input="handleInput"
          />
        </div>
      </div>
    </div>
    <Modal
      v-if="modalOpen"
      :cancelable="true"
      :submitText="draft ? $t('manager.updates.submit_post') : $t('manager.updates.submit_edit')"
      :cancelText="$t('manager.updates.cancel')"
      :expanded="false"
      @submit="handleSubmit"
      @cancel="modalOpen = false"
    >
      <template v-slot:content>
        <div class="update-submit">
          <div class="header">
            {{ $t('manager.updates.select') }}
          </div>
          <div class="option">
            {{ $t('manager.updates.viewable') }}
          </div>
          <div class="descript">
            {{ $t('manager.updates.audience') }}
          </div>
          <div class="options-dropdown">
            <TitledSelect
              :options="audiences"
              :value="audience"
              @input="handleAudienceSelect"
            />
          </div>
        </div>
      </template>
    </Modal>
  </div>
</transition>
</template>

<script>
import Logo from '@/components/nav/Logo.vue';
import Arrow from '@/components/svg/Arrow.vue';
import Modal from '@/components/widget/Modal.vue';
import TitledSelect from '@/components/widget/TitledSelect.vue';
import {
  createProjectUpdate,
  updateProjectUpdate,
} from '@/utils/api';

// TODO: I think some transition animation when the modal is opened would be good

export default {
  name: 'update-modal',
  components: {
    Logo,
    Arrow,
    Modal,
    TitledSelect,
  },
  props: {
    update: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      name: null,
      description: null,
      modalOpen: false,
      audience: this.$t('manager.updates.audiences')[0],
      audiences: this.$t('manager.updates.audiences'),
      timer: null,
      updateId: null,
      saving: null,
      draft: true,
    };
  },
  methods: {
    async handleInput() {
      if(!this.timer) {
        this.timer = setTimeout(async () => {
          this.saving = true;
          await this.saveUpdate();
          this.saving = false;
          clearTimeout(this.timer);
          this.timer = null;
        }, 3000);
      }
    },
    handleAudienceSelect(value) {
      this.audience = value;
    },
    async saveUpdate() {
      const {
        name,
        description,
        updateId,
        audience,
        draft,
      } = this;
      const projectId = this.$route.params.id;
      const updateApi = updateId ? updateProjectUpdate : createProjectUpdate;

      try {
        const resp = await updateApi({
          projectId,
          updateId,
          name,
          description,
          public: audience.id === 1,
          draft,
        });
        const { update } = resp.data;
        if(update && update.id) { // otherwise its an edit
          this.updateId = update.id;
          this.$emit('refreshAllUpdates');
        }
        this.$root.$emit('refreshUpdate', this.updateId);
      } catch(err) {
        console.log('err in saveUpdate:', err);
      }
    },
    async handlePost() {
      if(this.name && this.name.length) {
        this.modalOpen = true;
      }
    },
    async handleSubmit() {
      this.modalOpen = false;
      const {
        name,
        description,
        updateId,
        audience,
      } = this;
      const projectId = this.$route.params.id;

      // TODO: loading/activity indicator

      try {
        await updateProjectUpdate({
          projectId,
          updateId,
          name,
          description,
          draft: false,
          public: audience === this.$t('manager.updates.audiences')[0],
        });
        this.$root.$emit('refreshUpdate', updateId);
        this.$emit('close');
      } catch(err) {
        console.log('err in createProjectUpdate:', err);
      }
    },
    async handleExit() {
      // Only save on exit if something's actually been entered
      if(this.name && this.name.length) {
        await this.saveUpdate();
      }
      this.$root.$emit('refreshUpdate', this.updateId);
      this.$emit('close');
    },
  },
  mounted() {
    if(this.update) {
      const {
        name,
        description,
        id,
        draft,
        public: isPublic,
      } = this.update;

      this.name = name;
      this.description = description;
      this.updateId = id;
      this.draft = draft;
      this.audience = isPublic ? this.audiences[0] : this.audiences[1];
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.update-edit-modal {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: scroll;
  background-color: $white;
  z-index: 2000;

  .update-edit {
    box-sizing: border-box;
    padding: 24px 40px 0;
  }
  .update-edit-header {
    display: flex;

    .update-edit-header-left {
      display: flex;
      align-items: center;

      .update-modal-exit {
        cursor: pointer;
        margin-left: 48px;

        .update-save-exit {
          @include h5;
          margin-left: 10px;
          color: $main-blue;
        }
      }
    }
    .update-post {
      padding-top: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: auto;

      .saving {
        @include h5;
        margin-right: 25px;
        color: $grey-medium;
        text-transform: uppercase;
      }

      .post-button {
        @include button($main-black, large);
        &.disabled {
          background-color: $grey-medium;
        }
      }
    }
  }
}

.update-modal {
  padding: 32px 0 24px 96px;
  box-sizing: border-box;

  .modal-info {
    margin-bottom: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .instructions {
      width: 415px;
      margin-right: 10px;

      .give {
        @include h3;
        margin-bottom: 15px;
      }

      .tell {
        margin-bottom: 20px;
      }

      .best-practices {
        @include h5;
        color: $main-blue;
        cursor: pointer;
      }
    }

    .options {
      width: 415px;

      .add {
        border: 1px solid $grey-light;
        @include h5;
        color: $grey;
        margin-bottom: 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .add-email {
          padding: 10px;
          padding-top: 12px;
        }

        .email-dropdown {
          @include p_info;
          width: 100px;
          padding: 0;
          padding-left: 10px;
          font-weight: 700;
          height: 45px;
          outline: none;
          border: none;
          color: $grey-medium;
        }
      }
    }
  }

  .modal-main {
    border: 1px solid $border-light;
    padding: 5% 10%;
    min-height: 400px;

    .update-title, .update-details {
      @include input;
      border: none;
      margin-top: 8px;
      outline: none;
      resize: none;
      overflow: auto;
    }

    .update-title {
      font-size: 20px;
      &::placeholder {
        color: $grey-medium;
        opacity: 1;
      }
    }

    .update-details {
      @include p_large;
      font-weight: 400;
      padding-top: 10px;
      min-height: 250px;
      &::placeholder {
        color: $black-med;
        opacity: 1;
      }
    }
  }
}

.update-submit {
  margin-top: -15px;

  .header {
    @include h3;
    text-align: center;
    margin-bottom: 20px;
  }
  .option {
    @include h4;
    margin-bottom: 10px;
  }
  .descript {
    margin-bottom: 15px;
  }
  .options-dropdown {
    margin-bottom: 30px;
  }
}

</style>
