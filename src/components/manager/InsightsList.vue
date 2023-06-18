<template>
<div class="insights-list">
  <div
    v-if="items"
    class="list-wrap"
    :class="tableClass"
  >
    <table>
      <tr>
        <th v-if="selectable" class="header-check">
          <div>
            <Checkbox
              :item="{ checked: anySelected }"
              :onCheck="handleCheckAll"
            />
          </div>
        </th>
        <th
          v-for="header in listHeaders"
          :key="header.title"
          @click="sortData(header.type)"
        >
          <div class="th-wrap">
            <div>{{ header.title }}</div>
            <div v-if="header.category !== 'contact' && header.type === selectedCategory">
              <UpDownChevron :down="descending" />
            </div>
          </div>
        </th>
      </tr>
      <tr
        v-for="(row, idx) in listData"
        :key="idx"
      >
        <td v-if="selectable">
          <Checkbox
            :item="{ checked: row.selected }"
            :onCheck="() => handleCheck(row, idx)"
          />
        </td>
        <td
          v-for="(item, i) in getItems(row, listHeaders)"
          :key="i"
        >
          <!-- TODO: probably better ways to do this -->
          <div v-if="isEmail(item)" class="mail-wrap">
            <a :href="`mailto:${item}`" target="_blank">
              <img
                :src="require('@/static/img/icons/ic_mail.png')"
                class="mail-icon"
              >
            </a>
          </div>
          <div
            v-else
            :class="{failed: item === 'Failed', 'not-shipped': item === 'Not Shipped'}"
          >
            {{ item }}
          </div>
          <div
            v-if="isShipping(item)"
            class="ship-chevron"
            :class="{'not-shipped': item === 'Not Shipped'}"
          >
            <div class="chevron" />
          </div>
          <div
            class="mobile-expand"
            @click="$emit('mobileExpand')"
          >
            <img :src="require('@/static/img/icons/ic_right.png')">
          </div>
        </td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import orderBy from 'lodash.orderby';
import Checkbox from '@/components/widget/Checkbox.vue';
import UpDownChevron from '@/components/widget/UpDownChevron.vue';

export default {
  name: 'insights_list',
  components: {
    Checkbox,
    UpDownChevron,
  },
  props: {
    listHeaders: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    tableClass: {
      type: String,
      default: null,
    },
    selectable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selectedCategory: null,
      descending: true,
    };
  },
  computed: {
    listData() {
      if(!this.selectedCategory) return this.items;
      const order = this.descending ? 'desc' : 'asc';
      return orderBy(this.items, [this.selectedCategory], [order]);
    },
    anySelected() {
      return this.listData.some(item => item.selected);
    },
  },
  methods: {
    getItems(row, headers) {
      return headers.slice().map(header => row[header.type]);
    },
    sortData(category) {
      if(category !== 'contact') {
        if(category === this.selectedCategory) {
          this.descending = !this.descending;
        } else {
          this.selectedCategory = category;
          this.descending = true;
        }
      }
    },
    isEmail(item) {
      return (typeof item === 'string') && item.includes('@');
    },
    isShipping(item) {
      // TODO: backend data will be object, so we can do "item.shipping" when it's implemented
      const shippingTypes = ['shipped', 'not shipped', 'returned', 'ready'];
      return (typeof item === 'string') && shippingTypes.includes(item.toLowerCase());
    },
    handleCheckAll() {
      const items = this.items.map((item) => {
        item.selected = !this.anySelected;
        return item;
      });
      this.$emit('selected', items);
    },
    handleCheck(row, idx) {
      row.selected = !row.selected;
      const items = this.items.slice();
      items[idx] = row;
      this.$emit('selected', items);
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.insights-list {
  width: 100%;
  position: relative;

  .list-wrap {
    > table {
      border-collapse: separate;
      border-spacing: 0;
      tr {
        height: 45px;
        &:nth-child(even) {
          background-color: $grey-light;
        }
        .header-check {
          padding-top: 12px;
          padding-left: 14px;
        }
      }
      th, td {
        padding: 0 8px;
        @include h5;
        min-width: 120px;
      }
      th {
        .th-wrap {
          color: rgba(0, 0, 0, 0.5);
          cursor: pointer;
          padding-top: 4px;
          > div {
            float: left;
            &:nth-child(2) {
              margin-left: 8px;
            }
          }
        }
      }
      td {
        .mobile-expand {
          display: none;
          height: 25px;
          width: 25px;
          padding-right: 10px;
          > img {
            width: 7px;
            opacity: 0.5;
          }
        }
      }
    }

    @media (max-width: $tablet-width-large) {
      overflow-x: scroll;
    }
  }
}
.mail-wrap {
  padding-top: 8px;
  .mail-icon {
    height: 15px;
  }
}
.failed {
  color: $col-error;
}
.not-shipped {
  opacity: 0.5;
}
.ship-chevron {
  cursor: pointer;
  padding-top: 6px;
  .chevron {
    width: 6px;
    height: 6px;
    margin: 0 0 1px 8px;
    border: solid black;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
}
</style>
