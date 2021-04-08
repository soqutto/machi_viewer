const state = {
  debug: process.env.NODE_ENV !== 'production',
  state: {
    modal: {
      shown: false,
      gettingStarted: {
        shown: false
      },
      openDialog: {
        shown: false
      },
      settingDialog: {
        shown: false
      },
      helpDialog: {
        shown: false
      },
      aboutDialog: {
        shown: false
      },
      loading: {
        shown: false
      }
    }
  },

  setDialogState (dialogName, bool) {
    if (this.debug) console.log('setDialogState triggered with', dialogName, bool)
    this.state.modal.shown = bool
    this.state.modal[dialogName].shown = bool
  },

  toggleDialogState (dialogName) {
    if (this.debug) console.log('toggleDialogState triggered with', dialogName)
    this.state.modal.shown = !this.state.modal.shown
    this.state.modal[dialogName].shown = !this.state.modal[dialogName].shown
  }
}

export default state
