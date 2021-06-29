package controllers

import (
	beego "github.com/beego/beego/v2/server/web"
	"github.com/beego/i18n"
	"time"
)

type DatetimeController struct {
	beego.Controller
	i18n.Locale
}

func (datetimeController *DatetimeController) Get() {
	datetimeController.Data["currentDateTimeKey"] = time.Now()
	datetimeController.TplName = "datetime.tpl"
}
