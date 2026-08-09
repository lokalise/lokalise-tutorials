// GENERATED CODE
//
// After the template files .arb have been changed,
// generate this class by the command in the terminal:
// flutter pub run lokalise_flutter_sdk:gen-lok-l10n
//
// Please see https://pub.dev/packages/lokalise_flutter_sdk

// ignore_for_file: non_constant_identifier_names, lines_longer_than_80_chars
// ignore_for_file: join_return_with_assignment, prefer_final_in_for_each
// ignore_for_file: avoid_redundant_argument_values, avoid_escaping_inner_quotes
// ignore_for_file: depend_on_referenced_packages

import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart';
import 'package:lokalise_flutter_sdk/lokalise_flutter_sdk.dart';
import 'intl/messages_all.dart';

class Lt {
  Lt._internal();

  static const LocalizationsDelegate<Lt> delegate = _AppLocalizationDelegate();

  static const List<Locale> supportedLocales = [
    Locale.fromSubtags(languageCode: 'en'),
    Locale.fromSubtags(languageCode: 'ru'),
  ];

  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
        delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ];

  static final Map<String, List<String>> _metadata = {
    'appTitle': [],
    'welcome': [],
    'createdBy': ['company'],
    'currentLocale': ['locale'],
    'currentDate': ['date'],
    'currencyDemo': ['value'],
    'pressButton': [],
    'buttonPressed': ['count'],
  };

  static Future<Lt> load(Locale locale) {
    final name = (locale.countryCode?.isEmpty ?? false)
        ? locale.languageCode
        : locale.toString();
    final localeName = Intl.canonicalizedLocale(name);
    Lokalise.instance.metadata = _metadata;

    return initializeMessages(localeName).then((_) {
      Intl.defaultLocale = localeName;
      final instance = Lt._internal();
      return instance;
    });
  }

  static Lt of(BuildContext context) {
    final instance = Localizations.of<Lt>(context, Lt);
    assert(
      instance != null,
      'No instance of Lt present in the widget tree. Did you add Lt.delegate in localizationsDelegates?',
    );
    return instance!;
  }

  /// `Flutter i18n`
  String get appTitle {
    return Intl.message(
      'Flutter i18n',
      name: 'appTitle',
      desc: 'Main application title',
      args: [],
    );
  }

  /// `Welcome!`
  String get welcome {
    return Intl.message('Welcome!', name: 'welcome', desc: '', args: []);
  }

  /// `Tutorial by {company}`
  String createdBy(String company) {
    return Intl.message(
      'Tutorial by $company',
      name: 'createdBy',
      desc: 'Tutorial attribution',
      args: [company],
    );
  }

  /// `Current locale: {locale}`
  String currentLocale(String locale) {
    return Intl.message(
      'Current locale: $locale',
      name: 'currentLocale',
      desc: 'Currently active app locale',
      args: [locale],
    );
  }

  /// `Today is {date}`
  String currentDate(DateTime date) {
    final DateFormat dateDateFormat = DateFormat.yMMMMEEEEd(
      Intl.getCurrentLocale(),
    );
    final String dateString = dateDateFormat.format(date);

    return Intl.message(
      'Today is $dateString',
      name: 'currentDate',
      desc: 'Displays the current date',
      args: [dateString],
    );
  }

  /// `Demo price: {value}`
  String currencyDemo(double value) {
    final NumberFormat valueNumberFormat = NumberFormat.currency(
      locale: Intl.getCurrentLocale(),
      name: 'USD',
      decimalDigits: 2,
    );
    final String valueString = valueNumberFormat.format(value);

    return Intl.message(
      'Demo price: $valueString',
      name: 'currencyDemo',
      desc: 'Displays a localized currency value',
      args: [valueString],
    );
  }

  /// `Press the button below`
  String get pressButton {
    return Intl.message(
      'Press the button below',
      name: 'pressButton',
      desc: '',
      args: [],
    );
  }

  /// `{count, plural, =0{Not pressed yet} one{Pressed {count} time} other{Pressed {count} times}}`
  String buttonPressed(num count) {
    return Intl.plural(
      count,
      zero: 'Not pressed yet',
      one: 'Pressed $count time',
      other: 'Pressed $count times',
      name: 'buttonPressed',
      desc: 'Shows how many times the button has been pressed',
      args: [count],
    );
  }
}

class _AppLocalizationDelegate extends LocalizationsDelegate<Lt> {
  const _AppLocalizationDelegate();

  @override
  bool isSupported(Locale locale) => Lt.supportedLocales.any(
    (supportedLocale) => supportedLocale.languageCode == locale.languageCode,
  );

  @override
  Future<Lt> load(Locale locale) => Lt.load(locale);

  @override
  bool shouldReload(_AppLocalizationDelegate old) => false;
}
