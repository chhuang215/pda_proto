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
      type: [Boolean, String],
      default: false
    }
  },
  watch: { 
    openmodal: function(open) {
      if (!open){
        this.$emit("modal-close");
      }
    }
  },
  //@click.self="canclose ? openmodal=false : null"
  template: `
  <transition name="modal" :duration="200">
    <div class="modal-mask" v-if="openmodal">
      <div class="modal-wrapper" >
        <div class="modal-container">
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
