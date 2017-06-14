<template>
  <div id="sizeSet">
    <div class="text-left clearfloat content">
      <div class="col-50 p-right-1">
        <span class="m-left-1">X</span>
        <input type="text" name="" class="form-control auto m-top-1 content2" v-model="offsetX" v-on:blur="setSize"/>
      </div>
      <div class="col-50 p-right-1">
        <span class="m-left-1">Y</span>
        <input type="text" name="" class="form-control auto m-top-1 content2" v-model="offsetY" v-on:blur="setSize"/>
      </div>
      <div class="col-50 p-right-1 m-top-1">
        <span class="m-left-1">W</span>
        <input type="text" name="" class="form-control auto m-top-1 content2" v-model="width" v-on:blur="setSize"/>
      </div>
      <div class="col-50 p-right-1 m-top-1">
        <span class="m-left-1">H</span>
        <input type="text" name="" class="form-control auto m-top-1 content2" v-model="height" v-on:blur="setSize"/>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from 'views/eventBus'
export default {
  name: 'sizeSet',
  data () {
    return {
      offsetX: '0',
      offsetY: '0',
      width: '70%',
      height: '576px'
    }
  },
  methods: {
    _getPara: function() {

      var para = {
        top: this.offsetX + 'px',
        left: this.offsetY + 'px',
        width: this.width + 'px',
        height: this.height + 'px'
      };
      return para;
    },
    setSize: function() {
      var para = this._getPara();
      eventBus.$emit('setSize', para);
    }
  },
  mounted () {
    var self = this;
  }
}
</script>

<style lang="scss">
#sizeSet {
  font-size: 13px;
  width: 100%;
  padding: 16px 8px;
  border-bottom: 1px solid #ddd;
}
</style>
