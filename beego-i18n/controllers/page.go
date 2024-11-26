package controllers

import (
	"strings"
	"time"

	"github.com/beego/beego/v2/server/web"
	"github.com/beego/i18n"
)

type PageController struct {
	web.Controller // Embeds Beego's base controller
	i18n.Locale    // Embeds i18n.Locale for localization support
}

// Prepare handles common logic for determining the user's language
func (p *PageController) Prepare() {
	// Start with the "lang" query parameter
	lang := p.GetString("lang")

	// If query parameter is missing or invalid, fall back to the "lang_choice" cookie
	if lang == "" || !isSupportedLanguage(lang) {
		lang = p.Ctx.GetCookie("lang_choice")
	}

	// If the cookie is missing or invalid, fall back to the Accept-Language header
	if lang == "" || !isSupportedLanguage(lang) {
		lang = parseAcceptLanguageHeader(p.Ctx.Request.Header.Get("Accept-Language"))
	}

	// Default to English if no valid language is determined
	if lang == "" {
		lang = "en-US"
	}

	// Save the determined language in a cookie for future requests
	p.Ctx.SetCookie("lang_choice", lang, 3600, "/") // Cookie expires in 1 hour

	// Store the language in the Data map for use in templates
	p.Data["lang"] = lang

	p.Data["amount"] = 1234.56 // Example amount

	p.Data["currentDateTime"] = time.Now()
}

// Get handles GET requests by rendering the template
func (p *PageController) Get() {
	p.TplName = "page.tpl"
}

// Post handles POST requests by rendering the template
func (p *PageController) Post() {
	p.TplName = "page.tpl"
}

// isSupportedLanguage checks if the given language is supported
func isSupportedLanguage(lang string) bool {
	supportedLanguages := []string{"en-US", "fr-FR"}
	for _, supportedLang := range supportedLanguages {
		if lang == supportedLang {
			return true
		}
	}
	return false
}

// parseAcceptLanguageHeader parses the Accept-Language header and returns the first supported language
func parseAcceptLanguageHeader(header string) string {
	languages := strings.Split(header, ",")
	for _, lang := range languages {
		lang = strings.TrimSpace(lang)
		if isSupportedLanguage(lang) {
			return lang
		}
	}
	return ""
}
