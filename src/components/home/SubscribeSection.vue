<template>
<form class="subscribe-section-content container section" @submit="subscribe">
  <img :src="require('@/static/img/art_icons/newsletter_small.png')">
  <h2>{{ $t('home.subscribe_title') }}</h2>
  <input
    v-model="email"
    :placeholder="$t('home.subscribe_enter_email')"
    @keydown="result = null"
  >
  <Arrow :clickable="true" :color="'black'" @click="subscribe" />
  <div class="email-result">
    {{ result }}
  </div>
</form>
</template>

<script>
import Arrow from '@/components/svg/Arrow.vue';
import { validateEmail } from '@/utils/stringUtils';

// eslint-disable-next-line
const mailEndpoint = 'https://sibforms.com/serve/MUIEAFF0ew7C1FdGWDJpBW4hUyJHb4UQ8_8OY8sJMjUHlArdLU-WigEXAuW13x6AdrR3rwKOyo20Y9ysyijmDEJA0WGXlyv9ga0mU0-givVXcIf5fDdraWdKoXxsL7mjIbBpGwmiDT8q2gLvsPahIC9lPtal2Cb6pJHWoJIj6FHex-odgpTSa82PctaW-TDMLRHDeFa6FU77E9Cl';

export default {
  name: 'subscribe-section',
  components: {
    Arrow,
  },
  data() {
    return {
      email: '',
      result: null,
    };
  },
  methods: {
    subscribe(e) {
      const self = this;
      if(e) {
        e.preventDefault();
      }
      if(!this.email || this.email === '' || !validateEmail(this.email)) {
        this.result = 'Please enter a valid email address!';
        return;
      }
      const formData = new FormData();
      formData.append('defaultEMAIL', this.email);
      formData.append('locale', 'en');
      fetch(mailEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      })
        .then(rsp => rsp.text())
        .then((_data) => {
          self.result = 'Successfully subscribed!';
        })
        .catch((_err) => {
          self.result = 'Subscription sent, check your email to confirm!';
        });
    },
  },
};
</script>

<style lang="scss">
@import "general.scss";

.subscribe-section-content {
  text-align: center;
  padding-top: 24px !important;
  padding-bottom: 24px !important;

  img {
    width: 66px;
    height: 66px;
  }

  h2 {
    margin: 40px auto;
    max-width: 580px;
    box-sizing: border-box;
    padding: 0 5%;
  }

  input {
    width: 500px;
    max-width: 100%;
    color: black;
    border: 1px solid $border-light;
    font-family: $font-title;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    height: 52px;
    outline: none;
    margin-bottom: 16px;

    &::placeholder {
      color: $black-lighter;
    }
  }
  svg {
    width: 28px;
    height: auto;
    position: relative;
    right: 42px;
    top: 2px;
    cursor: pointer;
  }
  .email-result {
    height: 24px;
    color: $main-blue;
  }
}

@media (max-width: $mobile-width) {
  .subscribe-section-content svg {
    display: none;
  }
}
</style>
