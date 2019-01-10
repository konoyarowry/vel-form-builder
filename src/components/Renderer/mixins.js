export default {
  methods: {
    getConfigBtns(h) {
      const that = this
      return this.canConfigure ? [h('div', {
        staticClass: 'config-btns'
      }, [h('el-button', {
        props: {
          type: 'primary',
          plain: true,
          circle: true
        },
        on: {
          click() {
            that.$emit('handleClone', that.index)
          }
        }
      }, [h('svg-icon', {
        props: {
          iconClass: 'vel-fb-clone'
        }
      })]), h('el-button', {
        props: {
          type: 'danger',
          plain: true,
          circle: true
        },
        on: {
          click() {
            that.$emit('handleRemove', that.index)
          }
        }
      }, [h('svg-icon', {
        props: {
          iconClass: 'vel-fb-trash'
        }
      })])])] : []
    },
    getTextTip(h) {
      if (this.options.config.textTip) {
        return h('div', {
          staticClass: 'text-tip'
        }, this.options.config.textTip)
      }
    }
  }
}
