<template>
<ul class="countdown">
  <li v-if="days > 0">
    <p class="digit">
      {{ days | twoDigits }}
    </p>
    <p class="text">
      {{ $tc('time.day', days) }}
    </p>
  </li>
  <li>
    <p class="digit">
      {{ hours | twoDigits }}
    </p>
    <p class="text">
      {{ $tc('time.hour', hours) }}
    </p>
  </li>
  <li>
    <p class="digit">
      {{ minutes | twoDigits }}
    </p>
    <p class="text">
      {{ $tc('time.minute', minutes) }}
    </p>
  </li>
  <li>
    <p class="digit">
      {{ seconds | twoDigits }}
    </p>
    <p class="text">
      {{ $tc('time.second', seconds) }}
    </p>
  </li>
</ul>
</template>

<script>
let interval = null;
export default {
  name: 'countdown',
  filters: {
    twoDigits(value) {
      if(value.toString().length <= 1) {
        return `0${value.toString()}`;
      }
      return value.toString();
    },
  },
  props: {
    deadline: {
      type: Number,
      default: 0,
    },
    stop: {
      type: Boolean,
    },
  },
  data() {
    return {
      now: Math.trunc(new Date().getTime() / 1000),
      diff: 0,
    };
  },
  computed: {
    seconds() {
      return Math.trunc(this.diff) % 60;
    },
    minutes() {
      return Math.trunc(this.diff / 60) % 60;
    },
    hours() {
      return Math.trunc(this.diff / 60 / 60) % 24;
    },
    days() {
      return Math.trunc(this.diff / 60 / 60 / 24);
    },
  },
  watch: {
    now() {
      this.diff = this.deadline - this.now;
      if(this.diff <= 0 || this.stop) {
        this.diff = 0;
        // Remove interval
        clearInterval(interval);
      }
    },
  },
  destroyed() {
    clearInterval(interval);
  },
  created() {
    this.diff = this.deadline - this.now;
    interval = setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000);
    }, 1000);
  },
};
</script>
<style lang="scss">
.countdown {
  padding: 0;
  margin: 0;

  li {
    display: inline-block;
    margin: 0 25px;
    text-align: center;
    position: relative;

    p {
      margin: 0;
      line-height: 19px;
    }

    &::after {
      content: ":";
      position: absolute;
      top: 0;
      right: -30px;
      font-size: 32px;
    }

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }

    &:last-of-type::after {
      content: "";
    }
  }

  .digit {
    font-size: 36px;
    font-weight: normal;
    line-height: 43px;
    margin-bottom: 0;
  }

  .text {
    text-transform: uppercase;
    margin-bottom: 0;
    font-size: 10px;
  }
}

</style>
