import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// EAP
import eap_app from './modules/eap/app'
import eap_account from './modules/eap/account'
import eap_login from './modules/eap/login'
import eap_rights from './modules/eap/rights'
import eap_settings from './modules/eap/settings'
import eap_space from './modules/eap/space'

// Product
import product_rights from './modules/product/rights'

const store = Vuex.createStore({
  mutations,
  actions,
  getters,
  modules: {
    eap_app,
    eap_account,
    eap_login,
    eap_rights,
    eap_settings,
    eap_space,
    product_rights
  }
})

export default store
