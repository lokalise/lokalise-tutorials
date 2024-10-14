package main

import (
	"encoding/json"
	"fmt"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"golang.org/x/text/language"
	"net/http"
	"time"
)

var localizer *i18n.Localizer // Global localizer
var bundle *i18n.Bundle       // Global bundle

func init() {
	bundle = i18n.NewBundle(language.English) // Default language

	bundle.RegisterUnmarshalFunc("json", json.Unmarshal) // Register JSON unmarshal function
	bundle.LoadMessageFile("resources/en.json")          // Load English messages
	bundle.LoadMessageFile("resources/fr.json")          // Load French messages

	localizer = i18n.NewLocalizer(bundle, language.English.String(), language.French.String()) // Initialize localizer

	http.HandleFunc("/setlang/", SetLangPreferences) // Register handler
	http.HandleFunc("/localize/", Localize)          // Register localization handler
	http.ListenAndServe(":8080", nil)                // Start server on port 8080
}

func Localize(responseWriter http.ResponseWriter, request *http.Request) {
	valToLocalize := request.URL.Query().Get("msg")
	name := request.URL.Query().Get("name")

	// Singular case
	translationOne, _ := localizer.Localize(&i18n.LocalizeConfig{
		MessageID: valToLocalize,
		TemplateData: map[string]interface{}{
			"Name":  name,
			"Count": 1,
		},
		PluralCount: 1, // Triggers the "one" form
	})
	fmt.Fprintln(responseWriter, translationOne)

	// Plural case
	translationMany, _ := localizer.Localize(&i18n.LocalizeConfig{
		MessageID: valToLocalize,
		TemplateData: map[string]interface{}{
			"Name":  name,
			"Count": 2,
		},
		PluralCount: 2, // Triggers the "other" form
	})
	fmt.Fprintln(responseWriter, translationMany)

	currentTime := time.Now()
	formattedTime := currentTime.Format("15:04:05 Mon 2 Jan 2006")
	fmt.Fprintln(responseWriter, "Formatted current date-time is:", formattedTime)

	// valToLocalize := request.URL.Query().Get("msg")
	// userName := request.URL.Query().Get("username")

	// localizeConfig := i18n.LocalizeConfig{
	// 	MessageID: valToLocalize,
	// 	TemplateData: map[string]string{
	// 		"Name": userName,
	// 	},
	// }

	// localization, _ := localizer.Localize(&localizeConfig)
	// fmt.Fprintln(responseWriter, localization)
}

func SetLangPreferences(_ http.ResponseWriter, request *http.Request) {
	lang := request.FormValue("lang")                   // Get "lang" parameter from form
	accept := request.Header.Get("Accept-Language")     // Get "Accept-Language" header
	localizer = i18n.NewLocalizer(bundle, lang, accept) // Create new localizer
}

func main() {
	localizeConfigWelcome := i18n.LocalizeConfig{
		MessageID: "welcome",
	}

	localizationUsingJson, _ := localizer.Localize(&localizeConfigWelcome)
	fmt.Println(localizationUsingJson)
}
