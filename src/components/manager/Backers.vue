<template>
<div v-if="pledges" class="backer-table-wrap">
  <div class="table-header">
    <div class="header-left">
      <div class="table-search">
        <Search :size="24" :strokeWidth="1" />
        <div class="search-wrap">
          <input
            v-model="backerSearchText"
            class="search-input"
            :placeholder="`${$t('manager.backers.search_backers')} ${pledges.length} ${$t('manager.backers.backers')}`"
            maxLength="20"
          >
        </div>
      </div>
      <div class="search-filters">
        <div class="filters">
          <!-- TODO: use FilterMenu for reward dropdown -->
          <!-- <FilterMenu
            :items="rewards"
            :itemsChecked="rewardChecked.length"
            :filterType="$t('manager.backers.rewards')"
            :isChecked="(item) => isChecked(item, 'reward')"
            :itemsClass="{'filter-rewards': true, 'rewards-checked': rewardChecked.length}"
            @check="handleCheck($event, 'reward')"
          /> -->
          <div v-on-clickaway="closeRewardMenu" class="filter-wrap">
            <div
              class="filter-button"
              :class="{'filter-checked': rewardChecked.length, 'menu-open': menus.rewardsMenuOpen && !rewardChecked.length}"
              @click="handleMenuOpen('rewards')"
            >
              {{ `${$t('manager.backers.rewards')} ${rewardChecked.length > 0 ? `(${rewardChecked.length})` : ''}` }}
            </div>
            <div
              v-if="menus.rewardsMenuOpen"
              class="menu-dropdown"
              :class="{'filter-rewards': true, 'rewards-checked': rewardChecked.length}"
            >
              <div
                v-for="(reward, index) in rewards"
                :key="index"
                class="reward"
              >
                <div
                  class="filter-item"
                  :class="'rewards'"
                  @click="handleCheck(reward, 'reward')"
                >
                  <div>
                    <Checkbox
                      :item="{ checked: isChecked(reward, 'reward') }"
                      :onCheck="() => handleCheck(reward, 'reward')"
                    />
                  </div>
                  <div class="item" :class="'reward-item'">
                    <div>
                      {{ reward.title }}
                    </div>
                    <div class="chevron-wrap" @click="(e) => toggleRewardTypesMenu(index, e)">
                      <div
                        v-if="reward.types.length"
                        class="backer-chevron"
                        :class="!rewardTypesOpen(index) ? 'ascending' : ''"
                      />
                    </div>
                  </div>
                </div>
                <div v-if="reward.types.length && rewardTypesOpen(index)">
                  <div
                    v-for="(rewardType, idx) in reward.types"
                    :key="idx"
                    class="filter-item"
                    :class="'item-type'"
                  >
                    <div>
                      <Checkbox
                        :item="{ checked: false }"
                        :onCheck="() => {}"
                      />
                    </div>
                    <div class="item" :class="'reward-item'">
                      <div>
                        {{ rewardType.title }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FilterMenu
            :items="destinationData"
            :itemsChecked="destinationChecked.length"
            :filterType="$t('manager.backers.destination')"
            :isChecked="(item) => isChecked(item, 'destination')"
            :itemsClass="{'filter-destination': true, 'destination-checked': destinationChecked.length}"
            :wrapperClass="'destinations'"
            @check="handleCheck($event, 'destination')"
          >
            <template slot="search">
              <div
                class="table-search"
                :class="'destination-search'"
              >
                <div class="search-wrap">
                  <input
                    v-model="destSearchText"
                    class="search-input"
                    :placeholder="`Filter ${destinations.length} Destinations`"
                    maxLength="20"
                  >
                </div>
              </div>
            </template>
          </FilterMenu>
          <FilterMenu
            :items="payments"
            :itemsChecked="paymentChecked.length"
            :filterType="$t('manager.backers.payment')"
            :isChecked="(item) => isChecked(item, 'payment')"
            :itemsClass="{'filter-payment': true, 'payment-checked': paymentChecked.length}"
            @check="handleCheck($event, 'payment')"
          />
          <FilterMenu
            :items="statuses"
            :itemsChecked="statusChecked.length"
            :filterType="$t('manager.backers.status')"
            :isChecked="(item) => isChecked(item, 'status')"
            :itemsClass="{'filter-status': true, 'status-checked': statusChecked.length}"
            @check="handleCheck($event, 'status')"
          />
        </div>
      </div>
    </div>
    <div class="segments-wrap">
      <div class="search-filters-tablet">
        <div class="filter-wrap">
          <div
            class="filter-button"
            :class="filtersChecked > 0 ? 'filter-checked' : ''"
            @click="handleMobileFiltersClick"
          >
            {{ `${$t('manager.backers.filters')} ${filtersChecked > 0 ? `(${filtersChecked})` : ''}` }}
          </div>
          <div
            v-if="mobileFiltersOpen"
            class="menu-dropdown"
            :class="{'filter-mobile': true, 'mobile-checked': filtersChecked > 0}"
          >
            <div class="reward">
              <div class="filter-item">
                <div
                  class="mobile-item"
                  @click="handleMenuOpen('rewards')"
                >
                  <div>
                    {{ $t('manager.backers.rewards') }}
                  </div>
                  <div
                    class="backer-chevron"
                    :class="menus.rewardsMenuOpen ? '' : 'ascending'"
                  />
                </div>
              </div>
              <div v-if="menus.rewardsMenuOpen">
                <div
                  v-for="(reward, index) in rewards"
                  :key="index"
                  class="reward"
                >
                  <div class="filter-item" @click="handleCheck(reward, 'reward')">
                    <div>
                      <Checkbox
                        :item="{ checked: isChecked(reward, 'reward') }"
                        :onCheck="() => handleCheck(reward, 'reward')"
                      />
                    </div>
                    <div class="item" :class="'reward-item'">
                      <div>
                        {{ reward.title }}
                      </div>
                      <div class="chevron-wrap" @click="(e) => toggleRewardTypesMenu(index, e)">
                        <div
                          v-if="reward.types.length"
                          class="backer-chevron"
                          :class="rewardTypesOpen(index) ? '' : 'ascending'"
                        />
                      </div>
                    </div>
                  </div>
                  <div v-if="reward.types.length && rewardTypesOpen(index)">
                    <div
                      v-for="(rewardType, idx) in reward.types"
                      :key="idx"
                      class="filter-item"
                      :class="'item-type'"
                    >
                      <div>
                        <Checkbox
                          :item="{ checked: false }"
                          :onCheck="() => {}"
                        />
                      </div>
                      <div class="item" :class="'reward-item'">
                        <div>
                          {{ rewardType.title }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="filter-item">
                <div
                  class="mobile-item"
                  @click="handleMenuOpen('destination')"
                >
                  <div>
                    {{ $t('manager.backers.destination') }}
                  </div>
                  <div
                    class="backer-chevron"
                    :class="!menus.destinationMenuOpen ? 'ascending' : ''"
                  />
                </div>
              </div>
              <FilterMenu
                :items="destinationData"
                :itemsChecked="destinationChecked.length"
                :filterType="$t('manager.backers.destination')"
                :isChecked="(item) => isChecked(item, 'destination')"
                :wrapperClass="'destinations'"
                :mobile="true"
                @check="handleCheck($event, 'destination')"
              />
            </div>
            <div>
              <div class="filter-item">
                <div
                  class="mobile-item"
                  @click="handleMenuOpen('payment')"
                >
                  <div>
                    {{ $t('manager.backers.payment') }}
                  </div>
                  <div
                    class="backer-chevron"
                    :class="!menus.paymentMenuOpen ? 'ascending' : ''"
                  />
                </div>
              </div>
              <FilterMenu
                :items="payments"
                :itemsChecked="paymentChecked.length"
                :filterType="$t('manager.backers.payment')"
                :isChecked="(item) => isChecked(item, 'payment')"
                :mobile="true"
                @check="handleCheck($event, 'payment')"
              />
            </div>
            <div>
              <div class="filter-item">
                <div
                  class="mobile-item"
                  @click="handleMenuOpen('statusFilter')"
                >
                  <div>
                    {{ $t('manager.backers.status') }}
                  </div>
                  <div
                    class="backer-chevron"
                    :class="!menus.statusFilterMenuOpen ? 'ascending' : ''"
                  />
                </div>
              </div>
              <FilterMenu
                :items="statuses"
                :itemsChecked="statusChecked.length"
                :filterType="$t('manager.backers.status')"
                :isChecked="(item) => isChecked(item, 'status')"
                :mobile="true"
                @check="handleCheck($event, 'status')"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!filtersChecked"
        class="table-segments"
      >
        <div @click="handleMenuOpen('segment')">
          {{ $t('manager.backers.segments') }}
        </div>
        <div class="chevron" @click="handleMenuOpen('segment')">
          <div class="backer-chevron" />
        </div>
        <div
          v-if="menus.segmentMenuOpen"
          class="menu-dropdown"
          :class="'segment'"
        >
          <div v-if="segments.length" class="segments">
            <div
              v-for="(item, index) in segments"
              :key="index"
              class="segment-item"
            >
              <div @click="handleSegmentClick(item)">
                {{ item.name }}
              </div>
              <div @click="handleSegmentDelete(item)">
                <img class="delete" :src="require('@/static/img/icons/ic_close.png')">
              </div>
            </div>
            <div class="segments-info">
              {{ $t('manager.backers.apply') }}
            </div>
          </div>
          <div v-if="!segments.length" class="segments">
            <div class="empty-top">
              {{ $t('manager.backers.no_saved') }}
            </div>
            <div class="segments-info">
              {{ $t('manager.backers.to_save') }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="filtersChecked"
        class="table-segments-clicked"
      >
        <div
          v-if="segmentNotSaved"
          class="save"
          @click="handleMenuOpen('save')"
        >
          {{ $t('manager.backers.save_segment') }}
        </div>
        <div
          v-if="!segmentNotSaved"
          class="saved"
        >
          {{ $t('manager.backers.segment_saved') }}
        </div>
        <div class="clear" @click="clearFilters">
          {{ $t('manager.backers.clear_filters') }}
        </div>
        <div
          v-if="menus.saveMenuOpen"
          class="menu-dropdown"
          :class="'segment'"
        >
          <div class="segments">
            <div class="segment-input-wrap">
              <input
                v-model="segmentTitle"
                class="segment-input"
                :placeholder="$t('manager.backers.segment_title')"
                maxLength="20"
              >
              <div
                class="save-segment"
                @click="handleSaveSegment"
              >
                {{ $t('manager.backers.save') }}
              </div>
            </div>
            <div class="segments-info">
              {{ $t('manager.backers.quickly') }}
            </div>
            <div class="cancel" @click="menus.saveMenuOpen = false">
              {{ $t('manager.backers.cancel') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mobile-options">
    <TitledSelect
      id="column"
      v-model="selectedColumn"
      type="select"
      :options="columnTitles"
      :title="'Right Column'"
    />
  </div>
  <div
    v-if="selectedBackers.length"
    class="selected-options"
  >
    <div class="info">
      <div class="check">
        <div class="p-checkbox-wrap">
          <label class="p-checkbox">
            <input
              type="checkbox"
              checked="true"
              disabled="true"
            >
            <span class="checkmark" :class="'partial'" />
          </label>
        </div>
      </div>
      <!-- TODO: only count selected items that are currently displayed (filtered) ? -->
      <div class="selected">
        {{ `${selectedBackers.length} backer${selectedBackers.length > 1 ? 's' : ''} selected` }}
      </div>
    </div>
    <div class="option-buttons">
      <div class="option">
        <div class="button" @click="handleMenuOpen('status')">
          {{ $t('manager.backers.change_status') }}
        </div>
        <div v-if="menus.statusMenuOpen" class="menu-wrap">
          <div
            v-for="(item, index) in statuses"
            :key="index"
            class="menu-item"
            @click="handleStatusSelect(item)"
          >
            {{ item.title }}
          </div>
        </div>
        <div v-if="statusConfirmOpen" class="status-confirm">
          <div class="confirm-text">
            {{ `Are you sure you'd like to change the order status of ${selectedBackers.length} items to "${selectedStatus.title}"?` }}
          </div>
          <div class="confirm-buttons">
            <div @click="statusConfirmOpen = false; selectedStatus = null">
              {{ $t('manager.backers.cancel') }}
            </div>
            <div @click="submitStatus">
              {{ $t('manager.backers.confirm') }}
            </div>
          </div>
        </div>
      </div>
      <div class="option">
        <div class="button" @click="handleExport">
          {{ $t('manager.backers.export') }}
        </div>
      </div>
      <div class="option">
        <div class="button" @click="handleContact">
          {{ $t('manager.backers.contact') }}
        </div>
      </div>
    </div>
  </div>
  <div class="table-large">
    <div class="shadow-left" />
    <InsightsList
      :selectable="true"
      :items="formattedPledgeData"
      :listHeaders="backerHeaders"
      tableClass="backer-table"
      @selected="handleSelected"
    />
  </div>
</div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

import moment from 'moment';
import FilterMenu from '@/components/manager/FilterMenu.vue';
import InsightsList from '@/components/manager/InsightsList.vue';
import Checkbox from '@/components/widget/Checkbox.vue';
import { getProjectPledges } from '@/utils/api';
import TitledSelect from '@/components/widget/TitledSelect.vue';
import Search from '@/components/svg/Search.vue';

// TODO: move to utils
const centsToDollars = (cents) => {
  const dollars = cents / 100;
  return parseFloat(dollars).toFixed(0);
};

export default {
  name: 'backers',
  components: {
    InsightsList,
    Checkbox,
    TitledSelect,
    FilterMenu,
    Search,
  },
  mixins: [clickaway],
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      backerSearchText: '',
      destSearchText: '',
      pledges: [],
      backerHeaders: [
        { title: 'Name', type: 'user_name' },
        { title: 'Pledge Date', type: 'created' },
        { title: 'Pledge Amount', type: 'sub_total_usd' },
        { title: 'Payment', type: 'payment_status' },
        { title: 'Order Status', type: 'shipping_status' },
        { title: 'Contact', type: 'contact' },
      ],
      statuses: [
        {
          title: 'Not shipped',
          status: 'not_shipped',
        },
        {
          title: 'Ready to ship',
          status: 'ready_to_ship',
        },
        {
          title: 'Shipped',
          status: 'shipped',
        },
        {
          title: 'Returned',
          status: 'returned',
        },
        {
          title: 'Cancelled',
        },
      ],
      payments: [
        { title: 'Pending' },
        { title: 'Processing' },
        { title: 'Collected' },
        { title: 'Failed' },
        { title: 'Cancelled' },
      ],
      destinations: [
        { title: 'China' },
        { title: 'Macao' },
        { title: 'Uruguay' },
        { title: 'Panama' },
        { title: 'South Korea' },
        { title: 'Switzerland' },
        { title: 'Australia' },
      ],
      rewards: [
        {
          title: '1l Water Bottle',
          types: [
            { title: 'Red' },
            { title: 'Blue' },
            { title: 'Green' },
          ],
        },
        {
          title: '500ml Water Bottle',
          types: [
            { title: 'Red' },
            { title: 'Blue' },
            { title: 'Green' },
          ],
        },
      ],
      // [TODO] encapsulate in FilterMenu.vue
      menus: {
        statusMenuOpen: false,
        rewardsMenuOpen: false,
        // destinationMenuOpen: false,
        // paymentMenuOpen: false,
        // statusFilterMenuOpen: false,
        // segmentMenuOpen: false,
        saveMenuOpen: false,
      },
      statusConfirmOpen: false,
      selectedStatus: null,
      selectedBackers: [],
      statusChecked: [],
      destinationChecked: [],
      paymentChecked: [],
      rewardChecked: [],
      openRewardTypesIndexes: [],
      segments: [
        { name: 'US 1L Orders' },
        { name: 'US 500ml Orders' },
      ],
      segmentTitle: '',
      segmentNotSaved: true,
      paymentMapping: {
        CHECKED_OUT: 'Pending',
        PENDING: 'Pending',
        PROCESSING: 'Processing',
        COMPLETED: 'Collected',
        FAILED: 'Failed',
        CANCELLED: 'Cancelled',
      },
      selectedColumn: 'Pledge Amount',
      mobileFiltersOpen: false,
      timers: null,
    };
  },
  computed: {
    destinationData() {
      const search = this.destSearchText.toLowerCase();
      return this.destinations.filter(dest => dest.title.toLowerCase().includes(search));
    },
    formattedPledgeData() {
      const selected = this.selectedBackers.map(pledges => pledges.id);
      const pledgeData = JSON.parse(JSON.stringify(this.pledges));
      return pledgeData.filter(pledges => pledges.user_name.toLowerCase().includes(this.backerSearchText.toLowerCase()))
        .map((backer) => {
          if(selected.indexOf(backer.id) !== -1) {
            backer.selected = true;
          }
          const date = moment(backer.created).format('MM/DD/YY');
          backer.created = date;
          const amount = `$${centsToDollars(backer.sub_total_usd)}`;
          backer.sub_total_usd = amount;
          const shipStatus = backer.shipped ? 'Shipped' : 'Not Shipped';
          backer.shipping_status = shipStatus;
          backer.payment_status = this.paymentMapping[backer.status] || 'Unknown';
          backer.contact = 'info@pledgecamp.com';
          return backer;
          // TODO: where will contact info come from?
        });
    },
    filtersChecked() {
      const {
        statusChecked,
        destinationChecked,
        paymentChecked,
        rewardChecked,
      } = this;
      return statusChecked.length + destinationChecked.length + paymentChecked.length + rewardChecked.length;
    },
    columnTitles() {
      return this.backerHeaders.filter(header => header.type !== 'user_name').map(header => header.title);
    },
    mobileHeaders() {
      const selected = this.backerHeaders.filter(header => header.title === this.selectedColumn)[0];
      return this.backerHeaders.filter(header => header.type === 'user_name' || header.type === selected.type);
    },
  },
  watch: {
    filtersChecked() {
      this.segmentNotSaved = true;
    },
  },
  methods: {
    async getPledges(query) {
      const projectId = this.$route.params.id;
      const { data: { pledges } } = await getProjectPledges(projectId, query);
      this.pledges = pledges;
    },
    handleSelected(items) {
      const selected = items.filter(item => item.selected);
      this.selectedBackers = selected;
    },
    closeMenus() {
      Object.keys(this.menus).forEach((item) => {
        this.menus[item] = false;
      });
    },
    closeRewardMenu() {
      // TODO: remove it once FilterMenu is used for Rewards menu
      this.menus.rewardsMenuOpen = false;
      window.removeEventListener('keyup', this.escapeListener);
    },
    handleMenuOpen(type) {
      const menu = `${type}MenuOpen`;
      const newStatus = !this.menus[menu];

      this.menus[menu] = newStatus;

      // TODO: remove this hack once rewards dropdown is using FilterMenu.vue
      if(newStatus && type === 'rewards') {
        window.addEventListener('keyup', this.escapeListener);
      }

      if(type === 'save') {
        this.mobileFiltersOpen = false;
      }
      this.statusConfirmOpen = false;
    },
    // TODO: remove this hack once rewards dropdown is using FilterMenu.vue
    escapeListener(event) {
      if(event.keyCode === 27) {
        this.closeMenus();
      }
    },
    handleStatusSelect(item) {
      this.menus.statusMenuOpen = false;
      if(item.status) {
        this.selectedStatus = item;
        this.statusConfirmOpen = true;
      }
    },
    submitStatus() {
      // TODO: awaiting API for this
    },
    handleExport() {
      // TODO: awaiting API for this
    },
    handleContact() {
      // TODO: awaiting API for this
    },
    handleCheck(item, type) {
      // TODO: I can refactor this once I get a better sense of what the data will look
      const itemsType = `${type}Checked`;
      if(this[itemsType].indexOf(item.title) !== -1) {
        const idx = this[itemsType].indexOf(item.title);
        this[itemsType] = [...this[itemsType].slice(0, idx), ...this[itemsType].slice(idx + 1)];
      } else {
        this[itemsType].push(item.title);
      }
      const query = this.buildFilterQuery();

      if(!this.timer) {
        this.getPledges(query);
        this.timer = window.setTimeout(async () => {
          window.clearTimeout(this.timer);
          this.timer = null;
        }, 500);
      }
    },
    isChecked(item, type) {
      const itemsType = `${type}Checked`;
      return this[itemsType].indexOf(item.title) !== -1;
    },
    rewardTypesOpen(index) {
      // TODO: this will need to be refactored (probably moved to a separate component),
      // but since it's unclear what the data will look like, it will do for now
      return this.openRewardTypesIndexes.indexOf(index) !== -1;
    },

    toggleRewardTypesMenu(index, e) {
      e.stopPropagation();
      if(this.openRewardTypesIndexes.indexOf(index) === -1) {
        this.openRewardTypesIndexes.push(index);
      } else {
        const idx = this.openRewardTypesIndexes.indexOf(index);
        this.openRewardTypesIndexes = [
          ...this.openRewardTypesIndexes.slice(0, idx),
          ...this.openRewardTypesIndexes.slice(idx + 1),
        ];
      }
    },
    clearFilters() {
      this.statusChecked = [];
      this.destinationChecked = [];
      this.paymentChecked = [];
      this.rewardChecked = [];
      this.closeMenus();
    },
    handleSegmentClick(item) {
      // TODO: awaiting API for this
      console.log('handleSegmentClick called ', item);
    },
    handleSegmentDelete(item) {
      // TODO: awaiting API for this
      console.log('handleSegmentDelete called ', item);
    },
    handleSaveSegment() {
      this.saveSegmentOpen = false;
      // 1. Grab all filters
      // 2. Send to POST endpoint
      // 3. Change text to 'Segment Saved'
      setTimeout(() => {
        this.segmentNotSaved = false;
        this.segmentTitle = '';
      }, 2000);
    },
    buildFilterQuery() {
      let statusQuery = '';
      let destinationQuery = '';
      let paymentQuery = '';
      let rewardQuery = '';
      if(this.statusChecked.length) {
        statusQuery = `&order_status=[${this.statusChecked.join(',')}]`;
      }
      if(this.destinationChecked.length) {
        destinationQuery = `&destinations=[${this.destinationChecked.join(',')}]`;
      }
      if(this.paymentChecked.length) {
        paymentQuery = `&payment_status=[${this.paymentChecked.join(',')}]`;
      }
      if(this.rewardChecked.length) {
        rewardQuery = `&variant_ids=[${this.rewardChecked.join(',')}]`;
      }
      const query = `?date_order=desc${statusQuery}${destinationQuery}${paymentQuery}${rewardQuery}`;
      return query.toLowerCase().replace(/ /gi, '_');
    },
    handleMobileFiltersClick() {
      this.mobileFiltersOpen = !this.mobileFiltersOpen;
    },
  },
  mounted() {
    this.getPledges();
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.backer-table {
  position: relative;
  border-top: 1px solid $border-light;

  > table {
    th, td {
      &:nth-child(1) {
        width: 50px;
        min-width: 50px;
        max-width: 50px;
        padding-left: 14px;
        vertical-align: unset;
        .p-checkbox {
          padding-top: 10px;
          padding-bottom: 6px;
        }
      }
      &:nth-child(2) {
        padding-left: 0;
        padding-right: 0;
        min-width: 180px;
        border-right: 1px solid $border-light;
        @media (max-width: $mobile-width) {
          width: 50%;
          min-width: unset;
          max-width: unset;
          border-right: none;
        }
      }
      &:nth-child(3) {
        @media (max-width: $mobile-width) {
          width: 50%;
          min-width: unset;
          max-width: unset;
          padding-right: 0;
        }
      }
      &:nth-child(4) {
        text-align: right;
        padding-right: 5%;
        padding-left: 0;
      }
      &:nth-child(7) {
        width: 80px;
        min-width: 80px;
        max-width: 80px;
        text-align: right;
      }

      @media (max-width: $tablet-width-large) and (min-width: $mobile-width) {
        &:nth-child(1) {
          position: -webkit-sticky;
          position: sticky;
          left: 0;
          z-index: 3;
        }
        &:nth-child(2) {
          position: -webkit-sticky;
          position: sticky;
          left: 50px;
          z-index: 2;
        }
        &:nth-child(4) {
          padding-right: 4%;
        }
        &:nth-child(n+3) {
          width: 150px;
          min-width: 150px;
          max-width: 150px;
        }
      }
    }
    th:nth-child(3) {
      @media (max-width: $mobile-width) {
        text-align: right;
        .mobile-expand {
          display: inline-block;
        }
        > div {
          float: right;
          padding-right: 25px;
          &:nth-child(2) {
            display: none;
          }
        }
      }
    }
    td:nth-child(6) {
      display: flex;
      flex-direction: row;
      padding-top: 11px;
    }
    th:nth-child(7) > div {
      margin-left: -20px;
    }
  }

  @media (max-width: $tablet-width-large) and (min-width: $mobile-width) {
    position: relative;
    width: 100%;
    z-index: 1;
    margin: auto;
    overflow: auto;
  }
}

.menu-dropdown {
  position: absolute;
  top: 52px;
  background-color: $white;
  border: 1px solid $border-light;
  z-index: 100;

  // TODO: can't think of a better way to center these
  &.filter-rewards {
    margin-left: -61%;
  }
  &.filter-destination {
    margin-left: -43%;
  }
  &.filter-payment {
    margin-left: -60%;
  }
  &.filter-status {
    margin-left: -37%;
  }
  &.rewards-checked {
    margin-left: -40%;
  }
  &.destination-checked {
    margin-left: -28%;
  }
  &.payment-checked {
    margin-left: -40%;
  }
  &.status-checked {
    margin-left: -25%;
  }
  &.filter-mobile {
    margin-left: -80%;
  }
  &.mobile-checked {
    margin-left: 0;
    @media (min-width: $tablet-width) {
      margin-left: -57%;
    }
  }
  &.segment {
    top: 30px;
    margin-left: -27%;
    width: 240px;
    font-size: 14px;
    .segments {
      text-align: center;
      cursor: default;
      .segments-info {
        padding: 15px;
        opacity: 0.5;
      }
      .cancel {
        cursor: pointer;
        color: $col-error;
        padding-bottom: 15px;
      }
      .segment-input-wrap {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px 5px;
        border-bottom: 1px solid $border-light;

        .save-segment {
          cursor: pointer;
          color: $main-blue;
        }
        .segment-input {
          @include h5;
          border: none;
          outline: none;
          resize: none;
          overflow: auto;
          &::placeholder {
            color: $grey-medium;
            opacity: 1;
          }
        }
      }
      .empty-top {
        padding-top: 20px;
      }
      .segment-item {
        text-align: left;
        color: $main-blue;
        padding: 15px 15px 12px;
        border-bottom: 1px solid $border-light;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        > div {
          cursor: pointer;
          &:not(:first-child) {
            padding-top: 2px;
            opacity: 0.5;
          }
        }
        .delete {
          height: 12px;
        }
      }
    }

    @media (max-width: $tablet-width-large) {
      top: 45px;
    }
  }

  .filter-item {
    @include button_small_text;
    font-weight: 600;
    padding: 15px;
    width: 225px;
    cursor: pointer;
    &:not(:last-child) {
      border-bottom: 1px solid $border-light;
    }
    &.item-type {
      background-color: $grey-lighter;
      padding: 0 0 0 24px;
      border-bottom: 1px solid $border-light;
    }
    &.rewards {
      padding-right: 0;
      padding-bottom: 0;
    }

    .item {
      padding-left: 24px;
      padding-top: 4px;

      &.reward-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-bottom: 8px;
        .chevron-wrap {
          cursor: pointer;
          width: 35px;
          height: 40px;
          padding-left: 8px;
          padding-top: 15px;
          margin-top: -15px;
        }
      }
    }
    .mobile-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: none;
    }
  }

  .reward {
    &:not(:last-child) {
      border-bottom: 1px solid $border-light;
    }
  }

  .destinations {
    overflow: scroll;
    height: 250px;
  }
}

.reward .filter-item.item-type {
  padding-top: 8px;
  padding-bottom: 4px;
}

.backer-table-wrap {
  .table-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 10px;

    .header-left {
      display: flex;
      flex-direction: row;
    }

    .search-filters {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .filters {
        display: flex;
        flex-direction: row;
      }
      @media (max-width: $tablet-width-large) {
        display: none;
      }
    }

    .search-filters-tablet {
      float: left;
      @media (min-width: $tablet-width-large) {
        display: none;
      }
    }

    .segments-wrap {
      .table-segments, .table-segments-clicked {
        @include button_large_text;
        position: relative;
        display: flex;
        flex-direction: row;
        font-weight: 600;

        @media (max-width: $tablet-width-large) {
          padding-top: 12px;
        }
      }
      .table-segments {
        cursor: pointer;
        .chevron {
          padding-top: 5px;
        }
      }
      .table-segments-clicked {
        .save, .clear, .saved {
          cursor: pointer;
          font-weight: 700;
        }
        .save, .saved {
          color: $main-blue;
        }
        .clear {
          color: $col-error;
          margin-left: 20px;
          @media (max-width: $mobile-width) {
            margin-left: 10px;
          }
        }
        .saved {
          cursor: default;
          opacity: 0.5;
        }
      }
    }
  }

  .mobile-options {
    @media (min-width: $mobile-width) {
      display: none;
    }
  }

  .table-large {
    min-height: 320px;
    position: relative;
    table {
      width: 100%;
    }
    @media (max-width: $tablet-width-large) {
      .shadow-left {
        z-index: 3;
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 50px;
        background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.05) 0%, rgba(87, 42, 42, 0) 100%);
        content: ".";
        color: transparent;
        left: 230px;
      }
    }
    @media (max-width: $mobile-width) {
      .shadow-left {
        display: none;
      }
    }
  }

  .selected-options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    border-top: 1px solid $border-light;
    border-bottom: 1px solid $border-light;
    padding: 10px 0 5px;

    .info {
      display: flex;
      flex-direction: row;
      padding-top: 8px;
      margin: 0 5px 10px 0;
      .check {
        padding: 0 14px;
        margin-right: 2px;
      }
      .selected {
        @include button_large_text;
        font-weight: 600;
      }
    }
    .option-buttons {
      .option {
        position: relative;
        display: inline-block;
        &:not(:last-child) {
          margin-right: 14px;
        }
        .button {
          @include blue-button($type: secondary);
          padding: 3px 10px 0;
        }
        .menu-wrap {
          position: absolute;
          top: 45px;
          left: 16px;
          background-color: $white;
          border: 1px solid $border-light;

          .menu-item {
            @include button_small_text;
            cursor: pointer;
            color: $main-blue;
            font-weight: 600;
            padding: 15px;
            width: 150px;
            &:not(:last-child) {
              border-bottom: 1px solid $border-light;
            }
            &:last-child {
              color: $main-orange;
            }
          }
        }
        .status-confirm {
          position: absolute;
          width: 240px;
          margin-left: -29px;
          top: 45px;
          background-color: $white;
          border: 1px solid $border-light;
          @include button_small_text;
          font-weight: 600;
          .confirm-text {
            line-height: 24px;
            padding: 10px 15px;
            border-bottom: 1px solid $border-light;
          }
          .confirm-buttons {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            > div {
              text-align: center;
              padding: 18px 0;
              width: 100%;
              cursor: pointer;
              color: $main-blue;
              &:first-child {
                border-right: 1px solid $border-light;
                color: $main-orange;
              }
            }
          }
        }
      }
    }
  }
}

