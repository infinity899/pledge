<template>
<div class="user-public-content container">
  <About
    :profile="profile"
    :projectCount="projectCount"
    :pledgedProjectCount="pledgedProjectCount"
  />
  <Projects
    :profile="profile"
    :createdProjects="createdProjects"
    :pledgedProjects="pledgedProjects"
  />
</div>
</template>

<script>
import Projects from '@/components/user_public/Projects.vue';
import About from '@/components/user_public/About.vue';
import * as api from '@/utils/api';

export default {
  name: 'user-public',
  components: {
    Projects,
    About,
  },
  data() {
    return {
      profile: null,
      campaignsCount: 0,
      backedCount: 0,
      createdProjects: [],
      createdProjectsPagination: {},
      pledgedProjects: [],
      pledgedProjectsPagination: {},
    };
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
    projectCount() {
      return this.createdProjectsPagination.total_count || 0;
    },
    pledgedProjectCount() {
      return this.pledgedProjectsPagination.total_count || 0;
    },
  },
  methods: {
    async getCreatedProjects() {
      const { userId } = this;
      const { projects, pagination } = await api.getCreatedProjects({ userId });
      this.createdProjects = projects;
      this.createdProjects = []; // TODO delete this, it simulates user with no projects
      this.createdProjectsPagination = pagination;
    },
    async getPledgedProjects() {
      const { userId } = this;
      const { projects, pagination } = await api.getPledgedProjects({ userId });
      this.pledgedProjects = projects;
      this.pledgedProjectsPagination = pagination;
    },
    async getUserProfile() {
      const resp = await api.getUserProfile(this.$route.params.id);
      this.profile = resp.data.user;
    },
  },
  async mounted() {
    this.getUserProfile();
    await this.getCreatedProjects();
    if(this.profile && this.profile.public_pledges) {
      await this.getPledgedProjects();
    }
  },
};
</script>

<style lang="scss">
.user-public-content.container {
  @media (min-width: $tablet-width-large) {
    padding: 0 80px;
  }
}
</style>
