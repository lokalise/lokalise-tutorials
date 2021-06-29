package controllers

import (
	beego "github.com/beego/beego/v2/server/web"
	"github.com/beego/i18n"
)

type WelcomeController struct {
	beego.Controller // 1
	i18n.Locale // 2
}

// Using cookies /////////////////////////////////////////////////////////
//var i18nCookieSet = false
//////////////////////////////////////////////////////////////////////////


// Using URL arguments ///////////////////////////////////////////////////
//func (welcomeController *WelcomeController) Get() {  // 1
//	welcomeController.Data["langTemplateKey"] = welcomeController.GetString("lang")  // 2
//	welcomeController.TplName = "welcome.tpl"  // 3
//}
//////////////////////////////////////////////////////////////////////////


// Using Accept-Language header //////////////////////////////////////////
//func (welcomeController *WelcomeController) Get() {
//	welcomeController.Data["langTemplateKey"] = welcomeController.Ctx.Request.Header.Get("Accept-Language")  // 1
//	welcomeController.TplName = "welcome.tpl"  // 2
//}
//////////////////////////////////////////////////////////////////////////


// Using cookies /////////////////////////////////////////////////////////
//func (welcomeController *WelcomeController) Get() {
//	if !i18nCookieSet {
//		welcomeController.Ctx.SetCookie("lang_choice", "fr-FR")  // 1
//		i18nCookieSet = true  // 2
//		welcomeController.Ctx.Output.Body([]byte("i18n cookie successfully set!"))  // 3
//	} else {
//		welcomeController.Data["langTemplateKey"] = welcomeController.Ctx.GetCookie("lang_choice")  // 4
//	}
//	welcomeController.TplName = "welcome.tpl"  // 5
//}
//////////////////////////////////////////////////////////////////////////


// How Beego helps to avoid code duplication > Prepare function ////////////
//func (welcomeController *WelcomeController) Post() {  // 1
//	welcomeController.Data["langTemplateKey"] = welcomeController.GetString("lang")  // 2
//	welcomeController.TplName = "welcome.tpl"  // 3
//}

//func (welcomeController *WelcomeController) Prepare() {
//	welcomeController.Data["langTemplateKey"] = welcomeController.GetString("lang")
//	welcomeController.TplName = "welcome.tpl"
//}
//
//func (welcomeController *WelcomeController) Get() {}
//func (welcomeController *WelcomeController) Post() {}
//////////////////////////////////////////////////////////////////////////


// How Beego helps to avoid code duplication > Base controller ///////////
//type WelcomeController struct {
//	BaseController  // 1
//}
//
//func (welcomeController *WelcomeController) ChildPrepare() {  // 2
//	welcomeController.TplName = "welcome.tpl"  // 3
//}
//
//func (welcomeController *WelcomeController) Get() {}
//func (welcomeController *WelcomeController) Post() {}
//////////////////////////////////////////////////////////////////////////