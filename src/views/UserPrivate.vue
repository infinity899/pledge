<template>
<div class="user-private-content container">
  <About
    :profile="profile"
    :projectCount="projectCount"
    :pledgedProjectCount="pledgedProjectCount"
    :getUserProfile="getUserProfile"
  />
  <Projects
    :profile="profile"
    :createdProjects="createdProjects"
    :pledgedProjects="pledgedProjects"
  />
</div>
</template>

<script>
import Projects from '@/components/user_private/Projects.vue';
import About from '@/components/user_private/About.vue';
import * as api from '@/utils/api';

export default {
  name: 'user-private',
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
      if(!this.profile) {
        return null;
      }
      return this.profile.id;
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
      this.createdProjectsPagination = pagination;
    },
    async getPledgedProjects() {
      const { userId } = this;
      const { projects, pagination } = await api.getPledgedProjects({ userId });
      this.pledgedProjects = projects;
      this.pledgedProjectsPagination = pagination;
    },
    async getUserProfile() {
      const resp = await api.getProfile();
      this.profile = resp.data.user;
    },
  },
  async mounted() {
    await this.getUserProfile();
    await this.getCreatedProjects();
    await this.getPledgedProjects();
  },
};
</script>

<style lang="scss">
.user-private-content.container {
  @media (min-width: $tablet-width-large) {
    padding: 0 80px;
  }
}
</style>
