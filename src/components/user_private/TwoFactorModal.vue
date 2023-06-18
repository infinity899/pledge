<template>
<Modal
  class="two-factor-modal"
  :cancelable="true"
  :title="$t('settings.account.two_factor.modal_title')"
  :submitText="$t(`settings.account.two_factor.buttons[${currentStep}]`)"
  :expanded="false"
  @submit="handleSubmit"
  @cancel="$emit('close')"
>
  <template v-slot:content>
    <div v-if="currentStep === 0" class="info-section step-1">
      <h4>{{ $t('settings.account.two_factor.pair_app.title') }}</h4>
      <p class="p_small">
        {{ $t('settings.account.two_factor.pair_app.desc') }}
      </p>
      <div class="qr-code">
        <QRCode :value="secretCode" :options="{ width: 180 }" />
      </div>

      <hr>

      <h4>{{ $t('settings.account.two_factor.password_required.title') }}</h4>
      <p class="p_small">
        {{ $t('settings.account.two_factor.password_required.desc') }}
      </p>
      <TitledInput
        v-model="password"
        type="password"
        placeholder="Password"
        :errorMessage="errors.password"
      />

      <hr>

      <h4>{{ $t('settings.account.two_factor.enter_digits.title') }}</h4>
      <p class="p_small">
        {{ $t('settings.account.two_factor.enter_digits.desc') }}
      </p>
      <TitledInput
        v-model="code"
        class="code-input"
        placeholder="000000"
        mask="######"
        :errorMessage="errors.code"
      />
    </div>

    <div v-if="currentStep === 1" class="info-section step-2">
      <h4>{{ $t('settings.account.two_factor.almost_done.title') }}</h4>
      <p class="p_small">
        {{ $t('settings.account.two_factor.almost_done.desc') }}
      </p>

      <hr>

      <h4>{{ $t('settings.account.two_factor.recovery_codes.title') }}</h4>
      <!-- eslint-disable vue-i18n/no-raw-text -->
      <div class="recovery-codes">
        <div class="recovery-codes-block">
          <div
            v-for="(item, idx) in recoveryCodes.slice(0, 8)"
            :key="item"
            class="recovery-codes-item"
          >
            <p class="p_small no">
              {{ idx + 1 }}.
            </p>
            <p class="p_small value">
              {{ item }}
            </p>
          </div>
        </div>
        <div class="recovery-codes-block">
          <div
            v-for="(item, idx) in recoveryCodes.slice(8, 16)"
            :key="item"
            class="recovery-codes-item"
          >
            <p class="p_small no">
              {{ idx + 8 }}.
            </p>
            <p class="p_small value">
              {{ item }}
            </p>
          </div>
        </div>
      </div>
      <!-- eslint-enable vue-i18n/no-raw-text -->
    </div>

    <div v-if="currentStep === 2" class="info-section step-3">
      <h4>{{ $t('settings.account.two_factor.process_complete.title') }}</h4>
      <p class="p_small">
        {{ $t('settings.account.two_factor.process_complete.desc') }}
      </p>
    </div>
  </template>
</Modal>
</template>

<script>
import QRCode from '@chenfengyuan/vue-qrcode';
import Modal from '@/components/widget/Modal.vue';
import TitledInput from '@/components/widget/TitledInput.vue';

export default {
  name: 'two-factor-modal',
  components: {
    QRCode,
    Modal,
    TitledInput,
  },
  data() {
    return {
      password: '',
      code: '',
      secretCode: 'hello world',
      recoveryCodes: [
        '6f138be3', '22aaf0fc', '56a50920', '9ce8ff44', 'ff839bc9', '618b7c29', 'c1abca7f', '81c5a2b4',
        '73da9695', 'c699a6fc', 'a6911ccc', '49ea6801', '567841d2', '7b730e3f', 'bce6524b', '4e9825e2',
      ],
      currentStep: 0,
      errors: {},
    };
  },
  methods: {
    goNext() {
      this.currentStep += 1;
    },
    handleNext() {
      let isValidated = true;
      this.errors = {};
      if(!this.password) {
        this.errors.password = this.$t('settings.account.two_factor.errors.PASSWORD_MISSING');
        isValidated = false;
      }
      if(!this.code || this.code.length < 6) {
        this.errors.code = this.$t('settings.account.two_factor.errors.CODE_MISSING');
        isValidated = false;
      }
      if(isValidated) {
        // TODO: Integrate api
        this.goNext();
      }
    },
    handleDownload() {
      const downloadText = this.recoveryCodes.join('\n');
      this.downloadContent('recovery.txt', downloadText);
      setTimeout(this.goNext, 500); // Wait until downloading starts
    },
    handleDone() {
      this.$emit('close');
    },
    handleSubmit() {
      if(this.currentStep === 0) {
        this.handleNext();
      } else if(this.currentStep === 1) {
        this.handleDownload();
      } else if(this.currentStep === 2) {
        this.handleDone();
      }
    },
    downloadContent(filename, text) {
      const element = document.createElement('a');
      element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);
    },
  },
};
</script>

<style lang="scss">
@import 'widgets';

.two-factor-modal {
  overflow-x: hidden;
  .modal-inner {
    margin-top: 48px;
  }
  .info-section {
    margin-bottom: 40px;
    p {
      color: $black-med;
    }
  }
  .qr-code {
    text-align: center;
    margin-bottom: -30px;
  }
  .code-input input {
    letter-spacing: 3px;
  }
  .recovery-codes {
    display: flex;
    .recovery-codes-block {
      width: 50%;
      padding: 36px 40px;
    }
    .recovery-codes-item {
      display: flex;
      .no {
        width: 60px;
      }
    }
    p {
      margin: 0;
    }
  }
  hr {
    margin: 40px 0 24px;
  }
  .submit-button {
    @include button($main-black, large);
  }
}
</style>
