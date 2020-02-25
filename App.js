import React from 'react';
import {StyleSheet, View, processColor} from 'react-native';

import {LineChart} from 'react-native-charts-wrapper';
import update from 'immutability-helper';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.values = [
      {x: 0, y: 3},
      {x: 1, y: 6},
      {x: 2, y: 9},
      {x: 3, y: 12},
    ];
    this.values2 = [
      {x: 0, y: 3},
      {x: 1, y: 6},
      {x: 2, y: 9},
      {x: 3, y: 12},
    ];
    this.values3 = [
      {x: 0, y: 3},
      {x: 1, y: 6},
      {x: 2, y: 9},
      {x: 3, y: 12},
    ];
  }

  componentDidMount() {
    setInterval(() => {
      let newVal = this.filter(this.values[this.values.length - 1].y);
      let newX = this.values.length;

      let vals = update(this.values, {
        $push: [
          {x: newX, y: newVal},
          {x: newX + 1, y: newVal + 5},
        ],
      });

      let vals2 = update(this.values2, {
        $push: [
          {x: newX, y: newVal * 2},
          {x: newX + 1, y: (newVal + 5) * 2},
        ],
      });

      let vals3 = update(this.values3, {
        $push: [
          {x: newX, y: newVal + newVal * 2},
          {x: newX + 1, y: newVal + 5 + (newVal + 5) * 2},
        ],
      });

      if (!this.chartRef) {
        return;
      }

      this.chartRef.addEntries([
        {
          index: 0,
          values: [
            {x: newX, y: newVal},
            {x: newX + 1, y: newVal + 5},
          ],
        },
        {
          index: 1,
          values: [
            {x: newX, y: newVal * 2},
            {x: newX + 1, y: (newVal + 5) * 2},
          ],
        },
        {
          index: 2,
          values: [
            {x: newX, y: newVal + newVal * 2},
            {x: newX + 1, y: newVal + 5 + (newVal + 5) * 2},
          ],
        },
      ]);
      this.values = vals;
      this.values2 = vals2;
      this.values3 = vals3;
    }, 17);
  }

  filter(val) {
    return Math.cos(val) * 10;
  }

  render() {
    return (
      <View style={styles.container}>
        <LineChart
          ref={ref => (this.chartRef = ref)}
          style={styles.chart}
          xAxis={{granularityEnabled: true, granularity: 1}}
          data={{
            dataSets: [
              {
                label: 'demo',
                values: this.values,
                config: {
                  drawCircles: false,
                  drawValues: false,
                  colors: [processColor('red')],
                },
              },
              {
                label: 'demo2',
                values: this.values2,
                config: {
                  drawCircles: false,
                  drawValues: false,
                  colors: [processColor('green')],
                },
              },

              {
                label: 'demo3',
                values: this.values3,
                config: {
                  drawCircles: false,
                  drawValues: false,
                  colors: [processColor('black')],
                },
              },
            ],
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});
