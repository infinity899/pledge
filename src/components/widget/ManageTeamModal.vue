<template>
<transition name="fade">
  <div class="manage-team-modal-wrap">
    <ModalHeader quitText="Cancel" @hideModal="$emit('hideModal')" />
    <div class="manage-team-content">
      <h2>{{ $t('dashboard.manage') }}</h2>
      <div class="manage-team-body">
        <h4>{{ $t('dashboard.manage_team.collaborators') }}</h4>
        <div>
          {{ $t('dashboard.manage_team.invite') }}
        </div>
        <div class="manage-team-invite">
          <input
            v-model="inviteEmail"
            :placeholder="$t('dashboard.manage_team.email')"
          >
          <TitledSelect
            v-model="value"
            type="select"
            :options="options"
          >
            <template slot="singleLabel" slot-scope="{ option }">
              <div>
                {{ option.title }}
              </div>
            </template>
            <template slot="option" slot-scope="props">
              <div class="option__title">
                {{ props.option.title }}
              </div>
              <div class="option__desc">
                {{ props.option.desc }}
              </div>
            </template>
          </TitledSelect>
          <div class="manage-team-invite-send">
            {{ $t('dashboard.manage_team.send') }}
          </div>
        </div>
        <h4 class="manage-team-title">
          {{ $t('dashboard.manage_team.team') }}
        </h4>
        <div
          v-for="(member, index) in team"
          :key="index"
          class="manage-team-member"
        >
          <router-link :to="{ name: 'user-public', params: {id: member.id}}">
            <img :src="member | avatar">
            <h5>{{ member.name }}</h5>
          </router-link>
          <h5>{{ member.role }}</h5>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import ModalHeader from '@/components/widget/ModalHeader.vue';
import TitledSelect from '@/components/widget/TitledSelect.vue';

export default {
  name: 'manage-team-modal',
  components: {
    ModalHeader,
    TitledSelect,
  },
  props: {
    project: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      inviteEmail: '',
      value: [{ title: 'Can Edit' }],
      options: this.$t('dashboard.manage_team.roles'),
    };
  },
  computed: {
    team() {
      if(this.project) {
        return [{
          ...this.project.creator,
          role: 'Creator',
        }];
      }
      return [];
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.manage-team-modal-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: scroll;
  background-color: $white;
  z-index: 2000;
  padding: 32px 50px 72px;

  .manage-team-content {
    max-width: 600px;
    margin: 24px auto 0 auto;

    h2 {
      text-align: center;
    }
    .manage-team-body {
      margin-top: 48px;

      .manage-team-invite {
        display: flex;
        margin-top: 24px;
        input {
          @include input;
          border-right: none;
        }
        .p-select-wrap {
          width: 200px;
          min-width: 200px;
          height: 48px;
          margin: 0;
          .option__desc {
            font-family: $font-normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
          }
        }
        .manage-team-invite-send {
          @include button_small_text;
          border: 1px solid $border-light;
          border-left: none;
          width: 120px;
          min-width: 120px;
          line-height: 48px;
          height: 48px;
          text-align: center;
          color: $main-blue;
        }
      }
      .manage-team-title {
        margin: 64px 0 24px;
      }
      .manage-team-member {
        display: flex;
        align-items: center;
        border-top: 1px solid $border-light;
        border-bottom: 1px solid $border-light;
        > h5 {
          padding-top: 4px;
          margin-left: auto;
        }
        a {
          display: flex;
          align-items: center;
          padding: 12px 0;
          img {
            width: 40px;
            height: 40px;
          }
          h5 {
            margin-left: 16px;
            padding-top: 4px;
          }
        }
      }
    }
  }
  @media (max-width: $mobile-width) {
    .manage-team-content .manage-team-body .manage-team-invite {
      flex-direction: column;
      input {
        width: 100%;
        border: 1px solid $border-light;
      }
      .p-select-wrap {
        width: 100%;
        margin-top: 16px;
      }
      .manage-team-invite-send {
        border: 1px solid $border-light;
        margin-top: 16px;
        width: 100%;
      }
    }
  }
}

</style>
