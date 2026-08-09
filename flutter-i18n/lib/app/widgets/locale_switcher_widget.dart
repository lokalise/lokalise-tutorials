import 'package:flutter/material.dart';
import 'package:flutter_i18n_demo/l10n/generated/l10n.dart';

class LocaleSwitcherWidget extends StatelessWidget {
  const LocaleSwitcherWidget({super.key, required this.onLocaleChanged});

  final ValueChanged<Locale> onLocaleChanged;

  @override
  Widget build(BuildContext context) {
    final currentLocale = Localizations.localeOf(context);

    return DropdownButtonHideUnderline(
      child: DropdownButton<Locale>(
        value: currentLocale,
        items: Lt.supportedLocales.map((locale) {
          return DropdownMenuItem<Locale>(
            value: locale,
            child: Text(locale.toLanguageTag()),
          );
        }).toList(),
        onChanged: (locale) {
          if (locale != null) {
            onLocaleChanged(locale);
          }
        },
      ),
    );
  }
}
