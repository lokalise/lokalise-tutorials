from django.shortcuts import render
from django.utils.translation import ngettext, gettext as _
from django.utils.timezone import localtime, now
from django.utils.formats import date_format
from django.utils.timezone import activate
from django.utils.translation import pgettext

def home(request):
    message_count = 1

    message = ngettext(
        "You have %(count)s message.",        # Singular form
        "You have %(count)s messages.",       # Plural form
        message_count
    ) % {'count': message_count}

    print(message)

    current_time = localtime(now())
    formatted_date = date_format(current_time, use_l10n=True)
    print(formatted_date)

    user_timezone = 'Europe/Riga'
    activate(user_timezone)

    file_noun = pgettext("noun", "File")
    print(file_noun)

    # Context for "File" as a verb
    file_verb = pgettext("verb", "File")
    print(file_verb)

    return render(request, 'blogs/home.html', {"message_count": message_count, "current_time": now()})