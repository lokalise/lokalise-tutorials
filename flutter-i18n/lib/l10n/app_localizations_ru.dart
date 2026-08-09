// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Russian (`ru`).
class AppLocalizationsRu extends AppLocalizations {
  AppLocalizationsRu([String locale = 'ru']) : super(locale);

  @override
  String get appTitle => 'Flutter i18n';

  @override
  String get welcome => 'Добро пожаловать!';

  @override
  String createdBy(String company) {
    return 'Руководство от $company';
  }

  @override
  String currentLocale(String locale) {
    return 'Текущая локаль: $locale';
  }

  @override
  String currentDate(DateTime date) {
    final intl.DateFormat dateDateFormat = intl.DateFormat.yMMMMEEEEd(
      localeName,
    );
    final String dateString = dateDateFormat.format(date);

    return 'Сегодня $dateString';
  }

  @override
  String currencyDemo(double value) {
    final intl.NumberFormat valueNumberFormat = intl.NumberFormat.currency(
      locale: localeName,
      name: 'USD',
      decimalDigits: 2,
    );
    final String valueString = valueNumberFormat.format(value);

    return 'Пример цены: $valueString';
  }

  @override
  String get pressButton => 'Нажмите кнопку ниже';

  @override
  String buttonPressed(num count) {
    String _temp0 = intl.Intl.pluralLogic(
      count,
      locale: localeName,
      other: 'Нажата $count раза',
      many: 'Нажата $count раз',
      few: 'Нажата $count раза',
      one: 'Нажата $count раз',
      zero: 'Не было нажатий',
    );
    return '$_temp0';
  }
}
