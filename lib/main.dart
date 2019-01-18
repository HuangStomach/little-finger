import 'package:flutter/material.dart';
import 'words.dart';

void main() => runApp(App());

class App extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: new ThemeData(
        primaryColor: Colors.white
      ),
      home: Words()
    );
  }
}
