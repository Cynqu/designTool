<template>
  <div id="fillSet">
    <div class="text-left clearfloat">
      <span class="content">Fill</span>
      <i class="icon-math-add pull-right m-left-1 content"></i>
      <i class="icon-math-minus pull-right content"></i>
    </div>
    <div class="m-top-2 clearfloat content">
      <div class="col-50 color-input m-top-1 p-right-1">
        <span class="first" :style="{ background:bgColor }"></span>
        <input type="text" name="colorpicker" class="form-control auto content2 js-fill-bg-color" v-model="bgColor" v-on:blur="setFill"/>
      </div>
      <div class="col-25">
        <input type="text" name="" class="form-control auto m-top-1 content2" v-model="percentage" v-on:blur="setFill"/>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from 'views/eventBus'
export default {
  name: 'fillSet',
  data () {
    return {
      bgColor: '#FFF',
      percentage: '100%'
    }
  },
  methods: {
    _getPara: function() {
      var para = {
        bgColor: $.trim(this.bgColor),
      };
      return para;
    },
    setFill: function() {
      var para = this._getPara();
      eventBus.$emit('setFill', para);
    }
  },
  mounted () {
    var self = this;
    this.$color = $('.js-fill-bg-color');
    this.$color.colorpicker({
      colorFormat: '#HEX',
      color: '#21ACFF',
      open: function(e, options) {
        var eleOffset = options.colorPicker.element.offset();
        options.colorPicker.dialog.offset({
          top: eleOffset.top + 32,
          left: eleOffset.left - 200
        });
      },
      close: function(e, rets) {
        $(self).data('change', true);
        self.bgColor = rets.formatted;
        var para = self._getPara();
        eventBus.$emit('setFill', para);
      }
    });
  }
}
</script>

<style lang="scss">
#fillSet {
  font-size: 13px;
  width: 100%;
  padding: 16px 8px;
  border-bottom: 1px solid #ddd;
}
</style>
