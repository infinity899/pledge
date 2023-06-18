<template>
<div class="insights-content insights-referrers">
  <div class="referrers-main">
    <div class="insights-header">
      {{ $t('manager.insights.referrers.header') }}
      <div class="learn-more">
        {{ $t('manager.insights.referrers.learn') }}
      </div>
    </div>
    <InsightsList
      :items="referrerData"
      :listHeaders="referrerHeaders"
      tableClass="referrers-table"
      :selectable="false"
    />
  </div>
  <div class="referrers-tags">
    <div class="insights-header tags-header">
      {{ $t('manager.insights.referrers.tags') }}
      <div class="learn-more">
        {{ $t('manager.insights.referrers.learn') }}
      </div>
    </div>
    <div class="tags-info">
      {{ $t('manager.insights.referrers.tags_info') }}
    </div>
    <div class="tags-row-header">
      <div>
        <input
          :placeholder="$t('manager.insights.referrers.tag_name')"
          :value="link"
          @input="handleInput"
        >
      </div>
      <div class="referrers-copy" @click="generateLink">
        {{ $t('manager.insights.referrers.generate') }}
      </div>
    </div>
    <div class="tags-list">
      <div
        v-for="(item, idx) in links"
        :key="idx"
        class="tags-row"
      >
        <div class="tags-edit-wrap">
          <component
            :is="editingLinks.indexOf(item.id) < 0 ? 'div' : 'input'"
            :value="item.name"
            @input="handleEditInput(item.id, $event.target.value)"
          >
            {{ item.name }}
          </component>
          <Edit
            v-if="editingLinks.indexOf(item.id) < 0"
            class="edit-icon"
            @click="handleEditClick(item.id)"
          />
          <img
            v-if="editingLinks.indexOf(item.id) >= 0"
            class="accept-icon"
            :src="require('../../static/img/icons/ic_check.png')"
            @click="updateLink(item.id)"
          >
        </div>
        <CopyButton
          :text="$t('copy_link')"
          :copyText="item.link"
          styleClass="referrers-copy"
        />
      </div>
      <div v-if="!links.length" class="tags-empty">
        {{ $t('manager.insights.referrers.no_tags') }}
      </div>
    </div>
  </div>
</div>
</template>

<script>
import InsightsList from '@/components/manager/InsightsList.vue';
import CopyButton from '@/components/widget/CopyButton.vue';
import Edit from '@/components/svg/Edit.vue';
import {
  getReferralLinks,
  createReferralLink,
  updateReferralLink,
  deleteReferralLink,
} from '@/utils/api';

