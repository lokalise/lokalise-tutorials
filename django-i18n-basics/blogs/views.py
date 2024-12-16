from django.shortcuts import render
from django.utils.translation import gettext as _, get_language

def home(request):
    user_language = get_language()  # Fetch the active language
    print(f"Current language: {user_language}")

    return render(request, 'blogs/home.html')  # Render the specific home template