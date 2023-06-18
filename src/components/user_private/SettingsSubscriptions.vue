<template>
<div class="settings-subscriptions">
  <Section :info="$t('settings.subscriptions')">
    <div class="select-all">
      <Checkbox
        :item="{ label: 'Select All', checked: isCheckedAll }"
        :onCheck="checkAll"
      />
    </div>
    <div
      v-for="(section) in sections"
      :key="section.title"
      class="settings-section"
    >
      <h4 class="subheading">
        {{ section.title }}
      </h4>
      <Checkbox
        v-for="(item) in section.items"
        :key="item.key"
        :item="item"
        :onCheck="check"
      />
    </div>
  </Section>
</div>
</template>

<script>
// TODO -- Add to into en.json once the creator forum is implemented
// {
//   "title": "Creator Forum",
//   "items": {
//     "REPLY_OR_REWARD": "Reply or reward given for your answer",
//     "NEW_ANSWERS": "New answers to your questions"
//   }
// }

import Vue from 'vue';

import AutoSave from '@/components/mixins/AutoSave';
import Section from '@/components/widget/Section.vue';
import Checkbox from '@/components/widget/Checkbox.vue';

import { USER_UPDATE } from '@/store/actions';

export default {
  name: 'settings-subscriptions',
  components: {
    Section,
    Checkbox,
  },
  mixins: [AutoSave],
  data() {
    return {
      sections: {},
      settings: [],
      isCheckedAll: false,
    };
  },
  computed: {
    settingsFromProfile() {
      return this.$store.getters.getProfile.email_subscriptions || [];
    },
    allSettings() {
      return this.sections.map(s => Object.keys(s.items)).flat(Infinity);
    },
    enabledSettings() {
      return this.sections
        .map(s => s.items.filter(item => item.checked))
        .flat(Infinity)
        .map(i => i.key);
    },
  },
  watch: {
    settingsFromProfile(profile) {
      this.updateSections(profile);
    },
  },
  methods: {
    updateSections(newProfile) {
      let checkedCount = 0;
      this.sections = this.$t('settings.subscriptions.sections').map(
        ({ title, items }) => {
          const keys = Object.keys(items);
          return {
            title,
            items: keys.map((key) => {
              checkedCount += 1;
              return {
                key,
                label: items[key],
                checked: newProfile.includes(key),
              };
            }),
          };
        },
      );
      this.isCheckedAll = (checkedCount === newProfile.length);
    },
    checkAll() {
      this.isCheckedAll = !this.isCheckedAll;
      this.sections.forEach(({ items }) => {
        items.forEach((item) => {
          Vue.set(item, 'checked', this.isCheckedAll);
        });
      });
      this.startSaveTimer();
    },
    check(item) {
      this.isCheckedAll = false;
      Vue.set(item, 'checked', !item.checked);
      this.startSaveTimer();
    },
    async executeSave() {
      try {
        await this.$store.dispatch(USER_UPDATE, {
          email_subscriptions: this.enabledSettings,
        });
        this.updateSaveStatus(true);
      } catch(error) {
        console.error(error);
      }
      this.removeSaveTimer();
    },
  },
  mounted() {
    this.updateSections(this.settingsFromProfile);
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

.settings-subscriptions {
  .section-wrap .section-right {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    min-width: unset;
    margin-left: 0;
  }

  .select-all {
    .checkbox-text { margin-right: 16px; }
    align-self: flex-end;
  }

  .p-checkbox {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    padding-left: 0;
    margin: 6px 0;

    .checkmark {
      position: unset;
      margin-top: 1px;

      &::after {
        position: unset;
        margin: 2px 0 0 4px;
      }
    }
  }

  .settings-section {
    margin-bottom: 32px;

    .subheading {
      color: $black-light;
      text-transform: uppercase;
      margin: 8px 0;
    }

    .p-checkbox {
      width: 100%;
    }
  }
  @media (max-width: $tablet-width) {
    .section-wrap {
      flex-direction: column;
      .section-right {
        margin-top: 48px;
      }
    }
  }
}
</style>
