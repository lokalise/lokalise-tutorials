package controllers

//type ThanksController struct {
//	beego.Controller // 1
//	i18n.Locale // 2
//}

// (Before introducing a base controller) /////////////////////////////////
//func (thanksController *ThanksController) Prepare() {
//	thanksController.Data["langTemplateKey"] = thanksController.GetString("lang")
//	thanksController.TplName = "thanks.tpl"
//}

//func (thanksController *ThanksController) Get() {}
//func (thanksController *ThanksController) Post() {}
///////////////////////////////////////////////////////////////////////////


// (After introducing a base controller)  /////////////////////////////////
type ThanksController struct {
	BaseController
}

func (thanksController *ThanksController) ChildPrepare() {
	thanksController.TplName = "thanks.tpl"
}

func (thanksController *ThanksController) Get() {}
func (thanksController *ThanksController) Post() {}
//////////////////////////////////////////////////////////////////////////

