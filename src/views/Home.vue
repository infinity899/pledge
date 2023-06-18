<template>
<div class="home">
  <AgreementModal
    v-if="!agreementHidden"
    @accept="hideAgreement"
  />
  <ConfirmStatusModal
    v-if="showConfirmStatus"
    :status="confirmStatus"
    @closeModal="hideConfirmEmailStatus"
  />

  <HomeIntro id="home" />

  <ProjectShowcase
    id="featured"
    :projects="featuredProjects"
    :showContent="false"
  >
    <FeaturedSection :projects="featuredProjects" />
  </ProjectShowcase>

  <CreatorBacker id="creator-backer" />
  <ProjectShowcase
    id="trending"
    :title="$t('home.trending_title')"
    :projects="trendingProjects"
    :mirrored="true"
  />

  <ArticleSection id="articles" />

  <ProjectShowcase
    id="recent"
    :projects="recentProjects"
    :title="$t('home.recent_launch_title')"
  >
    <div class="recent-project-art art-wrap">
      <img :src="require('@/static/img/art/circle.png')">
    </div>
  </ProjectShowcase>

  <StorefrontSection id="storefront" />

  <div class="storefront-art art-wrap">
    <img :src="require('@/static/img/art/squiggle.png')">
  </div>
  <ProjectShowcase
    id="funded"
    :projects="storefrontProjects"
    :title="$t('home.featured_storefront_title')"
    :subTitle="$t('home.featured_storefront_desc')"
    :mirrored="true"
  />
  <ExploreSection id="explore" />
  <SubscribeSection id="subscribe" />
</div>
</template>

<script>
import HomeIntro from '@/components/home/HomeIntro.vue';
import AgreementModal from '@/components/home/AgreementModal.vue';
import FeaturedSection from '@/components/home/FeaturedSection.vue';
import CreatorBacker from '@/components/home/CreatorBacker.vue';
import StorefrontSection from '@/components/home/StorefrontSection.vue';
import ArticleSection from '@/components/home/ArticleSection.vue';
import ExploreSection from '@/components/home/ExploreSection.vue';
import SubscribeSection from '@/components/home/SubscribeSection.vue';
import ConfirmStatusModal from '@/components/auth/ConfirmStatusModal.vue';
import ProjectShowcase from '@/components/home/ProjectShowcase.vue';

import { EmailConfirmStatus } from '@/utils/constants';
import { AUTH_SUCCESS } from '@/store/actions';
import * as api from '@/utils/api';

export default {
  name: 'home',
  components: {
    HomeIntro,
    FeaturedSection,
    CreatorBacker,
    StorefrontSection,
    ArticleSection,
    ExploreSection,
    SubscribeSection,
    AgreementModal,
    ConfirmStatusModal,
    ProjectShowcase,
  },
  data() {
    return {
      agreementHidden: false,
      showConfirmStatus: false,
      confirmStatus: null,
      featuredProjects: [],
      trendingProjects: [],
      storefrontProjects: [],
      recentProjects: [],
    };
  },
  methods: {
    hideAgreement() {
      this.agreementHidden = true;
      localStorage.setItem('agreementHidden', true);
    },
    hideConfirmEmailStatus() {
      this.showConfirmStatus = false;
      this.$router.replace({ path: '/' });
    },
    verifyEmailConfirmCode(code) {
      api.confirmEmail(code)
        .then((res) => {
          this.confirmStatus = EmailConfirmStatus.SUCCESS;
          this.showConfirmStatus = true;
          if(res.data.token) {
            localStorage.setItem(api.USER_TOKEN_KEY, res.data.token);
            this.$store.commit(AUTH_SUCCESS, res.data.token);
          }
        })
        .catch((err) => {
          this.confirmStatus = err.response.data.userMessage;
          this.showConfirmStatus = true;
        });
    },
  },
  async created() {
    this.agreementHidden = localStorage.getItem('agreementHidden');
    let { projects } = await api.getProjects({ filter: 'almost_funded', fundedPercent: 100 });
    this.featuredProjects = projects;

    ({ projects } = await api.getProjects({ filter: 'recently_added' }));
    this.trendingProjects = projects;

    ({ projects } = await api.getProjects({ filter: 'recently_launched' }));
    this.recentProjects = projects;
    // TODO -- enable once the backend returns enough featured projects
    // this.storefrontProjects = api.getProjects({ filter: 'past_successes' }).projects;
    ({ projects } = await api.getProjects({ filter: 'recently_added' }));
    this.storefrontProjects = projects;
  },
  mounted() {
    const { path, query } = this.$route;
    if(path === '/confirmemail') {
      if(query && query.code) {
        this.verifyEmailConfirmCode(query.code);
      } else {
        this.$router.replace({ path: '/' });
      }
    }
  },
};
</script>

<style lang="scss">
.home {
  flex-grow: 1;

  .art-wrap {
    position: absolute;
    z-index: 1;

    &.recent-project-art img {
      top: 98px;
      position: absolute;
      right: 0;
      width: 114px;
    }

    &.storefront-art img {
      position: absolute;
      top: 153px;
      left: -31px;
      height: 104px;
    }
  }

  .section {
    padding-top: 72px;
    padding-bottom: 72px;
    margin-top: 75px;
    margin-bottom: 75px;
  }
}

@media (max-width: $tablet-width) {
  #featured-section {
    padding-left: 0;
    padding-right: 0;
  }
}
@media (max-width: $mobile-width) {
  .section {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .recent-project-art,
  .storefront-art {
    display: none;
  }
}
</style>
