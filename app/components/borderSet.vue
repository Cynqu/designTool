<template>
  <div id="borderSet">
    <div class="text-left clearfloat">
      <span class="content">Border</span>
      <i class="icon-math-add pull-right m-left-1 content"></i>
      <i class="icon-math-minus pull-right content"></i>
    </div>
    <div class="text-left clearfloat content m-top-2">
      <div class="col-25 p-right-1">
        <label>Blur</label>
        <input type="text" name="" class="form-control auto m-top-1 content2" v-model="blur" v-on:blur="setBorder"/>
      </div>
      <div class="col-25 p-right-1">
        <label>X</label>
        <input type="text" name="" class="form-control auto m-top-1 content2" v-model="shadowX" v-on:blur="setBorder"/>
      </div>
      <div class="col-25 p-right-1">
        <label>Y</label>
        <input type="text" name="" class="form-control auto m-top-1 content2" v-model="shadowY" v-on:blur="setBorder"/>
      </div>
      <div class="col-25 p-right-1">
        <label>Spread</label>
        <input type="text" name="" class="form-control auto m-top-1 content2" v-model="spread" v-on:blur="setBorder"/>
      </div>
    </div>
    <div class="m-top-1 clearfloat content">
      <div class="col-50 color-input m-top-1 p-right-1">
        <span class="first" :style="{ background:color }"></span>
        <input type="text" name="colorpicker" class="form-control auto content2 js-sd-rt-bg-color" v-model="color" v-on:blur="setBorder"/>
      </div>
      <div class="col-25">
        <input type="text" name="" class="form-control auto m-top-1 content2" v-model="percentage" v-on:blur="setBorder"/>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from 'views/eventBus'
export default {
  name: 'borderSet',
  data () {
    return {
      blur: '0 px',
      shadowX: '0 px',
      shadowY: '0 px',
      spread: '0 px',
      color: '#21ACFF',
      percentage: '100%'
    }
  },
  methods: {
    _getPara: function() {
      var para = {
        blur: $.trim(this.blur.split('px')[0]),
        shadowX: $.trim(this.shadowX.split('px')[0]),
        shadowY: $.trim(this.shadowY.split('px')[0]),
        color: $.trim(this.color),
        spread: $.trim(this.spread.split('px')[0])
      };
      return para;
    },
    setBorder: function () {
      var para = this._getPara();
      eventBus.$emit('setBorder', para);
    }
  },
  mounted () {
    var self = this;
    this.$color = $('.js-sd-rt-bg-color');
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
        self.color = rets.formatted;
        var para = self._getPara();
        eventBus.$emit('setBorder', para);
      }
    });
  }
}
</script>

<style lang="scss">
#borderSet {
  font-size: 13px;
  width: 100%;
  padding: 16px 8px;
  border-bottom: 1px solid #ddd;
}
</style>
