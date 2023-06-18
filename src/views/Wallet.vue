<template>
<div class="container">
  <div class="wallet-content container-content">
    <div class="wallet-currencies">
      <TabBar
        :tabs="$t('wallet.tabs')"
        :activeTab="activeTab"
        :onChangeTab="setTab"
      />
    </div>
    <Wallet :wallet="activeWallet" :tab="activeTab" />
  </div>
</div>
</template>

<script>
import * as api from '@/utils/api';
import Wallet from '@/components/user_private/Wallet.vue';
import TabBar from '@/components/widget/TabBar.vue';

export default {
  name: 'wallet-main',
  components: {
    Wallet,
    TabBar,
  },
  data() {
    return {
      activeTab: null,
      wallets: null,
    };
  },
  computed: {
    activeWallet() {
      return this.wallets[this.activeTab.id];
    },
  },
  methods: {
    setTab(tab, hash = '', query = '') {
      this.$router.replace({ path: `/wallet/${tab.id}`, hash, query });
      // @TODO: update according to API data.
      this.activeTab = tab;
    },
  },
  created() {
    // @TODO: API needs to be implemented.
    this.wallets = api.getUserWallets();
    const tabId = this.$route.params.tab;
    const tab = this.$t('wallet.tabs').find(t => t.id === tabId);
    this.setTab(tab || this.$t('wallet.tabs')[0]);
  },
};

</script>

<style lang="scss">
@import 'general.scss';

.wallet-content {
  margin: 48px 0;

  .wallet-currencies {
    padding-bottom: 48px;

    .tab-bar {
      border-bottom: 1px solid $border-light;

      .tab-bar-menu-item.selected {
        border-bottom: 3px solid $main-blue;
      }
    }
  }
}
</style>
