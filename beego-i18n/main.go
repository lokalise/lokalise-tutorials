package main

import (
	_ "lokalisebeego/routers"

	beego "github.com/beego/beego/v2/server/web"
	"github.com/beego/i18n"
	"golang.org/x/text/currency"
)

func main() {
	// Register the i18n function for templates
	beego.AddFuncMap("i18n", i18n.Tr)

	// Datetime l10n
	beego.AddFuncMap("datetimefmt", beego.Date)

	// Localize currency
	beego.AddFuncMap("formatCurrency", formatCurrency)

	// Start the Beego application
	beego.Run()
}

// formatCurrency localizes a currency value based on the language
func formatCurrency(lang string, amount float64) currency.Amount {
	var currencyUnit currency.Unit

	switch lang {
	case "en-US":
		currencyUnit = currency.USD
	case "fr-FR":
		currencyUnit = currency.EUR
	default:
		currencyUnit = currency.USD
	}

	return currencyUnit.Amount(amount)
}
