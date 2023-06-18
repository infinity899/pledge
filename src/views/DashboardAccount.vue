<template>
<div v-if="project" class="dashboard-accounts-wrap">
  <DashboardHeader :tab="$t('dashboard.account.title')" />
  <div class="container">
    <div class="dashboard-content">
      <h1>{{ $t('dashboard.account.title') }}</h1>
      <h3>{{ $t('dashboard.account.confirm') }}</h3>
      <Section :info="$t('dashboard.account.email')">
        <h5>{{ project.contact_email }}</h5>
      </Section>
      <Section :info="$t('dashboard.account.contact')">
        <TitledInput
          v-model="project.contact_first_name"
          name="contact-first-name"
          :placeholder="$t('dashboard.account.contact.first')"
        />
        <TitledInput
          v-model="project.contact_last_name"
          name="contact-last-name"
          :placeholder="$t('dashboard.account.contact.last')"
        />
        <TitledInput
          v-model="project.contact_birth"
          name="contact-birth"
          :placeholder="$t('dashboard.account.contact.birth')"
        />
        <TitledInput
          v-model="project.coutact_country"
          name="contact-country"
          :placeholder="$t('dashboard.account.contact.country')"
        />
      </Section>
      <h3>{{ $t('dashboard.account.bank') }}</h3>
      <Section :info="$t('dashboard.account.bank_details')">
        <TitledInput
          v-model="project.contact_first_name"
          name="bank-routing"
          :placeholder="$t('dashboard.account.bank_details.routing')"
        />
        <TitledInput
          v-model="project.contact_last_name"
          name="bank-account"
          :placeholder="$t('dashboard.account.bank_details.account')"
        />
      </Section>
      <Section :info="$t('dashboard.account.bank_confirmation')">
        <ImageUpload />
      </Section>
      <Section :info="{ title: '', desc: '' }">
        <button :disabled="!submit_bank_active">
          {{ $t('dashboard.account.bank_submit') }}
        </button>
      </Section>
    </div>
  </div>
</div>
</template>

<script>
import * as api from '@/utils/api';
import DashboardHeader from '@/components/builder/DashboardHeader.vue';
import Section from '@/components/widget/Section.vue';
import ImageUpload from '@/components/widget/ImageUpload.vue';
import TitledInput from '@/components/widget/TitledInput.vue';

export default {
  name: 'dashboard-accounts',
  components: {
    DashboardHeader,
    Section,
    ImageUpload,
    TitledInput,
  },
  data() {
    return {
      project: null,
      submit_bank_active: false,
      staleTimer: null,
      stale: new Set(),
    };
  },
  async created() {
    this.project = await api.getCreatorProjectDetail(this.$route.params.id);
  },
};

</script>

<style lang="scss">
@import 'widgets.scss';

.dashboard-content {
  margin-bottom: 96px;
  h1 {
    margin-top: 64px;
  }
  h3 {
    margin-top: 80px;
    margin-bottom: 24px;
  }
  .p-input {
    font-weight: 600;
  }
  button {
    @include button($main-black, large);
    position: relative;
    float: right;
  }
}
</style>
