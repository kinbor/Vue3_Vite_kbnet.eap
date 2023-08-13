import { routes_all } from '@/router'

function findRouteChilren(routes, routeId) {
  let findRoute = {}
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].meta && routes[i].meta.id === routeId) {
      findRoute = routes[i]
      break
    } else {
      if (routes[i].children && routes[i].children.length > 0) {
        findRoute = findRouteChilren(routes[i].children, routeId)
        if (findRoute && findRoute.meta) {
          break
        }
      }
    }
  }
  return findRoute
}
export function findRoute(routeId) {
  return findRouteChilren(routes_all, routeId)
}

function findRouteAndPathChilren(routes, routeId) {
  let findRoute = {}
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].meta && routes[i].meta.id === routeId) {
      findRoute = routes[i]
      findRoute.routePath = `/${routes[i].path.replace('/', '')}`
      break
    } else {
      if (routes[i].children && routes[i].children.length > 0) {
        findRoute = findRouteAndPathChilren(routes[i].children, routeId)
        if (findRoute && findRoute.meta) {
          findRoute.routePath = `/${routes[i].path.replace('/', '')}${findRoute.routePath}`
          break
        }
      }
    }
  }
  return findRoute
}
export function findRouteAndPath(routeId) {
  return findRouteAndPathChilren(routes_all, routeId, '')
}

function showRouteChildren(routes, mdlRights) {
  for (let i = 0; i < routes.length; i++) {
    // 自己
    if (routes[i].meta) {
      const arRight = mdlRights.find(right => right.Id === routes[i].meta.id)
      if (arRight) {
        routes[i].hidden = routes[i].meta.ohidden
        routes[i].meta.chidden = routes[i].meta.ohidden
      } else {
        routes[i].hidden = true
        routes[i].meta.chidden = true
      }
    }
    // 子集
    if (routes[i].children) {
      showRouteChildren(routes[i].children, mdlRights)
    }
  }
}
export function showRoutes(mdlRights) {
  return showRouteChildren(routes_all, mdlRights)
}

function hasPermission(route, rights) {
  if (route.meta && route.meta.id) {
    return rights.some(right => route.meta.id === right.Id)
  }
  return true
}
function findAccessedRoutesChildren(rights, routes) {
  const accessedRoutes = []
  routes.forEach(route => {
    const tmpItem = { ...route }
    if (hasPermission(tmpItem, rights)) {
      if (tmpItem.children) {
        tmpItem.children = findAccessedRoutesChildren(rights, tmpItem.children)
      }
      accessedRoutes.push(tmpItem)
    }
  })
  return accessedRoutes
}
export function findAccessedRoutes(rights) {
  return findAccessedRoutesChildren(rights, routes_all)
}
