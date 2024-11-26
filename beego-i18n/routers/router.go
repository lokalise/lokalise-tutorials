package routers

import (
	"fmt"
	"log"
	"strings"

	beego "github.com/beego/beego/v2/server/web"
	"github.com/beego/i18n"
	"lokalisebeego/controllers"
)

// init initializes routes and loads localization settings
func init() {
	if err := loadLocalization(); err != nil {
		log.Fatalf("Localization setup failed: %v", err)
	}

	// Set up the default route
	beego.Router("/", &controllers.MainController{})

	beego.Router("/page", &controllers.PageController{})
}

// loadLocalization loads supported languages and locale files
func loadLocalization() error {
	// Get supported languages from app.conf
	langs, err := beego.AppConfig.String("langs")
	if err != nil {
		return fmt.Errorf("failed to load supported languages from app.conf: %w", err)
	}

	langsArr := strings.Split(langs, "|")
	for _, lang := range langsArr {
		// Load locale files for each language
		if err := i18n.SetMessage(lang, "conf/"+lang+".ini"); err != nil {
			return fmt.Errorf("failed to load locale file for %s: %w", lang, err)
		}
	}

	log.Printf("Supported languages loaded: %v", langsArr)
	return nil
}
