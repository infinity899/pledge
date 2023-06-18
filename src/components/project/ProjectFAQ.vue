<template>
<div class="container project-faq">
  <div v-if="project && faqs.length || (!faqs.length && isCreator)" id="faq" class="faq-content">
    <div v-if="faqs.length" class="faq-items">
      <FAQAccordion
        v-for="(faqItem, index) in faqs"
        :key="index"
        v-model="faqs[index]"
      />
    </div>
    <div v-else-if="isCreator" class="faq-items">
      <div class="faq-empty is-owner">
        <p>{{ $t('project.faq.empty_own') }}</p>
        <router-link :to="{ name: 'dashboard-faq' }">
          <div class="edit-faq">
            {{ $t('project.faq.button_edit') }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <div class="faq-contact">
    <div class="contact-description">
      <img width="32" height="32" src="@/static/img/icons/ic_message.png">
      <div v-if="faqs.length || isCreator" class="p_large">
        {{ $t('project.faq.description') }}
      </div>
      <div v-else>
        {{ $t('project.faq.description_empty') }}
      </div>
    </div>
    <div v-if="email" class="contact-creator">
      <div class="contact-creator-title">
        {{ $t('project.faq.contact_title') }}
      </div>
      <div class="contact-button">
        <a :href="`mailto:${email}`">
          {{ $t('project.faq.contact') }}
          <Arrow />
        </a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import FAQAccordion from '@/components/project/FAQAccordion.vue';
import Arrow from '@/components/svg/Arrow.vue';

export default {
  name: 'project-faq',
  components: {
    FAQAccordion,
    Arrow,
  },
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
  computed: {
    faqs() {
      if(this.project) {
        return this.project.faqs || [];
      }
      return [];
    },
    email() {
      if(this.project) {
        return this.project.contact_email;
      }
      return '';
    },
    isCreator() {
      const profile = this.$store.getters.getProfile;
      return profile && this.project && this.project.creator && this.project.creator.id === profile.id;
    },
  },
};
</script>

<style lang="scss">
@import 'general.scss';
@import 'widgets.scss';

.project-faq {
  display: flex;
  .faq-item {
    .faq-accordion {
      padding: 16px 0;
      height: auto;
    }
  }
  .faq-content {
    width: 100%;
    margin-right: 50px;
    .faq-items {
      display: flex;
      flex-direction: column;
      margin-right: 64px;

      .faq-empty {
        margin-top: -20px;
        padding-bottom: 45px;
        border-bottom: 1px solid $grey-light;
        &.is-owner {
          font-weight: 700;
        }
        p {
          margin-bottom: 24px;
        }
      }
      .edit-faq {
        @include button;
      }
    }
  }
  .faq-contact {
    background: $bg-grey-light;
    padding: 24px 48px 32px;
    .contact-description > div {
      margin-top: 8px;
    }
    .contact-creator {
      @include subheading;
      width: 100%;
      text-transform: uppercase;
      margin-top: 32px;
      .contact-creator-title {
        opacity: 0.5;
      }
      .contact-button {
        display: flex;
        cursor: pointer;
        align-items: center;
        a:hover {
          color: $main-black;
        }
        svg {
          margin-left: 8px;
        }
      }
    }
  }
  @media (min-width: $mobile-width) {
    padding-top: 48px;
  }
  @media (min-width: $tablet-width) {
    .faq-content {
      flex-basis: 60%;
    }
    .faq-contact {
      flex-basis: 40%;
      max-width: 350px;
    }
  }
  @media (max-width: $tablet-width-large) {
    .faq-content .faq-items {
      margin-right: 0;
    }
  }
  @media (max-width: $mobile-width) {
    flex-direction: column-reverse;
    .faq-contact {
      width: 100vw;
      margin-left: -20px;
      padding-left: 20px;
      padding-right: 80px;
      .contact-description {
        img {
          display: none;
        }
      }
    }
    .faq-content {
      padding-top: 24px;
      .faq-items {
        .faq-empty {
          margin-top: 0;
        }
      }
    }
  }
}

</style>
