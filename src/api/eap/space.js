import request from '@/core/network/httpx/eapHttpx'

/**
 * 获取BOX集合根据ID
 */
export function GetBoxListByBoxId(boxId) {
  return request({
    url: '/Api/EapSpace/GetBoxListByBoxId',
    method: 'get',
    params: { boxId }
  })
}
