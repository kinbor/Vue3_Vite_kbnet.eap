import request from '@/core/network/httpx/eapHttpx'

/**
 * 验证码获取
 */
export function captcha_get() {
  return request({
    url: '/Api/EapCaptcha/SlideImage',
    method: 'get'
  })
}
/**
 * 验证码校验
 */
export function captcha_verify(data) {
  return request({
    url: '/Api/EapCaptcha/Verify',
    method: 'post',
    data
  })
}
/**
 * 获取加密公钥
 */
export function encrypt_get() {
  return request({
    url: '/Api/EapLogin/EncryptCode',
    method: 'get'
  })
}
/**
 * 登录系统
 */
export function login(data) {
  return request({
    url: '/Api/EapLogin/Login',
    method: 'post',
    data
  })
}
/**
 * 登出系统
 */
export function logout() {
  return request({
    url: '/Api/EapLogin/Logout',
    method: 'get'
  })
}
/**
 * 验证码发送
 * receiverCode：邮箱或手机号
 * captchaId：拼图验证码Id
 * isMobile：是否移动端
 */
export function findPwd_code(receiverCode, captchaId, isMobile) {
  return request({
    url: '/Api/EapLogin/FindPwd_Code',
    method: 'get',
    params: { receiverCode, captchaId, isMobile }
  })
}
/**
 * 验证码校验
 * fid：唯一编码，用于后台比对
 * code：邮箱或手机短信接收的验证码
 */
export function findPwd_verify(fid, code) {
  return request({
    url: '/Api/EapLogin/FindPwd_Verify',
    method: 'get',
    params: { fid, code }
  })
}
/**
 * 重新设置新密码
 * fid：唯一编码，用于后台比对
 * encryptId：加密密钥ID
 * newPwd：新密码
 */
export function findPwd_reset(fid, encryptId, newPwd) {
  return request({
    url: '/Api/EapLogin/FindPwd_Reset',
    method: 'get',
    params: { fid, encryptId, newPwd }
  })
}
/**
 * 令牌刷新，开启自动续约模式，避免长时间不操作令牌失效
 */
export function tokenRefresh() {
  return request({ url: '/Api/FALogin/Refresh', method: 'get' })
}
