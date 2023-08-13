import request from '@/core/network/httpx/eapHttpx'

/**
 * 依据组织机构ID和模块ID获取用户信息
 * orgId：组织机构ID
 * mdlId：模块ID，空则获取用户默认模块ID
 */
export function getUserInfo(orgId, mdlId) {
  return request({
    url: '/Api/EapAccount/GetInfoByOrgId',
    method: 'get',
    params: { orgId, mdlId }
  })
}
/**
 * 获取用户所属组织机构列表
 */
export function getUserOrgs() {
  return request({
    url: '/Api/EapAccount/GetOrgListByUserId',
    method: 'get'
  })
}