.filter-wrap {
  position: relative;
  .filter-button {
    border: 1px solid $border-light;
    @include tab_item;
    line-height: 48px;
    height: 48px;
    padding: 0 15px;
    margin-right: 15px;

    &.filter-checked {
      background-color: $main-blue;
      color: $white;
    }
    &.menu-open {
      color: $main-black;
    }
  }
}

.backer-chevron {
  width: 6px;
  height: 6px;
  margin: 0 0 1px 8px;
  border: solid black;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  cursor: pointer;
  &.ascending {
    margin-top: 5px;
    transform: rotate(-135deg);
  }
}

.table-search {
  min-width: 184px;
  margin-right: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;

  &.destination-search {
    margin-right: 0;
    min-width: unset;
    border-bottom: 1px solid $border-light;
    padding: 4px 0;
  }
  .search-wrap {
    padding-top: 4px;
    .search-input {
      @include subtitle;
      border: none;
      outline: none;
      resize: none;
      overflow: auto;
      margin-left: 8px;
    }
    @media (max-width: $mobile-width) {
      > input {
        &::placeholder {
          color: transparent;
        }
      }
    }
  }

  @media (max-width: $mobile-width) {
    min-width: unset;
    margin-right: unset;
    max-width: 100px;
  }
}

</style>
