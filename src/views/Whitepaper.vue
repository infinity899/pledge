<template>
<div class="whitepaper-wrap container">
  <div class="whitepaper container-content">
    <h2>{{ $t('whitepaper.title') }}</h2>
    <div class="whitepaper-content">
      <div class="whitepaper-downloads">
        <h3>{{ $t('whitepaper.downloads') }}</h3>
        <div class="whitepapers">
          <div
            v-for="(item, index) in languages"
            :key="index"
            class="whitepaper"
          >
            <div class="whitepaper-icon" v-html="item.icon" />
            <div class="whitepaper-label">
              {{ item.label }}
            </div>
            <a
              class="whitepaper-link"
              target="_blank"
              :href="item.link"
            >
              {{ $t('whitepaper.download') }}
            </a>
          </div>
        </div>
      </div>
      <div class="whitepaper-info">
        <h3>{{ $t('whitepaper.info_title') }}</h3>
        <div class="whitepaper-info-text">
          {{ $t('whitepaper.info_text') }}
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

/* eslint-disable max-len, global-require */
const languages = [
  {
    code: 'en',
    link: require('@/static/pdf/pledgecamp_whitepaper_v2-3_en.pdf'),
    label: 'English',
    icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"     viewBox="0 0 473.68 473.68" style="enable-background:new 0 0 473.68 473.68;" xml:space="preserve"><g>    <path style="fill:#29337A;" d="M41.712,102.641c-15.273,22.168-26.88,47.059-33.918,73.812h107.734L41.712,102.641z"/>    <path style="fill:#29337A;" d="M170.511,9.48c-27.288,7.947-52.56,20.628-74.814,37.168l74.814,74.814V9.48z"/>    <path style="fill:#29337A;" d="M101.261,430.982c20.874,14.607,44.195,25.915,69.25,33.211v-102.45L101.261,430.982z"/>    <path style="fill:#29337A;" d="M10.512,306.771c7.831,25.366,19.831,48.899,35.167,69.833l69.833-69.833H10.512z"/></g><g>    <path style="fill:#FFFFFF;" d="M45.619,97.144c-1.324,1.81-2.629,3.646-3.908,5.501l73.816,73.812H7.793        c-1.746,6.645-3.171,13.418-4.345,20.284h141.776L45.619,97.144z"/>    <path style="fill:#FFFFFF;" d="M95.767,427.074c1.802,1.343,3.654,2.621,5.493,3.908l69.25-69.242v102.45        c6.653,1.945,13.41,3.624,20.284,4.974V332.05L95.767,427.074z"/>    <path style="fill:#FFFFFF;" d="M5.25,286.487c1.47,6.873,3.205,13.642,5.258,20.284h105.001l-69.833,69.833        c7.595,10.377,16.017,20.115,25.168,29.12L190.08,286.487H5.25L5.25,286.487z"/>    <path style="fill:#FFFFFF;" d="M170.511,9.48v111.982l-74.815-74.81c-10.314,7.67-19.955,16.185-28.888,25.403l123.983,123.983        V4.506C183.921,5.864,177.164,7.547,170.511,9.48z"/></g><g>    <polygon style="fill:#D32030;" points="170.511,306.056 169.8,306.771 170.511,306.771     "/>    <polygon style="fill:#D32030;" points="190.084,286.487 190.794,286.487 190.794,285.773     "/>    <polygon style="fill:#D32030;" points="281.229,196.737 280.545,196.737 280.545,197.425     "/>    <polygon style="fill:#D32030;" points="171.21,176.457 170.511,175.754 170.511,176.457     "/>    <polygon style="fill:#D32030;" points="190.794,196.037 190.794,196.737 191.494,196.737     "/></g><g>    <path style="fill:#252F6C;" d="M300.825,411.764v53.091c25.381-7.105,49.045-18.305,70.211-32.897l-57.526-57.526        C308.913,390.583,307.231,398.933,300.825,411.764z"/>    <path style="fill:#252F6C;" d="M313.812,108.471l62.799-62.799C354.05,29.15,328.456,16.559,300.824,8.818v54.538        C308.21,78.146,308.831,89.384,313.812,108.471z"/>    <path style="fill:#252F6C;" d="M427.029,377.984c15.815-21.275,28.141-45.29,36.147-71.213h-107.36L427.029,377.984z"/>    <path style="fill:#252F6C;" d="M465.887,176.457c-7.188-27.318-19.143-52.676-34.898-75.192l-75.2,75.192H465.887z"/></g><g>    <path style="fill:#E7E7E7;" d="M327.638,290.5l16.275,16.275l77.903,77.903c1.769-2.214,3.526-4.42,5.217-6.69l-71.213-71.213        h107.36c2.046-6.638,3.784-13.41,5.25-20.284H329.16C328.932,289.367,327.911,287.643,327.638,290.5z"/>    <path style="fill:#E7E7E7;" d="M311.352,120.348l70.607-70.615c-1.769-1.372-3.541-2.737-5.348-4.061l-62.799,62.799        C314.463,110.954,310.746,117.805,311.352,120.348z"/>    <path style="fill:#E7E7E7;" d="M300.825,58.992V8.814c-6.645-1.862-13.41-3.44-20.284-4.727v24.476        C288.088,36.745,294.853,47.022,300.825,58.992z"/>    <path style="fill:#E7E7E7;" d="M326.041,196.737h144.195c-1.171-6.866-2.599-13.635-4.345-20.284H355.793l75.2-75.192        C423.6,90.7,415.384,80.768,406.409,71.565l-84.702,84.694C323.988,171.622,325.009,180.544,326.041,196.737z"/>    <path style="fill:#E7E7E7;" d="M310.088,371.002l60.952,60.959c10.138-6.982,19.685-14.753,28.593-23.189l-80.173-80.177        C316.901,343.423,313.865,357.745,310.088,371.002z"/>    <path style="fill:#E7E7E7;" d="M280.545,442.301v27.28c6.873-1.279,13.635-2.865,20.284-4.727v-53.091        C294.853,423.738,288.088,434.13,280.545,442.301z"/></g><path style="fill:#D71F28;" d="M321.707,156.259l84.694-84.694c-7.625-7.831-15.8-15.119-24.446-21.832l-66.55,66.561    C318.363,128.657,319.706,142.808,321.707,156.259z"/><g>    <path style="fill:#D32030;" d="M225.019,0.292C228.965,0.101,232.899,0,236.836,0C232.876,0,228.935,0.101,225.019,0.292z"/>    <path style="fill:#D32030;" d="M236.836,473.68c-3.938,0-7.872-0.108-11.81-0.299C228.942,473.579,232.876,473.68,236.836,473.68z"        />    <path style="fill:#D32030;" d="M236.836,473.68c14.943,0,29.535-1.447,43.708-4.099v-27.28        C268.103,455.786,253.549,473.68,236.836,473.68z"/></g><g>    <path style="fill:#D71F28;" d="M470.232,196.737H327.911c1.885,29.704,1.657,60.249-0.681,89.75h141.2        c3.418-16.017,5.25-32.613,5.25-49.643C473.68,223.164,472.461,209.784,470.232,196.737z"/>    <path style="fill:#D71F28;" d="M327.638,290.5c-1.316,13.994-5.901,24.898-8.182,38.099l80.173,80.173        c7.932-7.517,15.347-15.557,22.183-24.094l-77.9-77.907L327.638,290.5z"/></g><path style="fill:#D32030;" d="M280.545,30.324V4.091C266.376,1.447,251.784,0,236.836,0C253.549,0,268.103,16.843,280.545,30.324z"    /><g>    <path style="fill:#29337A;" d="M300.825,422.007c6.406-12.834,11.899-27.609,16.499-43.757l-16.499-16.499V422.007z"/>    <path style="fill:#29337A;" d="M319.377,102.906c-4.989-19.087-11.166-36.439-18.552-51.229v69.773L319.377,102.906z"/></g><g>    <path style="fill:#FFFFFF;" d="M332.234,295.092c0.269-2.857,0.512-5.725,0.744-8.605h-9.349L332.234,295.092z"/>    <path style="fill:#FFFFFF;" d="M300.825,121.451V51.674c-5.976-11.97-12.737-22.254-20.284-30.429v129.906l40.735-40.735        c-0.613-2.543-1.257-5.034-1.9-7.517L300.825,121.451z"/>    <path style="fill:#FFFFFF;" d="M281.229,196.737h52.429c-1.028-16.192-2.666-32.123-4.944-47.482L281.229,196.737z"/>    <path style="fill:#FFFFFF;" d="M280.545,452.432c7.547-8.182,14.308-18.459,20.284-30.429v-60.256l16.499,16.499        c3.784-13.264,6.959-27.434,9.525-42.261l-46.307-46.304L280.545,452.432L280.545,452.432z"/></g><path style="fill:#E51D35;" d="M280.545,452.432V289.681l46.304,46.307c2.277-13.205,4.069-26.899,5.381-40.896l-8.605-8.605h9.349    c2.337-29.502,2.565-60.047,0.681-89.75h-52.429l47.482-47.482c-2.001-13.455-4.476-26.469-7.434-38.836l-40.728,40.735V21.248    C268.103,7.763,253.549,0,236.836,0c-3.938,0-7.872,0.101-11.817,0.292c-11.649,0.583-23.073,2.016-34.225,4.215v191.531    L66.808,72.055c-7.618,7.861-14.704,16.237-21.189,25.089l79.313,79.313l20.291,20.284H3.448C1.227,209.784,0,223.164,0,236.844    c0,17.034,1.84,33.626,5.25,49.643h184.834L70.847,405.724c7.808,7.67,16.121,14.813,24.921,21.349l95.023-95.023v137.116    c11.151,2.199,22.583,3.631,34.232,4.215c3.938,0.191,7.872,0.299,11.81,0.299C253.549,473.68,268.103,465.917,280.545,452.432z"/></svg>',
  },
  {
    code: 'cn',
    link: require('@/static/pdf/pledgecamp_whitepaper_v2-2_cn.pdf'),
    label: '汉语 - Chinese',
    icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-49 141 512 512" style="enable-background:new -49 141 512 512;" xml:space="preserve"><style type="text/css">.st0{fill:#D80027;}.st1{fill:#FFDA44;}</style><circle class="st0" cx="207" cy="397" r="256"/><g><polygon class="st1" points="91.1,296.8 113.2,364.8 184.7,364.8 126.9,406.9 149,474.9 91.1,432.9 33.2,474.9 55.4,406.9 -2.5,364.8 69,364.8"/><polygon class="st1" points="254.5,537.5 237.6,516.7 212.6,526.4 227.1,503.9 210.2,483 236.1,489.9 250.7,467.4 252.1,494.2 278.1,501.1 253,510.7"/><polygon class="st1" points="288.1,476.5 296.1,450.9 274.2,435.4 301,435 308.9,409.4 317.6,434.8 344.4,434.5 322.9,450.5 331.5,475.9 309.6,460.4"/><polygon class="st1" points="333.4,328.9 321.6,353 340.8,371.7 314.3,367.9 302.5,391.9 297.9,365.5 271.3,361.7 295.1,349.2 290.5,322.7 309.7,341.4"/><polygon class="st1" points="255.2,255.9 253.2,282.6 278.1,292.7 252,299.1 250.1,325.9 236,303.1 209.9,309.5 227.2,289 213,266.3 237.9,276.4"/></g></svg>',
  },
  {
    code: 'kr',
    link: require('@/static/pdf/pledgecamp_whitepaper_v2-2_kr.pdf'),
    label: '대한민국 - Korean',
    icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><circle style="fill:#F0F0F0;" cx="256" cy="256" r="256"/><path style="fill:#D80027;" d="M345.043,256c0,22.261-39.866,77.913-89.043,77.913S166.957,278.261,166.957,256 c0-49.178,39.866-89.043,89.043-89.043S345.043,206.822,345.043,256z"/><path style="fill:#0052B4;" d="M345.043,256c0,49.178-39.866,89.043-89.043,89.043S166.957,305.178,166.957,256"/><rect x="353.427" y="319.639" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -125.4831 358.5964)" width="33.391" height="22.261"/><rect x="314.07" y="358.994" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -164.8388 342.2935)" width="33.391" height="22.261"/><rect x="400.656" y="366.851" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -145.034 405.8207)" width="33.391" height="22.261"/><rect x="361.299" y="406.213" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -184.3942 389.5197)" width="33.391" height="22.261"/><rect x="377.04" y="343.247" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -135.2602 382.2079)" width="33.391" height="22.261"/><rect x="337.694" y="382.602" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -174.6126 365.9128)" width="33.391" height="22.261"/><rect x="329.544" y="126.805" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 541.0344 499.9738)" width="89.043" height="22.261"/><rect x="314.081" y="130.749" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 464.3475 476.0975)" width="33.391" height="22.26"/><rect x="353.427" y="170.098" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 503.692 571.0911)" width="33.391" height="22.26"/><rect x="361.282" y="83.526" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 578.3161 428.8593)" width="33.391" height="22.261"/><rect x="400.651" y="122.879" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 617.6954 523.8765)" width="33.391" height="22.261"/><rect x="69.81" y="386.542" transform="matrix(0.7071 0.7071 -0.7071 0.7071 314.6838 35.6313)" width="89.043" height="22.261"/><rect x="140.919" y="382.6" transform="matrix(0.7071 0.7071 -0.7071 0.7071 324.573 3.8704)" width="33.391" height="22.26"/><rect x="101.569" y="343.252" transform="matrix(0.7071 0.7071 -0.7071 0.7071 285.2246 20.1705)" width="33.391" height="22.261"/><rect x="117.031" y="339.316" transform="matrix(0.7071 0.7071 -0.7071 0.7071 295.1205 -11.5916)" width="89.043" height="22.261"/><rect x="69.81" y="103.201" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 276.0196 114.331)" width="89.043" height="22.261"/><rect x="93.412" y="126.806" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 333.0029 137.9383)" width="89.043" height="22.261"/><rect x="117.038" y="150.428" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 390.0373 161.557)" width="89.043" height="22.26" /></svg>',
  },
  {
    code: 'jp',
    link: require('@/static/pdf/pledgecamp_whitepaper_v2-2_jp.pdf'),
    label: '日本語 - Japanese',
    icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><circle style="fill:#F0F0F0;" cx="256" cy="256" r="256"/><circle style="fill:#D80027;" cx="256" cy="256" r="111.304"/></svg>',
  },
  {
    code: 'ru',
    link: require('@/static/pdf//pledgecamp_whitepaper_v2-2_ru.pdf'),
    label: 'Русский - Russian',
    icon: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><circle style="fill:#F0F0F0;" cx="256" cy="256" r="256"/><path style="fill:#0052B4;" d="M496.077,345.043C506.368,317.31,512,287.314,512,256s-5.632-61.31-15.923-89.043H15.923 C5.633,194.69,0,224.686,0,256s5.633,61.31,15.923,89.043L256,367.304L496.077,345.043z"/><path style="fill:#D80027;" d="M256,512c110.071,0,203.906-69.472,240.077-166.957H15.923C52.094,442.528,145.929,512,256,512z"/></svg>',
  },
  {
    code: 'vi',
    link: require('@/static/pdf/pledgecamp_whitepaper_v2-2_vi.pdf'),
    label: 'Việt Nam',
    icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><circle style="fill:#D80027;" cx="256" cy="256" r="256"/><polygon style="fill:#FFDA44;" points="256,133.565 283.628,218.594 373.033,218.594 300.702,271.144 328.33,356.174 256,303.623 183.67,356.174 211.298,271.144 138.968,218.594 228.372,218.594 "/></svg>',
  },
];
/* eslint-enable max-len, global-require */

