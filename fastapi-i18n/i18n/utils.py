from fastapi import Request
from fastapi.responses import JSONResponse
from babel.core import Locale
from babel.dates import format_datetime
from babel.numbers import format_currency
from datetime import datetime
import json
import os
from fastapi_i18n_demo.config import settings

DEFAULT_CURRENCIES = {
    "en": "USD",
    "fr": "EUR",
    "he": "ILS",
}

# Load translations dynamically based on config settings
translations = {}

for lang in settings.supported_locales:
    path = os.path.join("locales", lang, "messages.json")
    with open(path, encoding="utf-8") as f:
        translations[lang] = json.load(f)


def store_locale(response: JSONResponse, lang: str) -> JSONResponse:
    """
    Stores the selected locale in a cookie for 30 days.
    """
    response.set_cookie(key="preferred_locale", value=lang, max_age=60 * 60 * 24 * 30)
    return response


def detect_best_locale(request: Request, lang: str | None) -> str:
    """
    Determines the user's preferred locale by checking:
    1. Query parameter (`?lang=xx`)
    2. Stored cookie (`preferred_locale`)
    3. Accept-Language header
    4. Default locale (fallback)
    """
    if lang and lang in settings.supported_locales:
        return lang

    preferred_locale = request.cookies.get("preferred_locale")
    if preferred_locale and preferred_locale in settings.supported_locales:
        return preferred_locale

    accept_language = request.headers.get("Accept-Language", "")
    parsed_languages = [tag.split("-")[0] for tag in accept_language.split(",")]

    for detected_lang in parsed_languages:
        if detected_lang in settings.supported_locales:
            return detected_lang

    return settings.default_locale


def localize_currency(
    amount: float,
    currency_code: str | None,
    lang: str,
    currency_digits: bool = True,
    format_type: str = "standard",
) -> str:
    """
    Formats a given amount into the correct currency format for a given locale.
    If no currency code is provided, a default is selected based on the locale.
    """
    try:
        locale = lang
        if not currency_code:
            currency_code = DEFAULT_CURRENCIES.get(lang[:2], "USD")

        return format_currency(
            amount,
            currency_code,
            locale=locale,
            currency_digits=currency_digits,
            format_type=format_type,
        )
    except Exception:
        return f"{amount} {currency_code or 'USD'}"


def localize_datetime(lang: str) -> str:
    """
    Returns the current datetime formatted according to the given locale.
    """
    try:
        locale = Locale.parse(lang)
        now = datetime.now()
        return format_datetime(now, locale=locale)
    except Exception:
        return str(datetime.now())


def get_text_direction(lang: str) -> str:
    """
    Determines if a language is Right-to-Left (RTL) or Left-to-Right (LTR).
    """
    rtl_languages = {"ar", "he", "fa", "ur"}
    return "rtl" if lang in rtl_languages else "ltr"


def get_plural_form(lang: str, count: int) -> str:
    """
    Determines the correct pluralization form using Babel's Locale class.
    """
    try:
        locale = Locale.parse(lang)
        return locale.plural_form(count)
    except Exception:
        return "other"
