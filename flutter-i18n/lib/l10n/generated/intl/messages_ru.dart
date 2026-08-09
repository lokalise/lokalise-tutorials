// DO NOT EDIT. This is code generated via package:intl/generate_localized.dart
// This is a library that provides messages for a ru locale. All the
// messages from the main program should be duplicated here with the same
// function name.
// @dart=2.12
// Ignore issues from commonly used lints in this file.
// ignore_for_file:unnecessary_brace_in_string_interps
// ignore_for_file:prefer_single_quotes,comment_references, directives_ordering
// ignore_for_file:annotate_overrides,prefer_generic_function_type_aliases
// ignore_for_file:unused_import, file_names

import 'package:intl/intl.dart';
import 'package:intl/message_lookup_by_library.dart';

final messages = MessageLookup();

typedef String? MessageIfAbsent(String? messageStr, List<Object>? args);

class MessageLookup extends MessageLookupByLibrary {
  @override
  String get localeName => 'ru';

  static m0(count) =>
      "${Intl.plural(count, zero: 'Не было нажатий', one: 'Нажата ${count} раз', few: 'Нажата ${count} раза', many: 'Нажата ${count} раз', other: 'Нажата ${count} раза')}";

  static m1(company) => "Руководство от ${company}";

  static m2(locale) => "Текущая локаль: ${locale}";

  @override
  final Map<String, dynamic> messages =
      _notInlinedMessages(_notInlinedMessages);

  static Map<String, dynamic> _notInlinedMessages(Object? _) => {
        'appTitle': MessageLookupByLibrary.simpleMessage('Flutter i18n'),
        'buttonPressed': m0,
        'createdBy': m1,
        'currentLocale': m2,
        'pressButton':
            MessageLookupByLibrary.simpleMessage('Нажмите кнопку ниже'),
        'welcome': MessageLookupByLibrary.simpleMessage('Добро пожаловать!')
      };
}
