/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight } from 'react-native';


const colors = ['#414141', '#F06E6E', '#D7D4D3', '#B8E986', '#A1A197', '#E5A2A0', '#CCD2AA']

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super()
    this.state = {
      text: 0
    }
  }

  handleResult = () => {
    const { text } = this.state
    const result = eval(text)
    console.log('result', result, text)
    this.setState({
      text: +parseFloat(result.toPrecision(12))
    })
  }

  handlePress = (val) => {
    const { text } = this.state
    let number = `${text}${val}`
    if (val === '%') {
      number = text * 0.01
    } else if (val === 'x') {
      number = `${text}*`
    } else if (val === '+/-') {
      number = `${text >= 0 ? text * -1 : text * 1}`
    }

    this.setState({
      text: number
    })
  }

  handleClean = () => {
    this.setState({
      text: 0,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.output}>
          <Text style={[styles.countText]}>
            {this.state.text}
          </Text>
        </View>
        <View style={styles.board}>
          <TouchableHighlight
            style={styles.cell}
            onPress={() => this.handleClean()}
          >
            <Text style={styles.operator}>C</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress('+/-')}
          >
            <Text style={styles.operator}>+/-</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress('%')}
          >
            <Text style={styles.operator}>%</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress('/')}
          >
            <Text style={[styles.operator, styles.red]}>/</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(7)}
          >
            <Text style={styles.number}>7</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(8)}
          >
            <Text style={styles.number}>8</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(9)}
          >
            <Text style={styles.number}>9</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress('x')}
          >
            <Text style={[styles.operator, styles.red]}>x</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(4)}
          >
            <Text style={styles.number}>4</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(5)}
          >
            <Text style={styles.number}>5</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(6)}
          >
            <Text style={styles.number}>6</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress('-')}
          >
            <Text style={[styles.operator, styles.red]}>-</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(1)}
          >
            <Text style={styles.number}>1</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(2)}
          >
            <Text style={styles.number}>2</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(3)}
          >
            <Text style={styles.number}>3</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress('+')}
          >
            <Text style={[styles.operator, styles.red]}>+</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress('00')}
          >
            <Text style={styles.number}>00</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress(0)}
          >
            <Text style={styles.number}>0</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.cell}
            onPress={() => this.handlePress('.')}
          >
            <Text style={styles.number}>.</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.result]}
            onPress={() => this.handleResult()}
          >
            <Text style={styles.white}>=</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  output: {
    flex: 4,
    justifyContent: 'flex-end',
    height: 360,
  },
  countText: {
    fontSize: 80,
    color: '#414141',
    textAlign: 'right'
  },
  board: {
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderTopColor: '#D7D4D3',
  },
  cell: {
    alignSelf: 'center',
    marginTop: 30,
    width: '25%',
    height: 50

  },
  operator: {
    fontSize: 36,
    lineHeight: 50,
    textAlign: 'center',
    color: '#414141'
  },
  number: {
    fontSize: 36,
    lineHeight: 50,
    textAlign: 'center',
    color: '#D7D4D3'
  },
  red: {
    color: '#F06E6E'
  },
  result: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#F06E6E'
  },
  white: {
    color: '#fff',
    lineHeight: 50,
    textAlign: 'center',
    fontSize: 30,
  }
});
