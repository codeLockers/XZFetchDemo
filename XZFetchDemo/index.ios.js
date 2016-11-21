/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';

import XZFetchHelper from './XZFetchHelper.js'

export default class XZFetchDemo extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      result:''
    };
  }

  _sendGetRequest(){

    let url = 'http://op.juhe.cn/onebox/weather/query'

    let request = XZFetchHelper.get(url,{cityname:'苏州',key:'ed9b4f04b02a265a3684e256c6ff6f22'},(isSuccess,response) => {
      
      console.log(response)
      this.setState({
        result:response.reason
      });
      
    })
  }

  _sendPostRequest(){
    
    let url = 'http://op.juhe.cn/onebox/weather/query'
    let request = XZFetchHelper.post(url,{cityname:'苏州',key:'ed9b4f04b02a265a3684e256c6ff6f22'}, (isSuccess,response) => {
      this.setState({
        result:response.reason
      });
      console.log(response)
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this._sendGetRequest.bind(this)}>
          <View style={{backgroundColor:'red'}}>
            <Text style={{margin:20}}>发送GET请求</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this._sendPostRequest.bind(this)}>
          <View style={{backgroundColor:'blue',marginTop:20}}>
            <Text style={{margin:20}}>发送POST请求</Text>
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={{margin:20}}>{this.state.result}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('XZFetchDemo', () => XZFetchDemo);