export default {
  name: 'insights-referrers',
  components: {
    InsightsList,
    CopyButton,
    Edit,
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      link: '',
      links: [],
      editingLinks: [],
      editValues: {},
      referrerData: [
        {
          referrer: 'Facebook',
          category: 'External',
          backers: 125,
          percentage: '3%',
          amount_pledged: '$1,215.67',
        },
        {
          referrer: 'google.com',
          category: 'External',
          backers: 66,
          percentage: '23%',
          amount_pledged: '$1,215.67',
        },
        {
          referrer: 'Internal',
          category: 'Pledgecamp',
          backers: 521,
          percentage: '23%',
          amount_pledged: '$1,215.67',
        },
        {
          referrer: 'Search',
          category: 'Pledgecamp',
          backers: 77,
          percentage: '23%',
          amount_pledged: '$1,215.67',
        },
        {
          referrer: 'IG Campaign 1',
          category: 'Custom',
          backers: 152,
          percentage: '23%',
          amount_pledged: '$1,215.67',
        },
        {
          referrer: 'IG Campaign 2',
          category: 'Custom',
          backers: 251,
          percentage: '23%',
          amount_pledged: '$1,215.67',
        },
      ],
      referrerHeaders: [
        { title: 'Referrer', type: 'referrer' },
        { title: 'Type', type: 'category' },
        { title: '# Pledges', type: 'backers' },
        { title: '% of Pledged', type: 'percentage' },
        { title: '$ Pledged', type: 'amount_pledged' },
      ],
    };
  },
  methods: {
    getTags(referrerData) {
      return referrerData.filter(item => item.category === 'Custom' || item.category === 'External');
    },
    handleInput(e) {
      this.link = e.target.value;
    },
    handleEditInput(id, val) {
      this.editValues[id] = val;
    },
    handleEditClick(id) {
      this.editingLinks.push(id);
    },
    async getLinks() {
      const projectId = this.$route.params.id;
      try {
        const resp = await getReferralLinks(projectId);
        const links = resp.data.referral_links;
        this.links = links;
      } catch(err) {
        console.log('Error fetching links: ', err);
      }
    },
    async generateLink() {
      const projectId = this.$route.params.id;
      try {
        await createReferralLink({
          projectId,
          name: this.link,
        });
        this.getLinks();
      } catch(err) {
        console.log('Error creating link: ', err);
      }
      this.link = '';
    },
    async updateLink(linkId) {
      const projectId = this.$route.params.id;
      const name = this.editValues[linkId];
      try {
        await updateReferralLink({
          projectId,
          linkId,
          name,
        });
        const idx = this.editingLinks.indexOf(linkId);
        this.editingLinks = [
          ...this.editingLinks.slice(0, idx),
          ...this.editingLinks.slice(idx + 1),
        ];
        delete this.editValues[linkId];
        this.getLinks();
      } catch(err) {
        // TODO: handle error
        const idx = this.editingLinks.indexOf(linkId);
        this.editingLinks = [
          ...this.editingLinks.slice(0, idx),
          ...this.editingLinks.slice(idx + 1),
        ];
        delete this.editValues[linkId];
      }
    },
    async deleteLink(linkId) {
      const projectId = this.$route.params.id;
      try {
        await deleteReferralLink({
          projectId,
          linkId,
        });
        this.getLinks();
      } catch(err) {
        console.log('Error deleting link: ', err);
      }
    },
  },
  mounted() {
    // this.getLinks();
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.insights-referrers {
  width: 100%;
  min-height: 250px;

  .referrers-main {
    width: 65%;
    padding-right: 4%;
    min-width: 620px;
    margin-right: 10px;
  }
  .referrers-tags {
    width: 35%;
    min-width: 300px;
    margin-right: 10px;

    .tags-empty {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      @include h4;
      color: rgba(0, 0, 0, 0.3);
    }
    .tags-header {
      margin-bottom: 10px;
    }
    .tags-info {
      @include p_small;
      margin-bottom: 25px;
    }
    .tags-row, .tags-row-header {
      @include subtitle;
      display: flex;
      flex-direction: row;
      padding: 12px 0 9px 16px;
      box-sizing: border-box;
      border-bottom: 1px solid $border-light;
      > div {
        display: flex;
        flex: 1 0 auto;
        img, svg {
          height: 12px;
          cursor: pointer;
          opacity: 0.3;
          &.edit-icon {
            margin: 4px 0 0 8px;
          }
          &.accept-icon {
            position: relative;
            right: 24px;
            margin-top: 8px;
          }
        }
      }
      .referrers-copy {
        @include subtitle;
        color: $main-blue;
        cursor: pointer;
        flex: 0 0 auto;
        margin-right: 16px;
      }
      input {
        @include subtitle;
        color: $grey;
        outline: none;
        resize: none;
        border: none;
        padding: 5px;
        box-sizing: border-box;
        &::placeholder {
          opacity: 1;
        }
      }
    }
    .tags-row-header {
      border: 1px solid $border-light;
      input {
        padding: 0;
      }
      @media (max-width: $mobile-width) {
        > div {
          &:nth-child(1) {
            width: 50%;
          }
        }
      }
    }
    .tags-row {
      background-color: $grey-light;
    }
    .tags-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 200px;
      overflow-y: auto;
      background-color: $grey-light;
      border-width: 0 1px 1px;
      border-color: $border-light;
      border-style: solid;
    }
  }
  @media (max-width: $tablet-width-large) {
    .referrers-main {
      width: 100%;
      padding-right: 0;
      min-width: unset;
    }
    .referrers-tags {
      width: 75%;
      margin: 24px auto 0;
    }
  }
  @media (max-width: $mobile-width) {
    .referrers-tags {
      width: 100%;
      min-width: unset;
    }
  }
}

.referrers-table {
  table {
    width: 100%;
    th, td {
      &:nth-child(n+3) {
        text-align: right;
      }
    }
    tr:nth-child(1) {
      > th:nth-child(n+3) {
        > div {
          float: right;
        }
      }
    }
  }
}
</style>
