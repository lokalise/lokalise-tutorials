// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get appTitle => 'Flutter i18n';

  @override
  String get welcome => 'Welcome!';

  @override
  String createdBy(String company) {
    return 'Tutorial by $company';
  }

  @override
  String currentLocale(String locale) {
    return 'Current locale: $locale';
  }

  @override
  String currentDate(DateTime date) {
    final intl.DateFormat dateDateFormat = intl.DateFormat.yMMMMEEEEd(
      localeName,
    );
    final String dateString = dateDateFormat.format(date);

    return 'Today is $dateString';
  }

  @override
  String currencyDemo(double value) {
    final intl.NumberFormat valueNumberFormat = intl.NumberFormat.currency(
      locale: localeName,
      name: 'USD',
      decimalDigits: 2,
    );
    final String valueString = valueNumberFormat.format(value);

    return 'Demo price: $valueString';
  }

  @override
  String get pressButton => 'Press the button below';

  @override
  String buttonPressed(num count) {
    String _temp0 = intl.Intl.pluralLogic(
      count,
      locale: localeName,
      other: 'Pressed $count times',
      one: 'Pressed $count time',
      zero: 'Not pressed yet',
    );
    return '$_temp0';
  }
}
