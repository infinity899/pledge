<template>
<CheckoutModal
  v-if="showCheckoutModal"
  @close:success="closeModal"
  @close:incomplete="closeModal"
/>
</template>

<script>
import CheckoutModal from '@/components/pledge/CheckoutModal.vue';

export default {
  name: 'checkout',
  components: {
    CheckoutModal,
  },
  data() {
    return {
      showCheckoutModal: true,
    };
  },
  methods: {
    closeModal() {
      this.showCheckoutModal = !this.showCheckoutModal;
      this.$router.push({
        name: 'project',
        params: { id: this.$route.params.id, tab: 'project' },
      });
    },
  },
};
</script>
