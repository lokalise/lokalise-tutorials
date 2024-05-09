import gettext
import sys

gettext.bindtextdomain("messages", "locales")

gettext.textdomain("messages")

locale = sys.argv[1] if len(sys.argv) > 1 else "en"

try:
    lang = gettext.translation("messages", localedir="locales", languages=[locale])
except FileNotFoundError as e:
    print("Error while trying to load translations:\n", e)
    sys.exit(1)

lang.install()

_ = lang.gettext
ngettext = lang.ngettext

def main():
    count = int(sys.argv[2]) if len(sys.argv) > 2 else 5

    print(
        ngettext("There is one apple", "There are %(num)d apples", count)
        % {"num": count}
    )
    
    print(_("Hello, world!"))


if __name__ == "__main__":
    main()