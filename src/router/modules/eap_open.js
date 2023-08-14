import product_open from '@/router/modules/product_open'

let route_open = ['/login', '/findPwd', '/resetPwd']

route_open = route_open.concat(product_open)

export default {
  route_open
}
