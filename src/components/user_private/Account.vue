<template>
<div v-if="profile" class="account">
  <div class="settings-account-wrap">
    <div class="settings-account">
      <h4>{{ $t('settings.account.email.title') }}</h4>
      <p class="settings-account-text">
        {{ $t('settings.account.email.label') }}
      </p>
    </div>
    <div class="settings-account">
      <div v-if="profile.email" class="settings-account-email">
        {{ profile.email }}
      </div>
      <button class="settings-account-cta">
        {{ $t('settings.account.email.cta') }}
      </button>
    </div>
  </div>
  <div class="settings-account-wrap">
    <div class="settings-account">
      <h4>{{ $t('settings.account.password.title') }}</h4>
      <p class="settings-account-text">
        {{ $t('settings.account.password.label') }}
      </p>
    </div>
    <div class="settings-account">
      <button
        v-if="!showEditPassword"
        class="settings-account-cta"
        @click="showEditPassword = !showEditPassword"
      >
        {{ $t('settings.account.password.change') }}
      </button>
      <EditPassword
        v-if="showEditPassword"
        @close="showEditPassword = false"
      />
    </div>
  </div>
  <div class="settings-account-wrap">
    <div class="settings-account">
      <h4>{{ $t('settings.account.two_factor.title') }}</h4>
      <p class="settings-account-text">
        {{ $t('settings.account.two_factor.label_authenticator') }}
      </p>
      <p class="settings-account-text">
        {{ $t('settings.account.two_factor.label_phone') }}
      </p>
    </div>
    <div class="settings-account">
      <button
        class="settings-account-cta"
        @click="showTwoFactorModal = true"
      >
        {{ $t('settings.account.two_factor.cta') }}
      </button>
    </div>
  </div>
  <div v-if="socials && socials.length" class="settings-account-wrap">
    <div class="settings-account">
      <h4>{{ $t('settings.account.social.title') }}</h4>
      <p class="settings-account-text">
        {{ $t('settings.account.social.label') }}
      </p>
    </div>
    <div class="settings-account">
      <div
        v-for="(social, index) in socials"
        :key="index"
        class="settings-social-item"
      >
        <div class="settings-social-details">
          <div class="subtitle">
            {{ social.type }}
          </div>
          <h5>
            {{
              social.connected
                ? `${social.connections} ${$t('settings.account.social.friends')}`
                : $t('settings.account.social.connectivity')
            }}
          </h5>
        </div>
        <button class="settings-account-cta" :class="{ 'connected' : social.connected}">
          {{
            social.connected
              ? $t('settings.account.social.disconnect')
              : $t('settings.account.social.connect')
          }}
        </button>
      </div>
    </div>
    <div class="settings-account-deletion">
      {{ $t('settings.account.deletion') }}
    </div>
  </div>
  <div class="settings-account-deletion">
    {{ $t('settings.account.deletion') }}
  </div>
  <TwoFactorModal
    v-if="showTwoFactorModal"
    @close="showTwoFactorModal = false"
  />
</div>
</template>
<script>
import EditPassword from '@/components/user_private/EditPassword.vue';
import TwoFactorModal from '@/components/user_private/TwoFactorModal.vue';

export default {
  name: 'account',
  components: {
    EditPassword,
    TwoFactorModal,
  },
  data() {
    return {
      socials: [],
      showEditPassword: false,
      showTwoFactorModal: false,
    };
  },
  computed: {
    profile() {
      return this.$store.getters.getProfile || {};
    },
  },
};
</script>

<style lang="scss">
@import "widgets.scss";

.account {
  .settings-account-wrap {
    display: flex;
    padding: 56px 0;
    border-bottom: 1px solid $grey-light;

    .settings-account-cta {
      @include button($main-blue, small, secondary);
      width: 214px;
      padding-left: 35px;
      padding-right: 35px;
      &.connected {
        @include button($main-orange, small, secondary);
      }
    }
    .settings-account {
      flex-basis: 50%;
      &:first-of-type {
        margin-right: 50px;
      }
      &:nth-child(2) {
        text-align: right;
      }
    }
    .settings-account-text {
      margin: 6px 0 0 0;
      &:not(:first-of-type) {
        margin-top: 32px;
      }
    }
    .settings-account-email {
      display: inline-block;
      margin-right: 32px;
    }
  }
  .settings-social-item {
    border: 1px solid $grey-light;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    width: 100%;
    &:not(:last-of-type) {
      margin-bottom: 16px;
    }
    .subtitle {
      font-weight: 700;
      text-align: left;
    }
    h5 {
      color: $grey;
    }
    button {
      margin-left: auto;
      width: 98px;
    }
  }
  .settings-account-deletion {
    @include button_small_text;
    cursor: pointer;
    margin-top: 56px;
    color: $main-orange;
  }
  @media (max-width: $mobile-width) {
    .settings-account-wrap {
      flex-wrap: wrap;
      .settings-account {
        flex-basis: 100%;
        &:first-of-type {
          margin-right: 0;
        }
        &:nth-child(2) {
          text-align: center;
          margin-top: 16px;
        }
        .settings-account-email {
          margin: 0 0 16px 0;
          display: block;
        }
      }
    }
  }
}
</style>
