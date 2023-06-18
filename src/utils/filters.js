import Vue from 'vue';
import * as moment from 'moment';

Vue.filter('weiToEth', (value) => {
  if(!value) return '';
  return (value / 1e18).toString();
});
Vue.filter('capitalize', (value) => {
  if(!value) return '';
  const s = value.toString();
  return s.charAt(0).toUpperCase() + s.slice(1);
});
Vue.filter('uppercase', value => (
  value ? value.toLocaleUpperCase() : ''
));

Vue.filter('plg_to_usd', (plgValue, plgRate) => {
  if(plgRate) {
    const usdValue = (plgValue / 1e18) / plgRate;
    return `$${usdValue.toLocaleString()}`;
  }
  return '';
});

Vue.filter('from_cents', (usdValue) => {
  const dollars = usdValue / 100;
  return `$${dollars.toLocaleString()}`;
});

Vue.filter('expire_date', (dateString) => {
  const date = new Date(dateString);
  return `${(0 + (date.getMonth() + 1).toString()).slice(-2)}/${date.getFullYear()}`;
});

Vue.filter('limit_string', (string, characters) => {
  if(!string || string.length < characters) {
    return string;
  }
  let short = string.slice(0, characters);
  if(short.charAt(short.length - 1) === ' ') {
    short = short.slice(0, short.length - 1);
  }
  return `${short}...`;
});

// Very simple insecure hash function
const simpleHash = (str) => {
  let hash = 0;
  for(let i = 0; i < str.length; i += 1) {
    hash += str.charCodeAt(i);
  }
  return hash;
};

/* eslint-disable global-require,import/no-dynamic-require */
Vue.filter('avatar', (user) => {
  if(!user || user.image === undefined) {
    return require('@/static/img/avatars/avatar1.png');
  }
  if(user.image.url) {
    return user.image.url;
  }
  const index = (simpleHash(user.name || '') % 6) + 1;
  return require(`@/static/img/avatars/avatar${index}.png`);
});
/* eslint-enable global-require,import/no-dynamic-require */

Vue.filter('from_eth_date', date => moment(date * 1000).format('MMMM D, YYYY'));
