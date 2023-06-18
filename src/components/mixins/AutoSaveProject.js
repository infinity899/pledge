import { getCreatorProjectDetail, updateProject } from '@/utils/api';
import AutoSave from './AutoSave';

export default {
  data() {
    return {
      project: null,
    };
  },
  mixins: [AutoSave],
  methods: {
    updated(field) {
      if(field === 'category') {
        this.updateFields.category_id = this.project.category.id;
      } else {
        this.updateFields[field] = this.project[field];
      }
      this.startSaveTimer();
    },
    async executeSave() {
      const projectId = this.project.id;
      try {
        await updateProject({ projectId, projectData: this.updateFields });
        this.updateSaveStatus(true);
      } catch(err) {
        console.log(err);
      }
      this.updateFields = {};
      this.removeSaveTimer();
    },
  },
  async created() {
    // Pending update data is non-reactive.
    this.updateFields = {};
    this.project = await getCreatorProjectDetail(this.$route.params.id);
    // @TODO remove once added in backend.
    this.$set(this.project, 'continue_post_funding', false);
  },
};
