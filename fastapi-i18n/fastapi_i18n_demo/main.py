from fastapi import FastAPI, Query, Request
from fastapi.responses import JSONResponse
from i18n.utils import (
    detect_best_locale,
    store_locale,
    get_text_direction,
    get_plural_form,
    localize_datetime,
    localize_currency,
    translations,
)
from fastapi_i18n_demo.config import settings

app = FastAPI()


@app.get("/")
def read_root(
    request: Request,
    lang: str = Query(None, title="Language", description="Language code (optional)"),
):
    """
    A simple endpoint that returns a localized greeting message and ensures the preferred language is stored.
    """
    detected_lang = detect_best_locale(request, lang)

    response = JSONResponse(
        {
            "message": translations.get(
                detected_lang, translations[settings.default_locale]
            )["greeting"],
            "direction": get_text_direction(detected_lang),
        }
    )

    return store_locale(response, detected_lang)


@app.get("/messages")
def get_messages(
    request: Request,
    lang: str = Query(None, title="Language", description="Language code (optional)"),
    count: int = Query(1, title="Count", description="Number of messages"),
):
    """
    Returns a localized message with correct pluralization.
    """
    detected_lang = detect_best_locale(request, lang)
    plural_form = get_plural_form(detected_lang, count)
    messages_dict = translations.get(
        detected_lang, translations[settings.default_locale]
    )["messages"]

    message_template = messages_dict.get(plural_form, messages_dict["other"])

    response = JSONResponse(
        {
            "message": message_template.format(count=count),
            "direction": get_text_direction(detected_lang),
        }
    )

    return store_locale(response, detected_lang)


@app.get("/datetime")
def get_localized_datetime(
    request: Request,
    lang: str = Query(None, title="Language", description="Language code (optional)"),
):
    """
    Returns the current datetime formatted according to the given locale.
    """
    detected_lang = detect_best_locale(request, lang)

    response = JSONResponse({"datetime": localize_datetime(detected_lang)})

    return store_locale(response, detected_lang)


@app.get("/currency")
def get_localized_currency(
    request: Request,
    lang: str = Query(None, title="Language", description="Language code (optional)"),
    amount: float = Query(1000.50, title="Amount", description="Monetary amount"),
    currency: str | None = Query(
        None,
        title="Currency",
        description="Currency code (optional, auto-selected if not provided)",
    ),
    currency_digits: bool = Query(
        True,
        title="Currency Digits",
        description="Whether to show decimal places (e.g., JPY has no cents)",
    ),
    format_type: str = Query(
        "standard",
        title="Format Type",
        description="Currency format type: standard, accounting, etc.",
    ),
):
    """
    Returns the given amount formatted as currency based on the requested locale.
    If no currency is provided, the default for that locale is used.
    """
    detected_lang = detect_best_locale(request, lang)

    response = JSONResponse(
        {
            "formatted_currency": localize_currency(
                amount, currency, detected_lang, currency_digits, format_type
            )
        }
    )

    return store_locale(response, detected_lang)
