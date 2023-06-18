const SAVE_INTERVAL = 2500;
const SAVE_STATUS = {
  SAVING: 'saving',
  SAVED: 'saved',
};

export default {
  data() {
    return {
      saveStatus: null,
      saveTimer: null,
    };
  },
  methods: {
    startSaveTimer() {
      this.updateSaveStatus(false);
      if(!this.saveTimer) {
        window.addEventListener('beforeunload', this.confirmExit);
        this.saveTimer = setTimeout(this.executeSave, SAVE_INTERVAL);
      }
    },
    // Consumers must override this action
    executeSave() {
      this.updateSaveStatus(true);
      this.removeSaveTimer();
    },
    updateSaveStatus(isSaved) {
      this.saveStatus = isSaved ? SAVE_STATUS.SAVED : SAVE_STATUS.SAVING;
    },
    removeSaveTimer() {
      this.saveTimer = null;
      window.removeEventListener('beforeunload', this.confirmExit);
    },
    confirmExit(event) {
      event.returnValue = this.$t('dashboard.save_warning');
    },
  },
  beforeRouteLeave(to, from, next) {
    if(this.saveTimer) {
      // eslint-disable-next-line
      if(!window.confirm(this.$t('dashboard.save_warning'))) {
        next(false);
        return;
      }
    }
    next();
  },
};
