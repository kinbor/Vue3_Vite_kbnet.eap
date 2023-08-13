import request from '@/core/network/httpx/productHttpx'

/**
 * 依据组织机构ID和模块ID获取用户信息
 * productId：产品ID
 * userId：用户ID
 * orgId：组织机构ID
 */
export function GetRightsById(productId, userId, orgId) {
  return request({
    url: '/Api/ProductApp/GetRightsById',
    method: 'get',
    params: { productId, userId, orgId }
  })
}
