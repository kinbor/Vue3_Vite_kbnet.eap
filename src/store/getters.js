const getters = {
  id: state => state.eap_rights.id,
  name: state => state.eap_rights.name,
  avatar: state => state.eap_rights.avatar,
  isPower: state => state.eap_rights.isPower,
  orgId: state => state.eap_rights.orgId,
  module: state => state.eap_rights.module,
  rights: state => {
    return state.eap_rights.rights.concat(state.product_rights.rights)
  },
  rights_routes: state => {
    return state.eap_rights.routes.concat(state.product_rights.routes)
  },
  product: state => state.product_rights.product
}
export default getters
