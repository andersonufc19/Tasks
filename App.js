import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import commonStyle from './src/commonStyle'
import Agenda from './src/screens/Agenda'

export default class App extends Component {
  render(){
    return (
      <>
        <StatusBar barStyle = 'dark-content' backgroundColor = '#256eff'/> 
        <Agenda/>
      </>
    );
  }
}

