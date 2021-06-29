package routers

import (
	"BeegoI18n/controllers"
	"fmt"
	beego "github.com/beego/beego/v2/server/web"
	"github.com/beego/i18n"
	"strings"
)

func init() {
    beego.Router("/", &controllers.MainController{})
	beego.Router("/welcome", &controllers.WelcomeController{})
    beego.Router("/thanks", &controllers.ThanksController{})
    beego.Router("/datetime", &controllers.DatetimeController{})

	langs, err := beego.AppConfig.String("langs")  // 1
	if err != nil {  // 2
		fmt.Println("Failed to load languages from the app.conf")
		return
	}

	langsArr := strings.Split(langs, "|")  // 3

	for _, lang := range langsArr {  // 4
		if err := i18n.SetMessage(lang, "conf/"+lang+".ini"); err != nil {  // 5
			fmt.Println("Failed to set message file for l10n")
			return
		}
	}
}
