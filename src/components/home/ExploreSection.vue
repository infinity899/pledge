<template>
<div class="container">
  <div class="explore-section-content section">
    <div class="left">
      <h2>{{ $t('home.explore_title') }}</h2>
    </div>
    <div class="right">
      <p class="p_large">
        {{ $t('home.explore_desc') }}
      </p>
      <router-link to="/explore">
        {{ $t('home.explore_link') }}
      </router-link>
    </div>
    <img id="img-customer1" class="customer_face" :src="require('@/static/img/img_customer1.png')">
    <img id="img-customer2" class="customer_face" :src="require('@/static/img/img_customer2.png')">
    <img id="img-customer3" class="customer_face" :src="require('@/static/img/img_customer3.png')">
    <img id="img-customer4" class="customer_face" :src="require('@/static/img/img_customer4.png')">
    <img id="img-customer5" class="customer_face" :src="require('@/static/img/img_customer5.png')">
  </div>
</div>
</template>
<script>
export default {
  name: 'explore-section',
};
</script>

<style lang="scss">
@import 'widgets.scss';

.explore-section-content {
  background-color: $section-highlight;
  display: flex;
  justify-content: space-around;
  padding: 100px 50px;
  position: relative;
  margin-top: 140px !important;

  .left {
    margin: 0 20px;

    h2 {
      max-width: 500px;
      margin-top: 40px;
    }
  }
  .right {
    margin: 0 20px;

    p {
      max-width: 450px;
      margin-top: 40px;
    }

    a {
      @include link;
    }
  }

  .customer_face {
    position: absolute;

    &#img-customer1 {
      top: -60px;
      left: 15%;
    }
    &#img-customer2 {
      top: -30px;
      right: 19%;
    }
    &#img-customer3 {
      bottom: 30px;
      left: 40px;
    }
    &#img-customer4 {
      bottom: -40px;
      left: 38%;
    }
    &#img-customer5 {
      bottom: -16px;
      right: 60px;
    }
  }

  @media (max-width: $tablet-width) {
    flex-direction: column;
    text-align: center;

    .left {
      h2 {
        max-width: 500px;
        margin: 20px auto 0 auto;
      }
    }

    .right {
      margin-bottom: 20px;

      p {
        max-width: 600px;
        margin: 20px auto 12px auto;
      }
    }

    .customer_face {
      &#img-customer1 {
        top: -60px;
        left: 10%;
      }
      &#img-customer2 {
        top: -30px;
        right: 8%;
      }
      &#img-customer3 {
        display: none;
      }
      &#img-customer4 {
        bottom: 20px;
        left: 15%;
      }
      &#img-customer5 {
        bottom: -40px;
        right: 20%;
      }
    }
  }

  @media (max-width: $mobile-width) {
    padding: 50px 0;

    .customer_face {
      display: none;
    }
    .left h2 {
      margin-bottom: 12px;
    }
    .right p {
      margin: 0 0 20px 0;
    }
  }
}
</style>
