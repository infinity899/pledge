<template>
<div class="project content" @click="clickOutside">
  <ProjectTrust
    :pledge="pledge"
    :projectActive="projectActive"
    @update:pledge="pledge = $event"
    @setTab="childSetTab"
  />
  <ProjectInfo
    v-if="project"
    :project="project"
    :projectActive="projectActive"
    @setTab="childSetTab"
  />
  <Sticky v-if="project">
    <TabBar
      ref="projectTabBar"
      :tabs="$t('project.tabs')"
      :activeTab="activeTab"
      :onChangeTab="setTab"
      :updatesCount="updatesCount"
    >
      <template v-slot:menu>
        <div
          v-for="pTab in $t('project.tabs')"
          :key="pTab.label"
          :class="(pTab.label === activeTab.label) ? 'tab-bar-menu-item selected' : 'tab-bar-menu-item'"
          @click="() => { setTab(pTab); $refs.projectTabBar.toggleMenu(); }"
        >
          {{ pTab.label }}
          <span
            v-if="updatesCount && pTab.label === 'Updates'"
            class="tab-bar-menu-item-counter"
          >
            {{ updatesCount }}
          </span>
        </div>
        <div
          class="tab-bar-menu-item mobile-only"
          @click="() => { showShareModal = true; $refs.projectTabBar.toggleMenu(); }"
        >
          {{ $t('project.tabItems.share') }}
        </div>
        <div
          :class="`tab-bar-menu-item mobile-only ${subscribedText}`"
          @click="() => { showSubscribeModal = true; $refs.projectTabBar.toggleMenu(); }"
        >
          {{ subscribedText }}
        </div>
      </template>
      <template v-slot:right>
        <div class="tab-bar-menu-item desktop-only" @click="showShareModal = true">
          {{ $t('project.tabItems.share') }}
        </div>
        <div
          :class="`tab-bar-menu-item desktop-only ${subscribedText}`"
          @click="showSubscribeModal = true"
        >
          {{ subscribedText }}
        </div>
        <div v-if="projectActive" class="tab-bar-menu-item btn-toggle-cart">
          <img
            :src="require('@/static/img/icons/ic_cart.svg')"
            class="img-toggle-cart"
          >
          <span v-if="hasCartItems" class="has-cart" />
          <ShoppingCart
            v-if="hasCartItems && showCart"
            :pledge="pledge"
            :projectId="project.id"
            @rewardEvent="onRewardEvent"
            @hideCart="showCart = false"
            @checkout="checkout"
          />
        </div>
      </template>
    </TabBar>
  </Sticky>
  <keep-alive>
    <component
      :is="activeTab.component"
      v-if="project"
      :project="project"
      :pledge="pledge"
      :status="status"
      @setTab="childSetTab"
      @rewardEvent="onRewardEvent"
    />
  </keep-alive>
  <ShareModal
    v-if="showShareModal"
    :project="project"
    @close="showShareModal = false"
  />
  <SubscribeModal
    v-if="showSubscribeModal"
    :project="project"
    @subscribe="subscribeResult"
    @close="showSubscribeModal = false"
  />
</div>
</template>

<script>
import moment from 'moment';
import ProjectInfo from '@/components/project/ProjectInfo.vue';
import ProjectCampaign from '@/components/project/ProjectCampaign.vue';
import ProjectFaq from '@/components/project/ProjectFAQ.vue';
import ProjectUpdates from '@/components/project/ProjectUpdates.vue';
import ProjectTrust from '@/components/project/ProjectTrust.vue';
import ShareModal from '@/components/project/ShareModal.vue';
import SubscribeModal from '@/components/project/SubscribeModal.vue';
import TabBar from '@/components/widget/TabBar.vue';
import Sticky from '@/components/widget/Sticky.vue';
import ShoppingCart from '@/components/widget/ShoppingCart.vue';

import { RewardEvent, PledgeStatus, ProjectStage } from '@/utils/constants';
import * as api from '@/utils/api';

function parentHasClass(element, classTest) {
  const { className } = element;
  if(className && (String(className)).split(' ').indexOf(classTest) >= 0) {
    return true;
  }
  return element.parentNode && parentHasClass(element.parentNode, classTest);
}

