<template>
<div>
  <div class="wallet-summary">
    <!-- eslint-disable vue-i18n/no-raw-text -->
    <h1>{{ wallet.balance.amount }} {{ wallet.balance.currencyCode }}</h1>
    <!-- eslint-enable vue-i18n/no-raw-text -->
    <div
      v-if="tab.id === 'PLG'"
      class="wallet-button"
      @click="buyPLG"
    >
      {{ tab.buy_more }}
    </div>
    <div v-if="tab.id === 'CS' && wallet.balance.amount < 100000" class="wallet-moderator-status">
      <div>
        {{ $t('wallet.moderator_status_not_achieved') }}<br>
        <a href="#" target="_blank">{{ $t('learn_more') }}</a>
      </div>
      <img :src="require('@/static/img/protection.png')">
    </div>
    <div v-else-if="tab.id === 'CS'" class="wallet-moderator-status status-achieved" />
  </div>
  <hr>
  <div class="wallet-convert">
    <div class="description">
      <h4>{{ tab.convert_title }}</h4>
      <p>{{ tab.convert_description }}</p>
    </div>
    <div v-if="wallet.hasValidKYC" class="wallet-button" @click="convert">
      {{ $t('wallet.convert') }}
    </div>
    <div v-else class="wallet-invalid-kyc">
      <i18n path="wallet.invalid_kyc" tag="p">
        <!-- @TODO: link for KYC verification here. -->
        <a place="here" target="_blank" href="#">{{ $t('wallet.here') }}</a>
      </i18n>
    </div>
  </div>
  <hr>
  <div class="wallet-data">
    <div class="wallet-history">
      <h3>{{ $t('wallet.history') }}</h3>
      <div class="wallet-transactions-filter">
        <!-- @TODO: reuse a selector component? -->
      </div>
      <div v-if="wallet.transactions" class="wallet-transactions-data">
        <table class="wallet-transactions-table">
          <tr v-for="row in wallet.transactions" :key="row.id">
            <td>{{ row.date }}</td>
            <td>{{ $t('wallet.transferred', { "amount": row.amount, "code": wallet.balance.currencyCode }) }}</td>
            <!-- eslint-disable vue-i18n/no-raw-text -->
            <td>{{ row.amount }} {{ wallet.balance.currencyCode }}</td>
            <!-- eslint-enable vue-i18n/no-raw-text -->
          </tr>
        </table>
        <div class="submit-button" @click="loadMoreTransactions">
          {{ $t('wallet.load_more') }}
        </div>
      </div>
    </div>
    <div class="wallet-faq">
      <h3>{{ $t('wallet.faq') }}</h3>
      <div id="faq" class="faq-content">
        <div v-if="wallet.faqs && wallet.faqs.length" class="faq-items">
          <FAQAccordion
            v-for="(faqItem, index) in wallet.faqs"
            :key="index"
            v-model="wallet.faqs[index]"
          />
        </div>
      </div>
    </div>
  </div>
  <WalletConvertModal
    v-if="showConvertModal"
    :toggleModal="toggleModal"
    :wallet="wallet"
    :fromCurrency="wallet.balance.currencyCode"
    :toCurrency="wallet.balance.currencyCode === 'PLG' ? 'CS' : 'PLG'"
  />
  <UnimplementedModal
    v-if="showUnimplemented"
    :creator="false"
    @closeModal="showUnimplemented = false"
  />
</div>
</template>

<script>
// import * as api from '@/utils/api';
import * as moment from 'moment';
import FAQAccordion from '@/components/project/FAQAccordion.vue';
import WalletConvertModal from '@/components/user_private/WalletConvertModal';
import UnimplementedModal from '@/components/widget/UnimplementedModal.vue';

export default {
  name: 'wallet',
  components: {
    WalletConvertModal,
    UnimplementedModal,
    FAQAccordion,
  },
  props: {
    wallet: {
      type: Object,
      required: true,
    },
    tab: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showUnimplemented: false,
      showConvertModal: false,
      showBuyPLGModal: false,
      filterSelected: '',
    };
  },
  computed: {
    filterOptions() {
      const monthNames = moment.months();
      const options = [];
      const { transactions } = this.wallet;
      transactions.sort((a, b) => moment(a.date).diff(moment(b.date))).forEach((element) => {
        const year = moment(element.date).format('YYYY');
        if(year && !options[year]) {
          options[year] = {
            name: this.$t('wallet.filter_statement_label_year', { year }),
            months: [],
          };
        }

        const newMonth = monthNames[moment(element.date).getMonth()];
        if(year && !options[year].months.includes(newMonth)) {
          options[year].months.push(newMonth);
        }
      });

      return options;
    },
  },
  methods: {
    unimplemented(e) {
      this.showUnimplemented = true;
      e.stopPropagation();
      e.preventDefault();
    },
    buyPLG(e) {
      this.unimplemented(e);
      // @TODO: uncomment when implemented.
      // this.toggleModal('buyPLG');
    },
    convert() {
      this.toggleModal('convert');
    },
    toggleModal(which) {
      if(which === 'convert') {
        this.showConvertModal = !this.showConvertModal;
      } else if(which === 'buyPLG') {
        this.showBuyPLGModal = !this.showBuyPLGModal;
      }
    },
    filterUpdated() {
      // @TODO: api call, filter list?
    },
    loadMoreTransactions(e) {
      this.unimplemented(e);
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.wallet-summary,
.wallet-convert,
.wallet-data {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .description {
    width: 40%;
  }
  .wallet-history {
    width: 60%;
  }
  .wallet-faq {
    width: 40%;
    padding-left: 50px;
  }
  .faq-items {
    .faq-accordion {
      height: 56px;

      .faq-title {
        @include h5;
      }
    }
  }
  .wallet-invalid-kyc {
    width: 40%;
    p {
      padding: 20px;
      background: #f4f5fe;
    }
    a {
      color: $main-blue;
    }
  }
  .wallet-moderator-status {
    @include h5;
    line-height: 20px;
    display: flex;
    text-align: right;
    a {
      color: $main-blue;
    }
    img {
      width: 42px;
      height: 42px;
      margin-left: 16px;
    }

    &.status-achieved {
      width: 52px;
      height: 61px;
      margin: 0 60px;
      background: url('../../static/img/ic_moderator.svg');
      background-size: cover;
    }
  }
}

.wallet-button {
  @include button($main-blue, small, secondary);
  min-width: 176px;
  padding: 0;
}

.wallet-transactions-data {
  padding: 20px 0;
}

.wallet-transactions-table {
  border-collapse: collapse;
  text-align: left;
  width: 100%;
  margin-bottom: 25px;
  tr {
    height: 45px;
    background-color: #f7f8fa;
    &:nth-child(even) {
      background-color: #e7eaee;
    }
  }
  td {
    padding: 0 20px;
    @include h5;

    &:first-child {
      color: $grey50;
    }
    &:last-child {
      text-align: right;
    }
  }
}

@media (max-width: $tablet-width-large) {
  .wallet-convert .description {
    width: 100%;
  }
}

@media (max-width: $tablet-width) {

  .wallet-data {
    .wallet-history,
    .wallet-faq {
      padding: 0;
      width: 100%;
      h3 {
        text-align: center;
      }
    }
  }
}
</style>
