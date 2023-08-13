import request from '@/core/network/httpx/eapHttpx'

/**
 * 设置工具栏项
 * itemKey：名称
 * itemValue：数据
 */
export function toolSet(itemKey, itemValue) {
  return request({
    url: '/Api/EapSettings/ToolSet',
    method: 'get',
    params: { itemKey, itemValue }
  })
}
