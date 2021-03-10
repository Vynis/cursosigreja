import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Empower School',
      home: Scaffold(
      body: Padding(
        padding: EdgeInsets.only(top: 30.0),
        child: WebView(
          initialUrl: 'http://igrejadecristobrasil.com.br/app',
          javascriptMode: JavascriptMode.unrestricted,
          // navigationDelegate: (NavigationRequest request) {
          //   if (request.url.startsWith('http')){
              
          //   }
          // },
        ),
        ),
      ),
    );
  }
}
