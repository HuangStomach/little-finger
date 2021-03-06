import 'package:flutter/material.dart';

class Grid extends StatelessWidget {
  @override
  Widget build (BuildContext context) {
    return OrientationBuilder(
      builder: (context, orientation) {
        return GridView.count(
          crossAxisCount: orientation == Orientation.portrait ? 2 : 3,
          children: List.generate(100, (index) {
            return Center(
              child: Container(
                color: Theme.of(context).accentColor,
                child: Text('Item $index', 
                  style: Theme.of(context).textTheme.title,
                ),
              ) 
            );
          }),
        );
      },
    );
  }
}