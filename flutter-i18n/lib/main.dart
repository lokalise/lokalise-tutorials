import 'package:flutter/material.dart';
import 'package:flutter_i18n_demo/app/my_app.dart';
import 'package:lokalise_flutter_sdk/lokalise_flutter_sdk.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Lokalise.init(
    projectId: 'project id',
    sdkToken: 'sdk token',
    preRelease: true,
  );

  runApp(const MyApp());
}
