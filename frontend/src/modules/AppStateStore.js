const state = {
  debug: process.env.NODE_ENV !== 'production',
  version: '0.1.0',
  dialogs: [
    'gettingStarted',
    'openDialog',
    'settingDialog',
    'helpDialog',
    'aboutDialog',
    'loading'
  ],
  state: {
    modal: {
      isShown: true,
      gettingStarted: {
        isShown: true
      },
      openDialog: {
        isShown: false
      },
      settingDialog: {
        isShown: false
      },
      helpDialog: {
        isShown: false
      },
      aboutDialog: {
        isShown: false
      },
      loading: {
        isShown: false
      }
    }
  },

  setDialogState (dialogName, bool) {
    if (this.debug) console.log('setDialogState triggered with', dialogName, bool)
    this.state.modal.isShown = bool
    if (bool === true) {
      for (const dialog of this.dialogs) {
        if (dialog !== dialogName) this.state.modal[dialog].isShown = false
        else this.state.modal[dialog].isShown = true
      }
    } else {
      this.state.modal[dialogName].isShown = false
    }
  },

  toggleDialogState (dialogName) {
    if (this.debug) console.log('toggleDialogState triggered with', dialogName)
    if (this.state.modal[dialogName].isShown) {
      this.state.modal.isShown = false
      this.state.modal[dialogName].isShown = false
    } else if (this.state.modal.isShown) {
      for (const dialog of this.dialogs) {
        if (dialog !== dialogName) this.state.modal[dialog].isShown = false
        else this.state.modal[dialog].isShown = true
      }
    } else {
      this.state.modal.isShown = true
      this.state.modal[dialogName].isShown = true
    }
  }
}

export default state
