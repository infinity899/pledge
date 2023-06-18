<template>
<div v-if="project" class="basics-wrap">
  <DashboardHeader
    :tab="$t('dashboard.basics.title')"
    :saveStatus="saveStatus"
  />
  <div class="container">
    <div class="dashboard-content">
      <h1>{{ $t('dashboard.basics.title') }}</h1>
      <Section :info="$t('dashboard.basics.project_name')">
        <TitledInput
          v-model="project.name"
          name="project-title"
          :placeholder="$t('dashboard.basics.project_name.title')"
          @input="updated('name')"
        />
      </Section>
      <Section :info="$t('dashboard.basics.blurb')">
        <TitledInput
          v-model="project.blurb"
          name="project-blurb"
          :placeholder="$t('dashboard.basics.blurb.title')"
          :rows="3"
          @input="updated('blurb')"
        />
      </Section>
      <Section :info="$t('dashboard.basics.category')">
        <TitledSelect
          v-model="project.category"
          :options="$store.getters.categories"
          label="name"
          trackBy="id"
          @input="updated('category')"
        />
      </Section>
      <Section :info="$t('dashboard.basics.location')">
        <TitledInput
          v-model="project.location"
          name="project-location"
          :placeholder="$t('dashboard.basics.location.placeholder')"
          @input="updated('location')"
        />
      </Section>
      <Section :info="$t('dashboard.basics.main_image')">
        <ImageUpload :backgroundImage="project.main_image.url" />
      </Section>
      <Section :info="$t('dashboard.basics.video')">
        <TitledInput
          v-model="project.video"
          name="project-video"
          :placeholder="$t('dashboard.basics.video.placeholder')"
          @input="updated('video')"
        />
      </Section>
      <Section :info="$t('dashboard.basics.carousel')">
        <div class="right-link">
          {{ $t('dashboard.basics.carousel.browse') }}
        </div>
      </Section>
      <ImageUpload class="upload-wide" />
      <Section :info="$t('dashboard.basics.social')">
        <ImageUpload>
          <!-- TODO: Diplay social image once it is ready-->
        </ImageUpload>
      </Section>
      <Section :info="$t('dashboard.basics.goal')">
        <TitledInput
          v-model="project.funding_goal"
          type="number"
          step="1"
          min="1"
          name="project-goal"
          :hasIcon="true"
          @input="updated('funding_goal')"
        />
      </Section>
      <Section :info="$t('dashboard.basics.length')">
        <TitledInput
          v-model="project.duration"
          name="project-length"
          type="number"
          step="1"
          min="1"
          max="60"
          :placeholder="$t('dashboard.basics.length.placeholder')"
          @input="updated('duration')"
        />
      </Section>
      <Section :info="$t('dashboard.basics.post')">
        <TitledSelect
          :options="postOptions"
          :value="project.continue_post_funding ? postOptions[1] : postOptions[0]"
          @input="updatePostFunding"
        />
      </Section>
      <Section :info="$t('dashboard.basics.referral')">
        <div class="referral">
          <Checkbox
            :item="{
              checked: project.referral_enabled,
              label: $t('dashboard.basics.referral.check'),
            }"
          />
        </div>
      </Section>
      <Section :info="$t('dashboard.basics.analytics')">
        <TitledInput
          v-model="project.google_analytics_code"
          name="project-analytics"
          :placeholder="$t('dashboard.basics.analytics.placeholder')"
          @input="updated('google_analytics_code')"
        />
      </Section>
    </div>
  </div>
  <DashboardFooter :label="$t('dashboard.overview.title')" link="dashboard-overview" />
</div>
</template>

<script>
import DashboardHeader from '@/components/builder/DashboardHeader.vue';
import DashboardFooter from '@/components/builder/DashboardFooter.vue';
import Checkbox from '@/components/widget/Checkbox.vue';
import ImageUpload from '@/components/widget/ImageUpload.vue';
import Section from '@/components/widget/Section.vue';
import TitledInput from '@/components/widget/TitledInput.vue';
import AutoSaveProject from '@/components/mixins/AutoSaveProject';
import TitledSelect from '@/components/widget/TitledSelect.vue';

export default {
  name: 'dashboard-basics',
  components: {
    Section,
    DashboardHeader,
    DashboardFooter,
    Checkbox,
    ImageUpload,
    TitledInput,
    TitledSelect,
  },
  mixins: [AutoSaveProject],
  computed: {
    postOptions() {
      return this.$t('dashboard.basics.post.options');
    },
  },
  methods: {
    updatePostFunding(value) {
      this.project.continue_post_funding = this.$t('dashboard.basics.post.options').indexOf(value) === 1;
      this.updated('continue_post_funding');
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'snippets.scss';
@import 'widgets.scss';

.basics-wrap > .container {
  overflow: visible;
}
.dashboard-content {
  .img-upload-wrap {
    height: 300px;
    margin-left: auto;
    width: 100%;
    cursor: pointer;
    position: relative;
  }
  .upload-wide {
    height: 240px;
    max-width: 100%;
    margin-bottom: 48px;
  }
  .p-input-wrap {
    margin: 0;
    input {
      @include h4;
      font-weight: 600;
    }
    textarea {
      padding-top: 16px;
      padding-bottom: 16px;
    }
  }
  .section-note span:not(:last-child) {
    padding-right: 24px;
  }
  .section-right {
    .uploaded-image { width: 100%; }

    .right-link {
      @include link;
      color: $main-blue;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      height: 100%;
    }
  }

  .referral {
    width: 100%;
    height: 48px;
    border: 1px solid $border-light;
    .p-checkbox-wrap {
      height: 100%;
      .p-checkbox {
        @include h5;
        padding-left: 44px;
        height: 100%;
        width: 100%;
        line-height: 48px;
        font-weight: 600;
        margin-top: 2px;
        .checkmark {
          top: 15px;
          left: 16px;
        }
      }
    }
  }

  @media (max-width: $desktop-width-small) {
    .section-note span {
      padding: 8px 0 0 0;
      display: block;
    }
  }
}
</style>
