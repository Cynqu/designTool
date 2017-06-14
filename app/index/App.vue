<template>
  <div id="app">
      <div id="tplBox">
        <div id="rectangle" :class="isActive" v-on:click="addRectItem">
        <i class="icon-preview"></i><span>rectangle</span>
        </div>
      </div>
      <div id="displayBox">
        <components :is="currentRect"></components>
      </div>
      <div id="setBox">
        <div class="setTitle content">Tool</div>
        <components :is="baseSet"></components>
        <components :is="firstSet"></components>
        <components :is="secondSet"></components>
      </div>
  </div>
</template>

<script>
import rectItem from 'components/rectItem'
import eventBus from 'views/eventBus'
import borderSet from 'components/borderSet'
import fillSet from 'components/fillSet'
import sizeSet from 'components/sizeSet'

export default {
  name: 'app',
  data () {
    return {
      isActive: '',
      currentRect: '',
      firstSet: '',
      secondSet: '',
      baseSet: ''
    }
  },
  components: {
    'rectItem': rectItem,
    'borderSet': borderSet,
    'fillSet': fillSet,
    'sizeSet': sizeSet
  },
  methods: {
    addRectItem: function() {
      this.isActive = 'active';
      this.currentRect = 'rectItem';
    },
  },
  mounted () {
    var self = this;
    eventBus.$on('showBorder', function(msg) {
      self.secondSet = msg;
    });
    eventBus.$on('showFill', function(msg) {
      self.firstSet = msg;
    });
    eventBus.$on('showSize', function(msg) {
      self.baseSet = msg;
    });
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.setTitle {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
</style>