export default {
  name: 'home',
  components: {
    TabBar,
    Sticky,
    ShoppingCart,
    ProjectInfo,
    ProjectCampaign,
    ProjectFaq,
    ProjectUpdates,
    ProjectTrust,
    ShareModal,
    SubscribeModal,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    tab: {
      type: String,
      default: 'project',
    },
  },
  data() {
    return {
      activeTab: null,
      project: null,
      pledge: null,
      showCart: false,
      showShareModal: false,
      showSubscribeModal: false,
    };
  },
  computed: {
    updatesCount() {
      if(!this.project || !this.project.updates) {
        return 0;
      }
      return this.project.updates.length;
    },
    hasCartItems() {
      const { pledge } = this;
      return (
        pledge
        && pledge.status === PledgeStatus.SHOPPING
        && pledge.products
        && pledge.products.length > 0
      );
    },
    subscribedText() {
      if(this.project.subscribed) {
        return this.$t('project.tabItems.subscribed');
      }
      return this.$t('project.tabItems.subscribe');
    },
    status() {
      if(!this.project) return ProjectStage.INACTIVE;
      const {
        start_time: startTime,
        end_time: endTime,
        preorder_start_time: preorderStart,
        storefront_start_time: storefrontStart,
      } = this.project;
      const now = moment();
      if(moment(startTime).isBefore(now) && moment(endTime).isAfter(now)) {
        return ProjectStage.CROWDFUNDING;
      }
      if(storefrontStart && moment(now).isAfter(storefrontStart)) {
        return ProjectStage.STOREFRONT;
      }
      if(preorderStart && moment(now).isAfter(preorderStart)) {
        return ProjectStage.PREORDER;
      }
      return ProjectStage.INACTIVE;
    },
    projectActive() {
      return this.status !== ProjectStage.INACTIVE;
    },
  },
  methods: {
    clickOutside(e) {
      const { className } = e.target;
      if(this.showCart) {
        if(className === 'img-toggle-cart' || !parentHasClass(e.target, 'btn-toggle-cart')) {
          this.showCart = false;
        }
      } else if(className && className === 'img-toggle-cart') {
        this.showCart = true;
      }
    },
    childSetTab(args) {
      const tab = this.tabFromName(args.name);
      this.setTab(tab, args.hash, args.query);
    },
    setTab(tab, hash = '', query = '') {
      const params = { id: this.id, tab: tab.label.toLowerCase() };
      this.$router.replace({ name: 'project', params, hash, query });
      this.activeTab = tab;
    },
    async getProjectDetail() {
      this.project = await api.getProjectDetail(this.id);
    },
    getPledge() {
      if(this.$store.getters.isAuthenticated) {
        api.getPledge(this.id)
          .then((pledge) => {
            this.pledge = pledge;
            console.log(pledge);
          });
      }
    },
    tabFromName(name) {
      const tabs = this.$t('project.tabs');
      for(let i = 0; i < tabs.length; i += 1) {
        if(tabs[i].label.toLowerCase() === name.toLowerCase()) {
          return tabs[i];
        }
      }
      return tabs[0];
    },
    onRewardEvent(data) {
      const { eventType, projectId, amount, variantId } = data;
      if(eventType === RewardEvent.ADD) {
        const matchingProduct = this.findMatchingProduct(variantId);
        const quantity = matchingProduct ? matchingProduct.quantity + 1 : 1;
        this.setPledgeItem(projectId, variantId, quantity);
      } else if(eventType === RewardEvent.REMOVE) {
        const matchingProduct = this.findMatchingProduct(variantId);
        if(matchingProduct && matchingProduct.quantity > 0) {
          const quantity = matchingProduct.quantity - 1;
          this.setPledgeItem(projectId, variantId, quantity);
        }
      } else if(eventType === RewardEvent.REMOVE_ALL) {
        const matchingProduct = this.findMatchingProduct(variantId);
        if(matchingProduct && matchingProduct.quantity > 0) {
          this.setPledgeItem(projectId, variantId, 0);
        }
      } else if(eventType === RewardEvent.DONATE) {
        this.setDonation(projectId, amount);
      } else if(eventType === RewardEvent.EDIT) {
        // Todo -- Go to edit page
      }
    },
    setPledgeItem(projectId, variantId, quantity) {
      api.setPledgeItem({ projectId, variantId, quantity })
        .then((pledge) => {
          if(pledge) {
            this.pledge = pledge;
            this.showCart = true;
          }
        });
    },
    setDonation(projectId, amount) {
      api.setDonation({ projectId, amount })
        .then((res) => {
          this.pledge = res.data.pledge;
          if(res.status === 201) {
            this.showCart = true;
          }
        });
    },
    findMatchingProduct(variantId) {
      // TODO: can't test variantId with backend at the moment, so I don't know if this works
      const { pledge } = this;
      if(!pledge || !pledge.products) return undefined;
      return pledge.products.find(product => (
        product.reward && product.reward.variants && !!product.reward.variants.find(variant => (
          variant.id === variantId
        ))
      ));
    },
    checkout() {
      this.$router.push({
        name: 'checkout',
        params: { id: this.id },
      });
    },
    subscribeResult(subscribed) {
      this.project.subscribed = subscribed;
      this.showSubscribeModal = false;
    },
  },
  created() {
    this.setTab(this.tabFromName(this.tab));
  },
  mounted() {
    this.getProjectDetail();
    this.getPledge();
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.project {
  .tab-bar-wrap {
    border-top: 1px solid $border-light;
    border-bottom: 1px solid $border-light;
    background-color: $white;
  }
  .tab-bar {
    @include container;
    overflow: visible;
    .tab-bar-menu-item {
      @include h5;
      line-height: 85px;
      height: 85px;
      @media (max-width: $tablet-width) {
        line-height: 56px;
        height: 56px;
      }
      &.selected {
        border-bottom: 3px solid $main-blue;
      }
      &.Subscribed {
        color: $grey2;
      }
    }
    .tab-bar-active .tab-bar-menu-item,
    .tab-bar-menu-item.btn-toggle-cart {
      line-height: 85px;
      height: 85px;
    }
    .tab-bar-menu-item-counter {
      margin-left: 4px;
      color: $grey;
    }
    .tab-bar-right {
      .btn-toggle-cart {
        position: relative;
        img {
          margin-bottom: -5px;
        }
        .has-cart {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: $main-orange;
          top: 25px;
          right: 3px;
        }
      }
      .p-shopping-cart {
        position: absolute;
        right: 0;
        top: 85px;
        @media (max-width: $tablet-width) {
          right: -20px;
        }
      }
    }
  }
  .desktop-only {
    display: initial;
  }
  .mobile-only {
    display: none;
  }
  @media (max-width: $tablet-width) {
    .desktop-only {
      display: none;
    }
    .mobile-only {
      display: initial;
    }
    .tab-bar .tab-bar-right .p-shopping-cart {
      position: fixed;
      right: 0;
    }
  }
  @media (max-width: $mobile-width) {
    .tab-bar .tab-bar-right .p-shopping-cart {
      width: unset;
      left: 0;
    }
  }
}
</style>
