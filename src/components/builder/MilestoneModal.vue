<template>
<transition name="fade">
  <div class="reward-modal-wrap">
    <div class="container">
      <ModalHeader quitText="Close" @hideModal="$emit('hideModal')" />
      <div class="reward-modal-content">
        <div class="reward-modal-title">
          <h2 v-if="selectedMilestone">
            {{ $t('dashboard.timeline.milestones.titles.edit_milestone') }}
          </h2>
          <h2 v-else>
            {{ $t('dashboard.timeline.milestones.titles.new_milestone') }}
          </h2>
        </div>
        <div class="reward-modal-body">
          <TitledInput
            v-model="milestone.name"
            :title="$t('dashboard.timeline.milestones.labels.title')"
            :suffix="milestone.name ? `${milestone.name.length}/80` : '80'"
            :maxLength="80"
            class="reward-input-title"
          />
          <div class="milestone-date">
            <v-datepicker
              :value="endDate"
              class="modal-date"
              :placeholder="$t('dashboard.timeline.milestones.labels.end_date')"
              format="M/d/yyyy"
              :input-class="'cal-input'"
              :disabled-dates="disabledDate"
              @input="handleDateSelect"
              @focusin.native="dateActive = true"
              @focusout.native="dateActive = false"
            />
            <div
              v-if="dateActive || milestone.date"
              class="date-label"
            >
              {{ $t('dashboard.timeline.milestones.labels.end_date') }}
            </div>
          </div>

          <TitledInput
            v-model="milestone.description"
            :title="$t('dashboard.rewards.modal.labels.description')"
            :suffix="milestone.description ? `${milestone.description.length}/400` : '400'"
            :maxLength="400"
            :rows="5"
            class="reward-input-description"
          />
          <div class="hr" />
          <div class="milestone-fees">
            <div class="fees-info">
              <div class="fees-item">
                <h3>{{ $t('dashboard.timeline.milestones.titles.fees') }}</h3>
                <div>
                  {{ $t('dashboard.timeline.milestones.instructions') }}
                </div>
              </div>
              <div class="fees-item">
                <table>
                  <tr>
                    <td class="funds-label">
                      {{ $t('dashboard.timeline.milestones.labels.starting_funds') }}
                    </td>
                    <td class="funds-item">
                      {{ $t('dashboard.timeline.milestones.labels.funds_max') }}
                    </td>
                    <td class="funds-item">
                      {{ raised }}
                    </td>
                  </tr>
                  <tr>
                    <td class="funds-label">
                      {{ $t('dashboard.timeline.milestones.labels.milestone_funds') }}
                    </td>
                    <td class="funds-item">
                      <!-- eslint-disable vue-i18n/no-raw-text -->
                      {{ milestone.release_percent }}%
                      <!-- eslint-enable vue-i18n/no-raw-text -->
                    </td>
                    <td class="funds-item">
                      {{ fundingAmount }}
                    </td>
                  </tr>
                </table>
                <div class="total-fee">
                  <div>
                    {{ $t('dashboard.timeline.milestones.labels.total_fee') }}
                  </div>
                  <div>
                    <!-- TODO: total project fee is hard coded at 5%, should get from API -->
                    {{ $t('dashboard.timeline.milestones.labels.project_fee') }}
                  </div>
                </div>
              </div>
            </div>
            <div class="fees-inputs">
              <TitledInput
                class="fees-input"
                :value="displayPercent"
                :suffix="$tc('dashboard.timeline.milestones.total', raised)"
                :type="'percent'"
                :min="'0'"
                :max="'100'"
                @input="handlePercent"
              />
              <TitledInput
                class="fees-input"
                :value="fundingAmount"
                :maxLength="80"
                :isDisabled="true"
              />
            </div>
            <Slider
              :slideValue="slideValue"
              @input="handleSlideInput"
            />
          </div>
          <div>
            <button
              v-if="selectedMilestone"
              class="btn-reward"
              :disabled="!isValid"
              @click="onUpdateMilestone"
            >
              {{ $t('dashboard.timeline.milestones.buttons.update_milestone') }}
            </button>
            <button
              v-else
              class="btn-reward"
              :disabled="!isValid"
              @click="onAddMilestone"
            >
              {{ $t('dashboard.timeline.milestones.buttons.add_milestone') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import * as moment from 'moment';

import ModalHeader from '@/components/widget/ModalHeader.vue';
import TitledInput from '@/components/widget/TitledInput.vue';
import Slider from '@/components/widget/Slider.vue';
import {
  createMilestone,
  updateMilestone,
} from '@/utils/api';

export default {
  name: 'milestone-modal',
  components: {
    ModalHeader,
    TitledInput,
    Slider,
  },
  props: {
    selectedMilestone: {
      type: Object,
      default: () => null,
    },
    fundsRaised: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      milestone: {
        name: '',
        description: '',
        release_percent: 0,
        date: null,
      },
      dateActive: false,
    };
  },
  computed: {
    isValid() {
      return this.milestone.name && this.milestone.description;
    },
    slideValue() {
      const percentage = this.milestone.release_percent || 0;
      const num = percentage.toString().replace('%', '');
      return Number(num);
    },
    raised() {
      return this.$options.filters.from_cents(this.fundsRaised);
    },
    fundingAmount() {
      const amt = parseInt(this.milestone.release_percent) * this.fundsRaised;
      return this.$options.filters.from_cents(amt / 100);
    },
    endDate() {
      if(this.milestone.date) {
        return moment(this.milestone.date).toDate();
      }
      return null;
    },
    displayPercent() {
      if(!this.milestone.release_percent) return null;
      return `${this.milestone.release_percent}%`;
    },
    disabledDate() {
      // presumably user can't pick a milestone end date that's already passed
      return {
        to: moment().toDate(),
      };
    },
  },
  methods: {
    async onAddMilestone() {
      const milestoneData = {
        name: this.milestone.name,
        description: this.milestone.description,
        release_percent: this.milestone.release_percent,
        date: this.milestone.date.unix(),
      };
      try {
        const projectId = this.$route.params.id;
        await createMilestone({
          projectId,
          milestone: milestoneData,
        });
        this.$emit('refreshProjectData');
        this.$emit('hideModal');
      } catch(err) {
        console.log('Error in add milestone: ', err);
      }
    },
    async onUpdateMilestone() {
      try {
        const projectId = this.$route.params.id;
        await updateMilestone({
          projectId,
          milestoneId: this.selectedMilestone.id,
          milestone: {
            ...this.milestone,
            date: this.milestone.date.unix(),
          },
        });
        this.$emit('refreshProjectData');
        this.$emit('hideModal');
      } catch(err) {
        console.log('error in update milestone: ', err);
      }
    },
    handleSlideInput(val) {
      this.milestone.release_percent = val;
    },
    handleDateSelect(val) {
      this.milestone.date = moment(val);
    },
    handlePercent(val) {
      const amt = Math.min(parseInt(val), 100);
      this.milestone.release_percent = amt;
    },
  },
  mounted() {
    const { selectedMilestone } = this;
    if(selectedMilestone) {
      this.milestone = {
        name: selectedMilestone.name || '',
        description: selectedMilestone.description || '',
        date: moment.unix(selectedMilestone.date) || '',
        release_percent: selectedMilestone.release_percent || 0,
      };
    }
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.reward-modal-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: scroll;
  background-color: $white;
  z-index: 2000;
  padding: 32px 50px 72px;

  .reward-modal-content {
    max-width: 645px;
    margin: auto;
  }
  .reward-modal-title {
    text-align: center;
    margin: 40px 0;
  }
  .hr {
    margin-top: 56px;
    margin-bottom: 56px;
  }
  .btn-reward {
    @include button($main-black, large);
    width: 100%;
    margin-top: 70px;
    margin-bottom: 72px;
  }
  @media (max-width: $mobile-width) {
    padding-left: 20px;
    padding-right: 20px;
  }
}

.milestone-date {
  position: relative;
  width: 298px;

  .modal-date {
    width: 100%;
    margin: 8px 0 0;
    input {
      @include input;
      margin-top: 0;
      height: 45px;
      &::placeholder {
        color: $black-light;
        opacity: 1;
      }
    }
  }

  .cal-input {
    cursor: pointer;
    background: url('../../static/img/ic_cal.svg');
    background-repeat: no-repeat;
    background-position: 95% 40%;
    background-size: 24px 24px;
  }

  .date-label {
    @include subtitle;
    color: rgba(0, 0, 0, 0.4);
    letter-spacing: 0;
    position: absolute;
    background-color: #fff;
    margin-left: 12px;
    top: -12px;
    font-size: 12px;
    padding: 0 4px;
    pointer-events: none;
    transition: 0.2s ease all;
  }
}

.milestone-fees {
  .fees-info {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .fees-item {
      width: 50%;
      min-width: 320px;
      > table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        @include h5;
        color: $grey;
        padding-left: 15px;
        td {
          padding: 15px 0 10px;
          border-bottom: 1px solid $border-light;
          &:last-child {
            color: $main-black;
          }
        }
        .funds-item {
          text-align: right;
        }
      }
      &:first-child {
        padding-top: 15px;
      }
    }
    .total-fee {
      @include h4;
      color: $main-black;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-left: 15px;
      margin-top: 30px;
    }
  }
  .fees-inputs {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    .fees-input {
      display: inline-block;
      width: 50%;
    }
  }
}

@media (max-width: $tablet-width-large) {
  .milestone-fees {
    .fees-info {
      .fees-item {
        width: 100%;
        margin: 0 auto;
        > table {
          padding-left: unset;
          margin-top: 20px;
        }
      }
      .total-fee {
        padding-left: unset;
      }
    }
  }
}
@media (max-width: 640px) {
  .fees-inputs {
    flex-wrap: wrap;
    .fees-input {
      width: 100%;
      min-width: 100%;
      margin: 0 auto;
    }
  }
}

@media (max-width: $mobile-width) {
  .milestone-date {
    width: 100%;
  }
  .milestone-fees .fees-info .fees-item {
    min-width: unset;
  }
}

</style>
