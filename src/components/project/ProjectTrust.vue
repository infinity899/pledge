<template>
<div v-if="pledge" class="container trust">
  <div class="trust-wrap">
    <div class="trust-container trust-amount">
      <div class="trust-image">
        <img :src="require('@/static/img/icons/ic_backers.png')">
      </div>
      <div class="reward-container">
        <p>
          {{ $t('project.trust.backed', [pledgeAmount, pledgedTime]) }}
        </p>
        <button @click="toggleModal('reward')">
          {{ $t('project.trust.pledge_cta') }}
        </button>
      </div>
    </div>
    <hr>
    <div
      v-if="projectActive"
      class="trust-container"
      :class="[ pledgeVote ? 'trust-vote-true' : 'trust-vote-false']"
    >
      <img :src="require('@/static/img/icons/ic_protection.png')">
      <div class="vote-container">
        <div class="trust-vote-text">
          <p v-if="pledgeVote">
            {{ $t('project.trust.vote_positive') }}
          </p>
          <p v-else>
            {{ $t('project.trust.vote_negative') }}
            <span
              class="trust-vote-info"
              @mouseover="isToolTip = true"
              @mouseleave="isToolTip = false"
            >
              <span class="tooltip">
                <Info />
                <div v-show="isToolTip" class="tooltip-text">
                  {{ $t('project.trust.tooltip') }}
                </div>
              </span>
            </span>
          </p>
        </div>
        <button @click="toggleModal('vote')">
          {{ $t('project.trust.vote_cta') }}
        </button>
      </div>
    </div>
  </div>
  <ProjectRewardModal
    v-if="showRewardModal"
    :pledge="pledge"
    :projectActive="projectActive"
    :toggleModal="toggleModal"
    @update:pledge="$emit('update:pledge', $event)"
    @unimplemented="toggleModal(); showUnimplemented = true;"
    @addMoreRewards="addMoreRewards"
  />
  <ProjectVoteModal
    v-if="showVoteModal"
    :toggleModal="toggleModal"
    :submitVote="submitVote"
    :pledgeVote="pledgeVote"
  />
  <UnimplementedModal
    v-if="showUnimplemented"
    @closeModal="showUnimplemented = false"
  />
</div>
</template>

<script>
import * as moment from 'moment';
import ProjectVoteModal from '@/components/project/ProjectVoteModal.vue';
import ProjectRewardModal from '@/components/project/ProjectRewardModal.vue';
import Info from '@/components/svg/Info.vue';
import UnimplementedModal from '@/components/widget/UnimplementedModal.vue';

export default {
  name: 'project-trust',
  components: {
    ProjectRewardModal,
    ProjectVoteModal,
    Info,
    UnimplementedModal,
  },
  props: {
    pledge: {
      type: Object,
      default: null,
    },
    projectActive: Boolean,
    setTab: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      isToolTip: false,
      showVoteModal: false,
      showRewardModal: false,
      showUnimplemented: false,
      pledgeVote: false, // TODO -- use real data
    };
  },
  computed: {
    pledgedTime() {
      if(!this.pledge) {
        return null;
      }
      return moment(this.pledge.updated).format('DD MMM YYYY');
    },
    pledgeAmount() {
      return this.$options.filters.from_cents(this.pledge.sub_total_usd);
    },
    reward() {
      if(!this.pledge) {
        return null;
      }
      return this.pledge.products[0].reward;
    },
  },
  methods: {
    toggleModal(which) {
      if(which === 'vote') {
        this.showVoteModal = !this.showVoteModal;
      } else if(which === 'reward') {
        this.showRewardModal = !this.showRewardModal;
      }
    },
    submitVote() {
      this.pledgeVote = !this.pledgeVote;
      this.toggleModal('vote');
    },
    addMoreRewards() {
      this.toggleModal('reward');
      this.$emit('setTab', { name: 'project', hash: '#project-rewards' });
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.container.trust {
  overflow: unset;
  p {
    margin: 0;
  }
}

.trust-wrap {
  border: 1px solid $blue-med;
  margin-bottom: 60px;
  .vote-container, .reward-container {
    display: flex;
    width: 100%;
  }
  hr {
    margin: 0 32px;
    border-bottom: 1px solid $grey-light;
  }
  .trust-container {
    padding: 24px 32px;
    display: flex;
    align-items: center;
    .trust-amount {
      border-bottom: 1px solid $blue-med;
    }
    img {
      height: 24px;
      width: 24px;
      margin-right: 32px;
    }
    p {
      @include h4;
    }
    button {
      @include link;
      text-transform: uppercase;
      margin-left: auto;
    }
    &.trust-vote-true {
      background-color: rgba(236, 74, 41, 0.1);
    }
    &.trust-vote-false .trust-vote-text p {
      color: $grey;
    }
  }

  .trust-vote-info {
    margin-left: 8px;
  }
  .tooltip {
    position: relative;
    .tooltip-text {
      position: absolute;
      z-index: 100;
      width: 350px;
      top: 100%;
      left: 50%;
      margin: 8px 0 0 -175px;
      padding: 28px 24px 24px 24px;
      background-color: #fff;
      box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
      @include p_small;
      font-weight: 300;
      &::after {
        content: " ";
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -8px;
        border-width: 8px;
        border-style: solid;
        border-color: transparent transparent #fff transparent;
      }
    }
  }
  @media (max-width: $mobile-width) {
    margin: 0 -20px;
    border-left: none;
    border-right: none;
    .vote-container, .reward-container {
      flex-direction: column;
      align-items: flex-start;
    }
    .trust-container {
      align-items: flex-start;
      button {
        margin-left: 0;
        margin-top: 8px;
      }
    }
    .trust-vote-text {
      align-items: flex-start;
    }
  }
}
</style>
