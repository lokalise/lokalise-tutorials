import 'package:flutter/material.dart';
import 'package:flutter_i18n_demo/l10n/generated/l10n.dart';

class CurrentLocaleWidget extends StatelessWidget {
  const CurrentLocaleWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final locale = Localizations.localeOf(context);

    return Text(
      Lt.of(context).currentLocale(locale.toLanguageTag()),
      style: Theme.of(context).textTheme.headlineMedium,
    );
  }
}
