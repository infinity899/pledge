<template>
<div class="settings-verification">
  <Section
    :info="$t('settings.verification.top')"
    sectionClassName="page-header-section"
  />
  <Section :info="$t('settings.verification.email')">
    <div v-if="profile.email" class="settings-verify-email">
      {{ profile.email }}
    </div>
    <button class="settings-button">
      {{ $t('settings.verification.email.button') }}
    </button>
  </Section>
  <Section :info="$t('settings.verification.contact_info')">
    <div class="contact-form">
      <FormBuilder
        :formModel="formModel"
        :dataModel="formData"
        @validate="onValidateEvent"
      >
        <button
          class="submit"
          :disabled="!isValidated"
          @click="updateInfo"
        >
          {{ $t('settings.verification.identity_submit') }}
        </button>
      </FormBuilder>
    </div>
  </Section>
  <Section :info="$t('settings.verification.kyc')">
    <span
      v-if="profile.kyc_status === 2"
      class="settings-kyc-verified"
    >
      {{ $t('settings.verification.kyc.verified') }}
    </span>
    <button
      :class="['settings-button', { [kycButtonStyle]: kycButtonStyle }]"
      :disabled="shouldButtonDisabled"
      @click="onClickKYC"
    >
      {{ profile.kyc_status && $t(`settings.verification.kyc.buttons.${profile.kyc_status}`) }}
    </button>
  </Section>
  <Section :info="$t('settings.verification.address_verification')">
    <button class="settings-button">
      {{ $t('settings.verification.address_verification.button') }}
    </button>
  </Section>
  <KYCModal
    v-if="showKYCMode"
    :messageType="getModalMessage"
    :kycUrl="kycUrl"
    @close="showKYCMode = false"
  />
</div>
</template>

<script>
import Section from '@/components/widget/Section.vue';
import FormBuilder from '@/components/widget/FormBuilder.vue';
import KYCModal from '@/components/user_private/KYCModal.vue';

import { USER_REQUEST } from '@/store/actions';
import { KYCMessages } from '@/utils/constants';
import { startKYC } from '@/utils/api';
import { validateDate, validatePostalCode, validateWords, validateNames } from '@/utils/stringUtils';

const KYCStatus = {
  KYC_NOT_DONE: 'KYC_NOT_DONE',
  KYC_PENDING: 'KYC_PENDING',
  KYC_COMPLETE: 'KYC_COMPLETE',
  KYC_FAILED: 'KYC_FAILED',
};

const formModel = [
  { key: 'firstName', validator: validateNames },
  { key: 'lastName', validator: validateNames },
  { key: 'birth', validator: str => validateDate(str, 'DD/MM/YYYY') },
  { key: 'country', validator: validateWords },
  { key: 'postalCode', validator: validatePostalCode },
];

export default {
  name: 'settings-verification',
  components: {
    Section,
    FormBuilder,
    KYCModal,
  },
  data() {
    return {
      formModel,
      formData: formModel.map(({ key }) => ({ [key]: '' })),
      showKYCMode: false,
      kycUrl: '',
      isValidated: false,
    };
  },
  computed: {
    profile() {
      return this.$store.getters.getProfile || {};
    },
    getModalMessage() {
      // KYC complete
      if(this.profile.kyc_status === KYCStatus.KYC_COMPLETE) {
        return KYCMessages.REMOVE_CONFIRMATION;
      }

      // KYC not complete
      if(this.profile.first_name && this.profile.last_name) {
        if(!this.kycUrl) {
          return KYCMessages.URL_FAIL;
        }
        return KYCMessages.SUCCESS;
      }
      return KYCMessages.NO_CONTACT;
    },
    shouldButtonDisabled() {
      const disabledStatus = [KYCStatus.KYC_PENDING, KYCStatus.KYC_FAILED];
      return disabledStatus.includes(this.profile.kyc_status);
    },
    kycButtonStyle() {
      switch(this.profile.kyc_status) {
      case KYCStatus.KYC_PENDING:
        return 'grey';

      case KYCStatus.KYC_COMPLETE:
      case KYCStatus.KYC_FAILED:
        return 'red';

      default:
        return '';
      }
    },
  },
  methods: {
    onValidateEvent($event) {
      this.isValidated = $event.val;
    },
    updateInfo() {
      // [TODO] update info to API
      console.log(this.formData);
    },
    onClickKYC() {
      if(this.profile.kyc_status === KYCStatus.KYC_NOT_DONE) {
        this.initKYC();
      } else if(this.profile.kyc_status === KYCStatus.KYC_COMPLETE) {
        this.removeKYC();
      }
    },
    async initKYC() {
      if(!this.kycUrl) {
        const res = await startKYC();
        this.kycUrl = res.kyc_url;
      }
      this.showKYCMode = true;
    },
    async removeKYC() {
      // [TODO] remove KYC API
      this.showKYCMode = true;
    },
  },
  mounted() {
    this.$store.dispatch(USER_REQUEST);
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.settings-verification {
  .page-header-section {
    border: 0;

    h4 {
      @include h3;
      padding-bottom: 22px;
    }
  }

  .section-right {
    display: flex;
    justify-content: flex-end;
    max-width: 500px;
  }

  .settings-button {
    @include button($main-blue, small, secondary);
    width: 214px;
    padding: 3px 0;

    &.red {
      @include button($main-red, small, secondary);
      &:disabled {
        background-color: rgba($main-red, 0.1);
        color: $main-red;
      }
    }
    &.grey {
      @include button($grey-button, small, primary);
      &:disabled {
        background-color: $grey-button;
      }
    }
  }

  .settings-kyc-verified,
  .settings-verify-email {
    @include h5;
    padding-right: 24px;
    line-height: 38px;
  }

  .settings-kyc-verified {
    color: $main-green;
  }

  .contact-form {
    width: 100%;

    .form-wrapper {
      align-items: flex-end;
      display: flex;
      flex-direction: column;

      .submit {
        @include button($main-black, small);
        width: 261px;
        padding: 0;
      }
    }
  }
}

@media (max-width: $tablet-width) {
  .submit { width: 100%; }
}

@media (max-width: $mobile-width) {
  .settings-button {
    width: 100%;
  }
}

</style>
