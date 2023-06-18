<template>
<div id="footer">
  <div class="container">
    <div id="footer_top">
      <div class="resource">
        <div id="p-about">
          <a class="p-logo" href="/">
            <img class="p-logo-img" :src="require('@/static/img/logo.svg')">
            <div class="p-logo-label">
              <div class="p-logo-name">{{ $t('company') }}</div>
              <span>{{ $t('footer.pledgecamp_short') }}</span>
            </div>
          </a>
          <div class="p_small p-description">
            {{ $t('footer.pledgecamp_desc') }}
          </div>
        </div>
        <div class="follow-us">
          <div id="social_media">
            <!-- eslint-disable -->
            <a id="twitter" href="https://twitter.com/pledgecamp" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-.139 9.237
                  c.209 4.617-3.234 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098
                  1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038
                  3.293 6.766 3.43-.479-2.053 1.08-4.03 3.199-4.03.943 0 1.797.398 2.395 1.037.748-.147 1.451-.42 2.086-.796-.246.767-.766 1.41-1.443
                  1.816.664-.08 1.297-.256 1.885-.517-.439.656-.996 1.234-1.639 1.697z"
                />
              </svg>
            </a>
            <a id="facebook" href="https://facebook.com/pledgecamp" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z" />
              </svg>
            </a>
            <a id="instagram" href="https://instagram.com/pledgecamp" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M11.984 16.815c2.596 0 4.706-2.111 4.706-4.707 0-1.409-.623-2.674-1.606-3.538-.346-.303-.735-.556-1.158-.748-.593-.27-1.249-.421-1.941-.421s-1.349.151-1.941.421c-.424.194-.814.447-1.158.749-.985.864-1.608 2.129-1.608 3.538 0 2.595 2.112 4.706 4.706 4.706zm.016-8.184c1.921 0 3.479 1.557 3.479 3.478 0 1.921-1.558 3.479-3.479 3.479s-3.479-1.557-3.479-3.479c0-1.921 1.558-3.478 3.479-3.478zm5.223.369h6.777v10.278c0 2.608-2.114 4.722-4.722 4.722h-14.493c-2.608 0-4.785-2.114-4.785-4.722v-10.278h6.747c-.544.913-.872 1.969-.872 3.109 0 3.374 2.735 6.109 6.109 6.109s6.109-2.735 6.109-6.109c.001-1.14-.327-2.196-.87-3.109zm2.055-9h-12.278v5h-1v-5h-1v5h-1v-4.923c-.346.057-.682.143-1 .27v4.653h-1v-4.102c-1.202.857-2 2.246-2 3.824v3.278h7.473c1.167-1.282 2.798-2 4.511-2 1.722 0 3.351.725 4.511 2h7.505v-3.278c0-2.608-2.114-4.722-4.722-4.722zm2.722 5.265c0 .406-.333.735-.745.735h-2.511c-.411 0-.744-.329-.744-.735v-2.53c0-.406.333-.735.744-.735h2.511c.412 0 .745.329.745.735v2.53z" />
              </svg>
            </a>
            <a id="youtube" href="https://youtube.com/pledgecamp" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M9.279 13.52h-.939v5.027h-.908v-5.027h-.94v-.854h2.788v.854zm5.395 1.721v2.406c0 .537-.2.954-.736.954-.296
                  0-.541-.108-.767-.388v.333h-.813v-5.88h.813v1.893c.183-.222.429-.405.718-.405.59 0 .785.499.785
                  1.087zm-.83.049c0-.146-.027-.257-.086-.333-.098-.129-.279-.143-.42-.071l-.167.132v2.703l.19.153
                  c.132.066.324.071.413-.045.046-.061.069-.161.069-.299v-2.24zm-2.347-5.859c.229
                  0 .354-.183.354-.431v-2.119c0-.255-.111-.434-.371-.434-.237 0-.353.185-.353.434v2.119c.001.24.137.431.37.431zm-.733
                  8.07c-.099.123-.317.325-.475.325-.172 0-.215-.118-.215-.292v-3.325h-.805v3.626c0
                  .88.597.885 1.031.636.16-.092.315-.227.464-.403v.479h.807v-4.338h-.807v3.292zm13.236-12.501v14c0
                  2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5zm-10.566 4.427c0 .45.137.813.592.813.256 0
                  .611-.133.979-.569v.503h.847v-4.554h-.847v3.457c-.104.129-.333.341-.498.341-.182 0-.226-.124-.226-.307v-3.491h-.847v3.807zm-3.177-2.621v2.233c0
                  .803.419 1.22 1.24 1.22.682 0 1.218-.456 1.218-1.22v-2.233c0-.713-.531-1.224-1.218-1.224-.745
                  0-1.24.493-1.24 1.224zm-3.155-2.806l1.135 3.67v2.504h.953v-2.504l1.11-3.67h-.969l-.611 2.468-.658-2.468h-.96zm11.564
                  11.667c-.014-2.978-.232-4.116-2.111-4.245-1.734-.118-7.377-.118-9.109 0-1.876.128-2.098 1.262-2.111 4.245.014 2.978.233 4.117 2.111
                  4.245 1.732.118 7.375.118 9.109 0 1.877-.129 2.097-1.262 2.111-4.245zm-1.011-.292v1.104h-1.542v.818c0 .325.027.607.352.607.34 0
                  .36-.229.36-.607v-.301h.83v.326c0 .836-.358 1.342-1.208 1.342-.771 0-1.164-.561-1.164-1.342v-1.947c0-.753.497-1.275 1.225-1.275.773-.001
                  1.147.491 1.147 1.275zm-.83-.008c0-.293-.062-.508-.353-.508-.299 0-.359.21-.359.508v.439h.712v-.439z" />
                </svg>
            </a>
            <!-- eslint-enable -->
          </div>
        </div>
      </div>
      <div class="site-links">
        <ul v-for="column in $t('footer.links')" :key="column[0].title">
          <li>{{ column[0].title }}</li>
          <li v-for="item in column.slice(1)" :key="item.title">
            <div v-if="item.route === 'unimplemented'" class="divlink" @click="showUnimplemented = true">
              {{ item.title }}
            </div>
            <a v-else :href="item.mail ? `mailto:${item.route}` : item.route" :target="item.target || ''">
              {{ item.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div id="footer_bottom">
      <div>
        <a target="_blank" href="https://medium.com/pledgecamp/terms-of-use-f9865cdecfb1">
          {{ $t('footer.terms') }}
        </a>
      </div>
      <div>
        <a target="_blank" href="https://medium.com/pledgecamp/platform-privacy-policy-bb3f6064e10c">
          {{ $t('footer.privacy') }}
        </a>
      </div>
      <div>
        <a target="_blank" href="https://medium.com/pledgecamp/risk-factors-43a40ffc048a">
          {{ $t('footer.risk') }}
        </a>
      </div>
      <div id="copyright">
        {{ $t('footer.copyright') }}
      </div>
    </div>
  </div>
  <UnimplementedModal
    v-if="showUnimplemented"
    @closeModal="showUnimplemented = false"
  />
</div>
</template>

<script>
import UnimplementedModal from '@/components/widget/UnimplementedModal.vue';

export default {
  name: 'pledgecamp-footer',
  components: {
    UnimplementedModal,
  },
  data() {
    return {
      showUnimplemented: false,
    };
  },
};
</script>

<style lang="scss">
@import 'widgets.scss';

#footer {
  color: $main-black;
  font-family: $font-title;
  font-size: 14px;
  box-sizing: border-box;
  padding: 72px 0 0 0;

  a,.divlink {
    color: $main-black;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  #footer_top {
    margin-bottom: 25px;
    display: flex;
    flex-wrap: wrap;

    .resource {
      width: 35%;

      .p-logo {
        display: flex;
        text-decoration: none;

        > img {
          width: 48px;
          height: 48px;
        }
      }

      .p-logo-label {
        margin-left: 20px;

        .p-logo-name {
          font-family: $font-title;
          font-size: 23px;
          font-weight: bold;
          line-height: 24px;
          margin: 7px 0 2px;
        }

        > span {
          font-family: $font-title;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
        }
      }

      .p-description {
        margin-top: 30px;
        max-width: 300px;
        color: $black-med;
      }
    }

    .site-links {
      width: 65%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      > ul {
        width: 25%;
      }

      li {
        line-height: 2rem;
      }
      li:first-child {
        font-weight: 600;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }

    .follow-us {
      #social_media {
        margin-top: 30px;

        a svg {
          position: relative;
          fill: $grey;
          width: 25px;
          height: 25px;

          &:hover {
            top: -2px;
          }
        }
        a:not(:last-child) svg {
          margin-right: 20px;
        }
      }
    }
  }

  #footer_bottom {
    height: 80px;
    padding: 5px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-top: 1px solid $grey-light;
    #copyright {
      margin-left: auto;
    }
    > div:nth-child(-n+2) {
      margin-right: 25px;
    }
  }

  @media (max-width: $desktop-width-small) {
    #footer_top {
      padding-left: 20px;
      .resource {
        width: 50%;
      }

      .site-links {
        width: 50%;

        ul {
          width: 50%;
          margin-bottom: 20px;
        }
      }
    }
  }

  @media (max-width: $mobile-width) {
    #footer_top {
      .resource {
        width: 100%;
        margin-bottom: 40px;
      }

      .site-links {
        width: 100%;
      }
    }

    #footer_bottom {
      text-align: center;
      justify-content: center;

      #copyright {
        width: 100%;
      }
    }
  }
}
</style>
