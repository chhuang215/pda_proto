/**
 * @summary PDA Web UI (Proof of Concept)
 * Modal Component
 * @author Chih-Hsuan Huang
 */

// Modal component
Vue.component("modal", {
  props:{
    canclose: {
      type: Boolean,
      default: false
    },
    openmodal: {
      default: false
    },
    onCloseAction:{
      type:Function
    },
  },
  watch: { 
    openmodal: function(isOpen) {
      if (!isOpen){
        this.$emit("modal-close");
        if (this.onCloseAction){
          this.onCloseAction();
        }
      }
    }
  },
  //@click.self="canclose ? openmodal=false : null"
  template: `
  <transition name="modal" :duration="200">
    <div class="modal-mask" v-if="openmodal">
      <div class="modal-wrapper" >
        <div class="modal-container">
          <div>
            <slot name="header"></slot>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>`
});
