package controllers

import (
	beego "github.com/beego/beego/v2/server/web"
	"github.com/beego/i18n"
)

type BaseController struct {  // 1
	beego.Controller
	i18n.Locale
}

type ChildPrepareHolder interface {  // 2
	ChildPrepare()
}

func (baseController *BaseController) Prepare() {  // 3
	baseController.Data["langTemplateKey"] = baseController.GetString("lang")  // 4

	if app, ok := baseController.AppController.(ChildPrepareHolder); ok {  // 5
		app.ChildPrepare()
	}
}