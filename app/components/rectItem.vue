<template>
  <div id="rectItem" :class="isActive" v-on:click="borderHandler" draggable="true">
    
  </div>
</template>

<script>
import borderSet from 'components/borderSet'
import fillSet from 'components/fillSet'
import sizeSet from 'components/sizeSet'
import eventBus from 'views/eventBus'
export default {
  name: 'rectItem',
  data () {
    return {
      isActive: '',
    }
  },
  components: {
    'borderSet': borderSet,
    'fillSet': fillSet,
    'sizeSet': sizeSet
  },
  methods: {
    borderHandler: function(event) {
      this.isActive = 'active';
      $('#rectItem').removeClass('no-border');
      eventBus.$emit('showBorder', 'borderSet');
      eventBus.$emit('showFill', 'fillSet');
      eventBus.$emit('showSize', 'sizeSet');
    },
    bindDragEvent: function() {
      var self = this;
      var pos = {};
      document.addEventListener("dragover", function(event){
        pos.y = event.pageY;
        pos.x = event.pageX;
      });
      $('#displayBox').delegate('#rectItem', {
        dragstart: function(e) {
          self.eldrag = $(this);
          self.posY = pos.y;
          self.posX = pos.x;
          self.offsetX = this.offsetLeft;
          self.offsetY = this.offsetTop;
        },
        dragenter: function(event) {
          event.preventDefault();
        },
        dragend: function(event) {
          self.eldrag.css({
            top: self.offsetY + pos.y - self.posY,
            left: self.offsetX + pos.x - self.posX
          });
          self.eldrag = null;
          event.preventDefault();
        }
      });
    }
  },
  mounted () {
    var self = this;
    this.bindDragEvent();
    eventBus.$on('setBorder', function(data) {
      var color = data.color || '#21ACFF';
      var para = data.shadowX + 'px ' + data.shadowY + 'px ' + data.blur + 'px ' + data.spread + 'px ' + color;
      $('#rectItem').css('box-shadow', para);
      $('#rectItem').addClass('no-border');
    });
    eventBus.$on('setFill', function(data) {
      var bgColor = data.bgColor || '#FFF';
      $('#rectItem').css('background-color', bgColor);
    });
  }
}
</script>

<style lang="scss">
#rectItem {
  height: 576px;
  background-color: #fff;
  position: absolute;
  margin: auto;
  top: 15%;
  left: 15%;
}
</style>
