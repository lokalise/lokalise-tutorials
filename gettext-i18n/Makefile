LOCALES = es fr en
PO_FILES = $(foreach loc,$(LOCALES),locales/$(loc)/LC_MESSAGES/messages.po)
MO_FILES = $(PO_FILES:.po=.mo)

all: $(MO_FILES)

%.mo: %.po
	msgfmt -o $@ $<

update_po:
	xgettext -o locales/messages.pot --keyword=_ --language=Python *.py
	$(foreach po,$(PO_FILES),msgmerge --update $(po) locales/messages.pot;)

clean:
	rm -f locales/*/*/*.mo

.PHONY: all update_po clean