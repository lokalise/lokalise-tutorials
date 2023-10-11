import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class CurrentLocaleWidget extends StatelessWidget {
  const CurrentLocaleWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final locale = Localizations.localeOf(context);
    return Center(
        child: Text(
      AppLocalizations.of(context)!.currentLocale(locale.toString()),
      style: Theme.of(context).textTheme.headlineMedium,
    ));
  }
}
