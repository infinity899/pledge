<template>
<div class="category-page container">
  <CategoryHeader
    :activeFilter="filter"
    :category="category"
    @changeFilter="handleNewFilter"
    @orderProjects="orderProjects"
  />
  <div class="category-list">
    <ProjectItem
      v-for="(project, index) in projects"
      :key="index"
      :project="project"
      @click.native="$router.push({name: 'project', params: {id: project.id, tab: 'campaign'}})"
    />
  </div>
</div>
</template>

<script>
import * as api from '@/utils/api';
import ProjectItem from '@/components/widget/ProjectItem.vue';
import CategoryHeader from '@/components/widget/CategoryHeader.vue';

export default {
  name: 'category',
  components: {
    ProjectItem,
    CategoryHeader,
  },
  data() {
    return {
      categoryId: null,
      filter: 'live_projects',
      changedFilter: '',
      projects: [],
    };
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    category() {
      if(!this.categoryId) {
        return {};
      }
      return this.categories.find(c => c.id.toString() === this.categoryId) || {};
    },
  },
  methods: {
    handleNewFilter(value) {
      this.filter = value;
      this.getProjects(value, this.categoryId);
    },
    orderProjects(order) {
      this.getProjects(order, this.categoryId);
    },
    async getProjects(filter, categoryId) {
      const { projects } = await api.getProjects({ filter, categoryId });
      this.projects = projects;
      this.categoryId = categoryId.toString();
    },
  },
  async beforeRouteUpdate(to, from, next) {
    await this.getProjects(this.filter, to.params.categoryId);
    next();
  },
  async mounted() {
    await this.getProjects(this.filter, this.$route.params.categoryId);
  },
};
</script>

<style lang="scss">
.category-page {
  min-height: 400px;
  .project-item {
    margin: 50px 0;
    justify-self: center;
    max-width: 300px;
    padding: 0;
  }
  .category-list {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 5%;
  }

  @media (max-width: 1400px) {
    .category-list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media (max-width: 1050px) {
    .category-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 700px) {
    .category-list {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
