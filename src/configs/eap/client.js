/**
 * @description 单点登录，如'.aaaaa.com'或'.xxxxx.com|.yyyyy.com|.zzzzz.com'
 */
const eap_cookie_v_sso = ''
/**
 * @description Cookie作用域，默认为空，可以把数据放在.xxxxx.com下，这样xxx.xxxxx.com都可见。
 */
const eap_cookie_v_domain = ''
/**
 * @description 客户端程序类型(web/gui/mobile)
 */
const eap_cookie_v_applicationType = 'web'
/**
 * @description 客户端语言类型(zh_cn|en_us)
 */
const eap_cookie_v_languageType = 'zh_cn'
/**
 * @description 令牌数据
 */
const eap_cookie_f_tokenData = 'kb_token_data'
/**
 * @description 令牌有效时间
 */
const eap_cookie_f_tokenTime = 'kb_token_time'

/**
 * @description 账号所属组织单位ID（默认）
 */
const eap_ls_f_account_org_id = 'kb_user_org_Id'
/**
 * @description 账号所属组织单位ID（默认）
 */
const eap_ls_f_account_org_index = 'kb_user_org_index'
/**
 * @description 账号所属组织单位列表
 */
const eap_ls_f_account_org_list = 'kb_user_org_list'

/**
 * @description 令牌与权限验证无效
 * 0，表示权限验证无效
 * 1，表示令牌验证无效
 */
const eap_msg_f_no_auth_rights = 'kb_msg_f_no_auth_rights'

/**
 * @description 验证码计时器，用于控制验证码发送频率，比如60s内只允许发送一次
 */
const eap_msg_f_timer_msgcode_count = 'kb_msg_f_timer_msgcode_count'

/**
 * @description 登录服务API
 */
const eap_api_f_login = 'Api/EapLogin/Login'

/**
 * @description 是否冻结头部（true|false）
 */
const eap_tool_v_fixedHeader = true
/**
 * @description 亮度(0-100)
 */
const eap_tool_v_light = '100'
/**
 * @description 主题名称
 */
const eap_tool_v_theme = '100'

/**
 * @description 桌面浏览器最小宽度，参考bootstrap
 */
const eap_html_v_desptop_minwidth = 992

/**
 * @description 侧边导航是否ShowLogo
 */
const eap_sidebar_v_showLogo = false
/**
 * @description 侧边导航状态
 */
const eap_sidebar_f_cookie_status = 'kb_sidebar_status'

export default {
  eap_cookie_v_domain,
  eap_cookie_v_sso,
  eap_cookie_f_tokenData,
  eap_cookie_f_tokenTime,
  eap_cookie_v_applicationType,
  eap_cookie_v_languageType,
  eap_ls_f_account_org_id,
  eap_ls_f_account_org_index,
  eap_ls_f_account_org_list,
  eap_msg_f_no_auth_rights,
  eap_msg_f_timer_msgcode_count,
  eap_api_f_login,
  eap_tool_v_fixedHeader,
  eap_tool_v_light,
  eap_tool_v_theme,
  eap_html_v_desptop_minwidth,
  eap_sidebar_f_cookie_status,
  eap_sidebar_v_showLogo
}
