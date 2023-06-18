<template>
<div class="user-edit-modal">
  <div class="edit-intro">
    <div class="edit-header container">
      <Logo :showLabel="false" />
      <div class="edit-quit" @click="$emit('hideModal')">
        <div class="edit-text">
          {{ $t('cancel') }}
        </div>
        <img class="edit-img" :src="require('@/static/img/icons/ic_close.png')">
      </div>
    </div>
  </div>
  <form class="edit-intro-content" @submit="onSave">
    <h2>{{ $t('user.private.edit.title') }}</h2>
    <div class="edit-avatar">
      <AvatarDrop
        @input="handleImageUpload($event)"
      >
        <div
          v-if="tempAvatar"
          class="edit-avatar-img"
          :style="{ 'background-image': `url(${tempAvatar})` }"
        />
        <div
          v-else
          class="edit-avatar-img"
          :style="{ 'background-image': `url(${$options.filters.avatar(profile)})` }"
        />
      </AvatarDrop>
      <Upload />
    </div>
    <TitledInput
      v-model="userProfile.name"
      name="name"
      class="form-input"
      :placeholder="$t('user.private.edit.placeholders.name')"
      :title="$t('user.private.edit.labels.name')"
    />
    <TitledInput
      v-model="userProfile.bio"
      name="bio"
      class="form-input"
      :rows="5"
      :placeholder="$t('user.private.edit.placeholders.bio')"
      :title="$t('user.private.edit.labels.bio')"
    />
    <TitledInput
      v-model="userProfile.location"
      name="location"
      class="form-input"
      :placeholder="$t('user.private.edit.placeholders.location')"
      :title="$t('user.private.edit.labels.location')"
    />
    <TitledInput
      v-model="userProfile.website"
      name="link"
      class="form-input"
      :placeholder="$t('user.private.edit.placeholders.link')"
      :title="$t('user.private.edit.labels.link')"
      :errorMessage="errorLink"
    />
    <button
      type="submit"
      class="edit-continue-button"
    >
      {{ $t('save') }}
    </button>
    <a class="edit-cancel" @click="closeModal">{{ $t('cancel') }}</a>
  </form>
</div>
</template>

<script>
import Logo from '@/components/nav/Logo.vue';
import TitledInput from '@/components/widget/TitledInput.vue';
import Upload from '@/components/svg/Upload.vue';
import AvatarDrop from '@/components/user_private/AvatarDrop.vue';
import { updateProfileImage } from '@/utils/api';
import { USER_SUCCESS, USER_UPDATE } from '@/store/actions';
import { validateLink } from '@/utils/stringUtils';

export default {
  name: 'edit-modal',
  components: {
    Logo,
    TitledInput,
    Upload,
    AvatarDrop,
  },
  props: {
    profile: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      userProfile: { ...this.profile },
      tempAvatar: null,
      errorLink: null,
    };
  },
  computed: {
    loadedFile(file) {
      if(!file) {
        return null;
      }
      return file;
    },
  },
  methods: {
    handleImageUpload(file) {
      // Displayed as a temporary avatar in the edit modal if user uploads new image
      this.tempAvatar = URL.createObjectURL(file);
      this.userProfile.avatar = file;
    },
    validateFields() {
      if(this.userProfile.website && !validateLink(this.userProfile.website)) {
        this.errorLink = this.$t('user.private.edit.errors.link');
        return false;
      }
      this.errorLink = null;
      return true;
    },
    closeModal() {
      this.$emit('hideModal');
    },
    async onSave(e) {
      e.preventDefault();
      if(this.validateFields()) {
        await this.updateProfile();
        if(this.tempAvatar) {
          await this.updateAvatar();
        }
        // Inform parent that profile is updated (About.vue)
        this.$emit('updatedProfile');
        this.closeModal();
      } else {
        this.errorMessage = this.$t('user.private.edit.errors.general');
      }
    },
    async updateProfile() {
      const { name, bio, location, website } = this.userProfile;
      await this.$store.dispatch(USER_UPDATE, { name, bio, location, website });
    },
    async updateAvatar() {
      try {
        const res = await updateProfileImage(this.userProfile.avatar);
        const newProfile = res.data.user;
        this.avatar = newProfile.image.url;
        this.$store.commit(USER_SUCCESS, newProfile);
      } catch(e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.edit-continue-button {
  @include button($main-black, full);
  padding: 4px 12px 0 12px;
  margin: 40px 0 24px;
  &.disabled {
    opacity: 0.3;
  }
}

.user-edit-modal {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: scroll;
  background-color: $white;
  z-index: 2000;
  .edit-intro {
    box-sizing: border-box;
    padding: 24px 40px 0;
    .edit-header {
      display: flex;
      justify-content: space-between;

      .edit-quit {
        @include subtitle;
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        .edit-text {
          padding-top: 4px;
        }
        .edit-img {
          margin-left: 10px;
          width: 16px;
          height: 16px;
        }
      }
    }
  }
  .edit-intro-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    max-width: 645px;
  }
  .edit-avatar {
    margin: 40px 0;
    position: relative;
    .avatar-drop {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 182px;
      height: 182px;
      border-radius: 50%;
      overflow: hidden;
      background-color: $main-black;
      .edit-avatar-img {
        position: absolute;
        background-size: contain;
        width: 100%;
        height: 100%;
        opacity: 0.5;
      }
    }
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
  }
  .edit-cancel {
    @include link;
    color: $main-orange;
  }
  .form-input {
    width: 100%;
  }
}
</style>
