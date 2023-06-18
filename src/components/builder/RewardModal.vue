<template>
<transition name="fade">
  <div class="reward-modal-wrap">
    <div class="container">
      <ModalHeader quitText="Cancel" @hideModal="$emit('hideModal')" />
      <div class="reward-modal-content">
        <div class="reward-modal-title">
          <div v-if="selectedReward" class="reward-modal-edit-title">
            <div />
            <h2>{{ $t('dashboard.rewards.modal.titles.edit_reward') }}</h2>
            <div @click="onDeleteReward">
              {{ $t('dashboard.rewards.modal.titles.delete_reward') }}
            </div>
          </div>
          <h2 v-else>
            {{ $t('dashboard.rewards.modal.titles.new_reward') }}
          </h2>
        </div>
        <div class="reward-modal-body">
          <TitledInput
            v-model="reward.title"
            :title="$t('dashboard.rewards.modal.labels.reward_title')"
            :suffix="reward.title ? `${reward.title.length}/40` : '40'"
            :maxLength="40"
            class="reward-input-title"
          />
          <TitledInput
            v-model="reward.description"
            :title="$t('dashboard.rewards.modal.labels.description')"
            :suffix="reward.description ? `${reward.description.length}/400` : '400'"
            :maxLength="400"
            :rows="5"
            class="reward-input-description"
          />
          <TitledInput
            v-if="!variants.length"
            :value="rewardPrice"
            :hasIcon="true"
            :showError="!rewardPriceValid"
            class="reward-input-price"
            @input="updateRewardPrice"
          />
          <TitledInput
            v-model="reward.backer_limit"
            :title="$t('dashboard.rewards.modal.labels.quantity_available')"
            :suffix="$t('dashboard.rewards.modal.labels.optional')"
            class="reward-input-quantity"
          />

          <div v-if="variants.length === 0" class="reward-image">
            <div class="reward-field-title">
              <h4>{{ $t('dashboard.rewards.modal.labels.reward_image') }}</h4>
              <span class="reward-field-tip">{{ $t('dashboard.rewards.modal.labels.optional') }}</span>
            </div>
            <ImageUpload
              id="main"
              class="reward-image-upload"
              @imageSelect="onRewardImageSelect"
            >
              <template>
                <div class="image-upload-content">
                  <div class="image-preview">
                    <img
                      v-if="image"
                      class="image-display"
                      :src="rewardImage"
                    >
                    <Upload v-else color="#2E40EA" />
                  </div>
                  <div class="image-info">
                    <h4>{{ $t('widgets.image_upload.drag_drop') }}</h4>
                    <div>{{ $t('widgets.image_upload.browse_file') }}</div>
                  </div>
                </div>
              </template>
            </ImageUpload>
            <div
              v-if="imageError"
              class="image-error"
            >
              {{ imageError }}
            </div>
          </div>

          <div class="hr" />

          <div class="reward-variations">
            <div class="reward-field-title">
              <h4>{{ $t('dashboard.rewards.modal.labels.variations') }}</h4>
              <span class="reward-field-tip">{{ $t('dashboard.rewards.modal.labels.optional') }}</span>
            </div>
            <p class="reward-field-desc">
              {{ $t('dashboard.rewards.modal.labels.variations_desc') }}
            </p>
            <div v-if="allVariants.length > 1" class="reward-options-list">
              <div
                v-for="(item, idx) in allVariants"
                :key="idx"
              >
                <div class="reward-options-list-item">
                  <TitledInput
                    v-model="item.name"
                    :placeholder="$t('dashboard.rewards.modal.labels.variation_name')"
                    :isDisabled="loading"
                  />
                  <ImageUpload
                    :id="`variant${idx}`"
                    :isDisabled="loading"
                    @imageSelect="ev => onVariantImageSelect(ev, idx)"
                  >
                    <template>
                      <div class="image-upload-content">
                        <div
                          v-if="item.image && item.image.url"
                          class="variant-image-preview"
                        >
                          <img
                            class="variant-image-display"
                            :src="getVariantImageUrl(item.image.url)"
                          >
                        </div>
                        <div class="image-info">
                          <div>{{ $t('dashboard.rewards.modal.labels.upload_image') }}</div>
                        </div>
                      </div>
                    </template>
                  </ImageUpload>
                  <TitledInput
                    :value="item.price_usd / 100"
                    :isDisabled="loading"
                    class="input-plus-price"
                    placeholder="0.00"
                    prefix="$"
                    @input="item.price_usd = $event * 100"
                  />
                  <div
                    class="btn-remove"
                    @click="onRemoveVariant(idx, item)"
                  >
                    <img
                      class="img-remove"
                      :src="require('@/static/img/icons/ic_close.png')"
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="variantImageError"
              class="variant-image-error"
            >
              {{ variantImageError }}
            </div>
            <button
              class="btn-add"
              @click="onAddVariation"
            >
              {{ $t('dashboard.rewards.modal.buttons.add_variation') }}
            </button>
          </div>

          <div class="hr" />

          <div class="reward-shipping">
            <div class="reward-shipping-check" @click="onCheckShipping">
              <Checkbox
                :item="{label: $t('dashboard.rewards.modal.labels.shipping_reward'), checked: isShipping }"
                :onCheck="onCheckShipping"
              />
            </div>
            <div v-if="isShipping" class="reward-shipping-info">
              <div class="reward-shipping-desc">
                <p>{{ $t('dashboard.rewards.modal.labels.shipping_desc') }}</p>
                <span>{{ $t('dashboard.rewards.modal.labels.copy_from_reward') }}</span>
              </div>
              <div class="reward-options-list">
                <div
                  v-for="(item, idx) in shippingInfo"
                  :key="idx"
                  class="reward-options-list-item"
                >
                  <TitledInput
                    v-model="item.usd_price"
                    class="input-plus-price"
                    placeholder="0.00"
                    prefix="+$"
                  />
                  <TitledSelect
                    v-model="item.country"
                    :options="shippingCountries"
                  />
                  <div class="btn-remove">
                    <img
                      class="img-remove"
                      :src="require('@/static/img/icons/ic_close.png')"
                      @click="onRemoveShippingInfo(idx)"
                    >
                  </div>
                </div>
                <div class="reward-options-list-item">
                  <TitledInput
                    class="input-plus-price"
                    placeholder="0.00"
                    prefix="+$"
                  />
                  <div class="default-location">
                    {{ $t('dashboard.rewards.modal.labels.everywhere_else') }}
                  </div>
                </div>
              </div>
              <button class="btn-add" @click="onAddDestination">
                {{ $t('dashboard.rewards.modal.buttons.add_destination') }}
              </button>
            </div>
          </div>

          <div>
            <button
              v-if="selectedReward"
              class="btn-reward"
              :disabled="!isValid"
              @click="onUpdateReward"
            >
              {{ $t('dashboard.rewards.modal.buttons.update_reward') }}
            </button>
            <button
              v-else
              class="btn-reward"
              :disabled="!isValid"
              @click="onAddReward"
            >
              {{ $t('dashboard.rewards.modal.buttons.add_reward') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import ModalHeader from '@/components/widget/ModalHeader.vue';
import TitledInput from '@/components/widget/TitledInput.vue';
import TitledSelect from '@/components/widget/TitledSelect.vue';
import Checkbox from '@/components/widget/Checkbox.vue';
import ImageUpload from '@/components/widget/ImageUpload.vue';
import Upload from '@/components/svg/Upload.vue';

import { Countries } from '@/utils/constants';
import {
  createReward,
  updateReward,
  deleteReward,
  deleteRewardVariant,
  updateVariantImage,
  createRewardVariant,
  updateRewardVariant,
} from '@/utils/api';

export default {
  name: 'reward-modal',
  components: {
    ModalHeader,
    TitledInput,
    TitledSelect,
    Checkbox,
    Upload,
    ImageUpload,
  },
  props: {
    selectedReward: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      reward: {
        title: '',
        description: '',
        backer_limit: 0,
        delivery_time: null,
      },
      isShipping: false,
      shippingCountries: Countries,
      shippingInfo: [],
      image: null,
      // All variants. The first variant is not shown in the variants list if only one exists
      //   In that case, the first variant is treated as the product.
      allVariants: [{
        image: {},
        name: null,
        price_usd: 100,
      }],
      updatingVariant: null,
      creatingVariant: false,
      imageError: null,
      variantImageError: null,
    };
  },
  computed: {
    // The first variant is designated as default variant.
    // It is only shown in the variants list if one or more additional variants exist
    variants() {
      if(this.allVariants.length > 1) {
        return this.allVariants.slice(1);
      }
      return [];
    },
    isValid() {
      const variantPrice = this.variants.length && !Number.isNaN(this.variants[0].price_usd);
      return this.reward.title && this.reward.description && (this.rewardPriceValid || variantPrice);
    },
    rewardPriceValid() {
      const price = this.allVariants[0].price_usd;
      return !Number.isNaN(price / 100);
    },
    rewardPrice() {
      const price = this.allVariants[0].price_usd;
      if(this.rewardPriceValid) {
        return price / 100;
      }
      return price;
    },
    loading() {
      return this.creatingVariant || !!this.updatingVariant;
    },
    rewardImage() {
      if(this.image) {
        if(this.image.url) return this.image.url;
        return URL.createObjectURL(this.image);
      }
      return null;
    },
  },
  watch: {
    selectedReward(val) {
      this.allVariants = val.variants || [];
    },
  },
  methods: {
    getVariantImageUrl(url) {
      if(typeof url === 'string') {
        return url;
      }
      return URL.createObjectURL(url);
    },
    updateRewardPrice(price) {
      if(!Number.isNaN(price * 100)) {
        this.allVariants[0].price_usd = price * 100;
      } else {
        this.allVariants[0].price_usd = price;
      }
    },
    async onRewardImageSelect(imgFile) {
      if(imgFile) {
        // 1MB file size limit
        if(imgFile.size > 1048576) {
          this.imageError = 'Image size must be 1MB or less';
          return;
        }
        this.imageError = null;
        // If there's a reward.id, we can upload immediately
        this.image = imgFile;
        if(this.selectedReward) {
          try {
            const projectId = this.$route.params.id;
            const firstVariant = this.selectedReward.variants[0];
            await updateVariantImage({
              projectId,
              rewardId: this.selectedReward.id,
              variantId: firstVariant.id,
              file: imgFile,
            });
          } catch(err) {
            console.log('Error updating reward image: ', err);
          }
        }
      }
    },
    onCheckShipping() {
      this.isShipping = !this.isShipping;
    },
    async onAddVariation() {
      const variant = {
        name: null,
        image: null,
        price_usd: this.allVariants[0].price_usd,
      };
      if(!this.selectedReward) {
        this.allVariants.push(variant);
      } else {
        try {
          this.creatingVariant = true;
          const projectId = this.$route.params.id;
          variant.price_usd = this.allVariants[0].price_usd || 0;
          await createRewardVariant({
            projectId,
            rewardId: this.selectedReward.id,
            variant,
          });
          this.$emit('refreshProjectData');
          this.creatingVariant = false;
        } catch(err) {
          console.log('error in add variant: ', err);
        }
      }
    },
    async onRemoveVariant(idx, variant) {
      if(!variant.id) {
        this.allVariants.splice(idx, 1);
      } else {
        try {
          this.updatingVariant = variant.id;
          const projectId = this.$route.params.id;
          await deleteRewardVariant({
            projectId,
            rewardId: variant.reward_id,
            variantId: variant.id,
          });
          this.$emit('refreshProjectData');
          this.updatingVariant = null;
        } catch(err) {
          console.log('Error deleting variant: ', err);
        }
      }
    },
    onAddDestination() {
      this.shippingInfo.push({ usd_price: null, country: Countries[0] });
    },
    onRemoveShippingInfo(idx) {
      this.shippingInfo.splice(idx, 1);
    },
    async onAddReward() {
      const price = this.allVariants[0].price_usd;

      const rewardData = {
        backer_limit: this.reward.backer_limit,
        delivery_time: 1572566400,
        description: this.reward.description,
        title: this.reward.title,
        usd_price: price,
      };

      try {
        const projectId = this.$route.params.id;
        const { data: { reward } } = await createReward({
          projectId,
          reward: rewardData,
        });

        if(this.image) {
          const firstVariant = reward.variants[0];
          await updateVariantImage({
            projectId,
            rewardId: reward.id,
            variantId: firstVariant.id,
            file: this.image,
          });
        }

        if(this.variants.length) {
          await Promise.all(
            this.variants.map(async (variant) => {
              const variantToAdd = {
                name: variant.name,
                price_usd: variant.price_usd,
              };

              const { data } = await createRewardVariant({
                projectId,
                rewardId: reward.id,
                variant: variantToAdd,
              });

              if(variant.image && variant.image.url) {
                await updateVariantImage({
                  projectId,
                  rewardId: reward.id,
                  variantId: data.variant.id,
                  file: variant.image.url,
                });
              }
            }),
          );
        }
        this.$emit('refreshProjectData');
        this.$emit('hideModal');
      } catch(err) {
        console.log('Error in add reward: ', err);
      }
    },
    async onDeleteReward() {
      try {
        const projectId = this.$route.params.id;
        const rewardId = this.selectedReward.id;
        await deleteReward({ projectId, rewardId });
        this.$emit('refreshProjectData');
        this.$emit('hideModal');
      } catch(err) {
        console.log('error in delete reward: ', err);
      }
    },
    async onUpdateReward() {
      try {
        const projectId = this.$route.params.id;
        await updateReward({
          projectId,
          rewardId: this.selectedReward.id,
          reward: this.reward,
        });

        await Promise.all(
          this.allVariants.map(async (variant) => {
            // It's pretty unlikely that a variant for an existing reward won't have an id
            if(!variant.id) {
              const { data } = await createRewardVariant({
                projectId,
                rewardId: this.selectedReward.id,
                variant,
              });

              if(variant.image.url) {
                await updateVariantImage({
                  projectId,
                  rewardId: this.selectedReward.id,
                  variantId: data.variant.id,
                  file: variant.image.url,
                });
              }
            } else {
              await updateRewardVariant({
                projectId,
                rewardId: this.selectedReward.id,
                variant,
              });

              // if image.url is a string, it hasn't been changed, and thus no call to
              // updateVariantImage is necessary

              if(variant.image.url && typeof variant.image.url !== 'string') {
                await updateVariantImage({
                  projectId,
                  rewardId: this.selectedReward.id,
                  variantId: variant.id,
                  file: variant.image.url,
                });
              }
            }
          }),
        );
        this.$emit('refreshProjectData');
        this.$emit('hideModal');
      } catch(err) {
        console.log('error in update reward: ', err);
      }
    },
    async onVariantImageSelect(file, idx) {
      if(file.size > 1048576) {
        this.variantImageError = 'Image size must be 1MB or less';
        return;
      }
      this.variantImageError = null;
      this.allVariants[idx].image = {
        url: file,
      };
    },
  },
  mounted() {
    const { selectedReward } = this;
    if(selectedReward) {
      this.reward = {
        title: selectedReward.title || '',
        description: selectedReward.description || '',
        backer_limit: selectedReward.backer_limit || 0,
        delivery_time: selectedReward.delivery_time || null,
      };
      this.allVariants = selectedReward.variants;
      const firstVariant = selectedReward.variants[0];
      if(firstVariant.image && firstVariant.image.url) {
        this.image = selectedReward.variants[0].image;
      }
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

  .image-error, .variant-image-error {
    @include button_small_text;
    color: $main-orange;
  }
  .image-error {
    padding-top: 10px;
  }
  .variant-image-error {
    padding-bottom: 10px;
  }
  .reward-modal-content {
    max-width: 645px;
    margin: auto;
  }
  .reward-modal-title {
    text-align: center;
    margin: 40px 0;
  }
  .reward-modal-edit-title {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    > div {
      @include button_small_text;
      color: $main-orange;
      cursor: pointer;
    }
  }
  .reward-field-title {
    margin-top: 32px;
    display: flex;

    .reward-field-tip {
      @include subheading;
      color: $black-light;
      text-transform: uppercase;
      margin-left: 16px;
    }
  }
  .reward-field-desc {
    @include p_small;
    color: $black-med;
    margin-top: 8px;
  }
  .reward-input-quantity .suffix {
    font-size: 12px;
  }
  .img-upload-wrap {
    border: 1px solid $border-light;
    .image-upload-content {
      display: flex;
      cursor: pointer;
    }
    .image-preview, .variant-image-preview {
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid $border-light;
    }
    .image-preview {
      width: 160px;
      height: 160px;
      min-width: 160px;
      .image-display {
        width: 160px;
        height: 160px;
      }
    }
    .variant-image-preview {
      width: 45px;
      height: 45px;
      min-width: 45px;
      .variant-image-display {
        width: 45px;
        height: 45px;
      }
    }
    .image-info {
      display: flex;
      padding: 24px;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      div {
        color: $main-blue;
        @include button_small_text;
        margin-top: 8px;
      }
    }
  }
  .hr {
    margin-top: 56px;
    margin-bottom: 56px;
  }

  .reward-image {
    .reward-field-title {
      margin-bottom: 24px;
    }
  }

  .reward-shipping {
    .p-checkbox-wrap {
      padding: 10px 16px;
      border: 1px solid $border-light;
    }
    .reward-shipping-check {
      cursor: pointer;
    }
    .reward-shipping-desc {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 24px 0;
      p {
        @include p_small;
        color: $black-med;
        margin: 0;
      }
      span {
        @include link;
        margin-top: 4px;
      }
    }
    .reward-shipping-details {
      margin-bottom: 16px;
    }
  }

  .reward-options-list {
    margin-bottom: 16px;
    .reward-options-list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: -1px;
      .p-input-wrap,
      .p-select-wrap,
      .btn-remove,
      .default-location {
        margin: 0 0 0 -1px;
      }
      .p-input-wrap,
      .p-select-wrap,
      .img-upload-wrap {
        width: 100%;
      }
      .img-upload-wrap {
        height: 48px;
        border: 1px solid $border-light;
        .image-preview {
          width: 48px;
          height: 48px;
          min-width: 48px;
        }
        .image-info {
          display: flex;
          padding: 8px;
          width: 100%;
          justify-content: center;
          text-align: center;
        }
      }
      .input-plus-price {
        width: 130px;
        min-width: 130px;
      }
      .default-location {
        @include subtitle;
        border: 1px solid $border-light;
        width: 100%;
        padding: 11px 12px 13px;
        height: 48px;
      }
      .btn-remove {
        width: 48px;
        min-width: 48px;
        height: 48px;
        border: 1px solid $border-light;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        img {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  .btn-add {
    @include button($main-blue, small, 'secondary');
    width: 100%;
  }
  .btn-reward {
    @include button($main-black, large);
    width: 100%;
    margin-top: 56px;
    margin-bottom: 72px;
  }

  @media (max-width: $mobile-width) {
    padding-left: 20px;
    padding-right: 20px;

    .reward-options-list .reward-options-list-item .input-plus-price {
      width: 100px;
      min-width: 100px;
    }
  }
}
</style>
