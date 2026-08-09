import 'package:flutter/material.dart';
import 'package:flutter_i18n_demo/l10n/generated/l10n.dart';
import 'package:flutter_i18n_demo/app/widgets/current_locale_widget.dart';
import 'package:flutter_i18n_demo/app/widgets/locale_switcher_widget.dart';
import 'package:lokalise_flutter_sdk/lokalise_flutter_sdk.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.onLocaleChanged});

  final ValueChanged<Locale> onLocaleChanged;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  bool _isLoadingTranslations = true;

  @override
  void initState() {
    super.initState();
    _updateTranslations();
  }

  Future<void> _updateTranslations() async {
    try {
      await Lokalise.instance.update();
    } finally {
      if (mounted) {
        setState(() {
          _isLoadingTranslations = false;
        });
      }
    }
  }

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(Lt.of(context).welcome),
        actions: [
          LocaleSwitcherWidget(onLocaleChanged: widget.onLocaleChanged),
          const SizedBox(width: 12),
        ],
      ),
      body: _isLoadingTranslations
          ? const Center(child: CircularProgressIndicator())
          : Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(Lt.of(context).currentDate(DateTime.now())),
                  Text(Lt.of(context).currencyDemo(1234567.89)),
                  Text(Lt.of(context).pressButton),
                  Text(
                    Lt.of(context).buttonPressed(_counter),
                    style: Theme.of(context).textTheme.headlineMedium,
                  ),
                  Text(Lt.of(context).createdBy('Lokalise')),
                  const CurrentLocaleWidget(),
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
