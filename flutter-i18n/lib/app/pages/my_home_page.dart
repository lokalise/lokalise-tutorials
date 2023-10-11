import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:i18n_demo/app/widgets/current_locale_widget.dart';
import 'package:i18n_demo/app/widgets/locale_switcher_widget.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(AppLocalizations.of(context)!.welcome),
        actions: const [
          LocaleSwitcherWidget(),
          SizedBox(width: 12),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const CurrentLocaleWidget(),
            Text(AppLocalizations.of(context)!.currentDate(DateTime.now())),
            Text(AppLocalizations.of(context)!.currencyDemo(1234567)),
            Text(AppLocalizations.of(context)!.createdBy('Lokalise')),
            Text(AppLocalizations.of(context)!.pressButton),
            Text(
              AppLocalizations.of(context)!.buttonPressed(_counter),
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