export default {
  name: 'whitepaper',
  data() {
    return {
      languages,
    };
  },
};
</script>

<style lang="scss">
@import 'general.scss';

.whitepaper {
  h2 {
    margin-top: 48px;
  }
  .whitepaper-content {
    display: flex;
    margin-top: 96px;
    margin-bottom: 72px;
    padding-top: 48px;
    border-top: 1px solid $border-light;
    .whitepaper-downloads {
      width: 60%;
      .whitepapers {
        border-top: 1px solid $border-light;
        margin-top: 24px;
        .whitepaper {
          display: flex;
          align-items: center;
          height: 72px;
          border-bottom: 1px solid $border-light;
          .whitepaper-icon {
            width: 40px;
            height: 40px;
          }
          .whitepaper-label {
            @include subtitle;
            margin-left: 16px;
          }
          .whitepaper-link {
            @include subtitle;
            color: $main-blue;
            margin-left: auto;
          }
        }
      }
    }
    .whitepaper-info {
      width: 40%;
      box-sizing: border-box;
      padding-left: 40px;
      .whitepaper-info-text {
        margin-top: 16px;
      }
    }
  }
  @media (max-width: $tablet-width) {
    .whitepaper-content {
      flex-direction: column-reverse;
      margin-top: 24px;
      padding-top: 16px;
      .whitepaper-downloads {
        width: 100%;
      }
      .whitepaper-info {
        width: 100%;
        padding: 0;
        margin-bottom: 24px;
        h3 {
          display: none;
        }
      }
    }
  }
}
</style>
