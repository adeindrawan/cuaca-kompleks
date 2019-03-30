import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableHighlight, Keyboard, console, ActivityIndicator, NetInfo } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


export default class AppWeatherAsync1715051112 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      kota: '',
      isConnected: true,
      forecast: {
        main: '',
        description: '',
        temp: '',
        sunrise: '',
        sunset: '',
        pressure: '',
        humidity: '',
        sea_level: '',
        grnd_level: '',
        speed: '',
        cod: '',
        isLoading: false
      }
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }
  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      alert("Oops!! No Internet Connection Available");
      this.setState({ isConnected });
    }
  };

  loadingCheck() {
    if (this.state.forecast.isLoading) {
      return (<ActivityIndicator size="small" color="white" />);
    } else {
      return (<Text style={{ color: 'blue' }}>View</Text>);
    }
  }

  async getWeather() {
    if (!this.state.kota) {
      alert("Input Form is Blank!")
      return
    }
    let url = 'http://api.openweathermap.org/data/2.5/weather?q='
      + this.state.kota +
      '&appid=8f1ec5b4fea4be19610e658b2e11d301&units=metric';
    await fetch(url).then(async (response) => await response.json())
      .then((responseJson) => {
        this.setState({
          forecast: {
            cod: responseJson.cod,
            isLoading: true
          }
        }, async () => {
          let code = this.state.forecast.cod
          if (code == '404') {
            alert("There's No City!")
            this.setState({
              forecast: {
                isLoading: false
              }
            })
          } else {
            await fetch(url)
              .then(async (response) => await response.json())
              .then((responseJson) => {
                this.setState({
                  forecast: {
                    main: responseJson.weather[0].main,
                    description: responseJson.weather[0].description,
                    temp: responseJson.main.temp,
                    sunrise: responseJson.sys.sunrise,
                    sunset: responseJson.sys.sunset,
                    pressure: responseJson.main.pressure,
                    humidity: responseJson.main.humidity,
                    sea_level: responseJson.main.sea_level,
                    grnd_level: responseJson.main.grnd_level,
                    speed: responseJson.wind.speed,
                    isLoading: false
                  }
                })
              });
          }
        })
      })
      .catch((error) => {
        console.log("API Call Error!");
        alert(error.message);
      });
  }


  render() {
    return (
      <View style={styles.containerMain}>
        <View style={styles.statusbar}></View>
        <View style={{
          flex: 1,
          backgroundColor: '#3C7D26',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>
          <Text style={{
            color: 'white',
            fontSize: 30,
            fontWeight:'bold'
          }}>Prakiraan Cuaca app</Text>
        </View>
        <View style={{
          flex: 2,
          backgroundColor: '#57973F',
          margin: 10,
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>
          <Text style={{
            color: 'white',
            fontSize: 25
          }}>input city</Text>
          <TextInput style={{
            backgroundColor: 'white',
            borderWidth: 1,
            width: 250,
            height: 30,
            borderRadius: 5,
            padding: 5
          }}
            onChangeText={(kota) => this.setState({ kota })}
            placeholder="write this" />
          <TouchableHighlight
            style={{ backgroundColor: '#57973F', width: 100, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10, }}
            underlayColor='#3C7D26'
            onPress={
              () => {
                this.getWeather();
                Keyboard.dismiss();
              }
            }
          >
            {this.loadingCheck()}
          </TouchableHighlight>
        </View>
        <View style={{
          flex: 5,
          backgroundColor: '#03771E',
          margin: 10,
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>
          <View style={{
            flex: 1,
            flexDirection: 'row'
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={styles.cuacaIcon}>
                <Icon name="ios-thermometer" size={40}></Icon>
              </View>
              <View style={styles.cuaca}>
                <Text>Temp: {"\n"}{this.state.forecast.temp}</Text>
              </View>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={styles.cuacaIcon}>
                <Icon name="ios-leaf" size={40}></Icon>
              </View>
              <View style={styles.cuaca}>
                <Text>Wind Speed: {"\n"}{this.state.forecast.speed}</Text>
              </View>
            </View>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row'
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={styles.cuacaIcon}>
                <Icon name="ios-partly-sunny" size={40}></Icon>
              </View>
              <View style={styles.cuaca}>
                <Text>Main: {"\n"}{this.state.forecast.main}</Text>
              </View>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={styles.cuacaIcon}>
                <Icon name="ios-cloudy-night" size={40}></Icon>
              </View>
              <View style={styles.cuaca}>
                <Text>Main Desc: {"\n"}{this.state.forecast.description}</Text>
              </View>
            </View>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row'
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={styles.cuacaIcon}>
                <Icon name="ios-sunny" size={40}></Icon>
              </View>
              <View style={styles.cuaca}>
                <Text>Sunrise: {"\n"}{this.state.forecast.sunrise}</Text>
              </View>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={styles.cuacaIcon}>
                <Icon name="ios-moon" size={40}></Icon>
              </View>
              <View style={styles.cuaca}>
                <Text>Sunset: {"\n"}{this.state.forecast.sunset}</Text>
              </View>
            </View>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row'
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={styles.cuacaIcon}>
                <Icon name="ios-speedometer" size={40}></Icon>
              </View>
              <View style={styles.cuaca}>
                <Text>Pressure: {"\n"}{this.state.forecast.pressure}</Text>
              </View>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={styles.cuacaIcon}>
                <Icon name="ios-water" size={40}></Icon>
              </View>
              <View style={styles.cuaca}>
                <Text>Humidity: {"\n"}{this.state.forecast.humidity}</Text>
              </View>
            </View>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row'
          }}>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={styles.cuacaIcon}>
                <Icon name="ios-pulse" size={40}></Icon>
              </View>
              <View style={styles.cuaca}>
                <Text>Sea Level: {"\n"}{this.state.forecast.sea_level}</Text>
              </View>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row'
            }}>
              <View style={styles.cuacaIcon}>
                <Icon name="ios-funnel" size={40}></Icon>
              </View>
              <View style={styles.cuaca}>
                <Text>Ground Level: {"\n"}{this.state.forecast.grnd_level}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{
          flex: 1,
          backgroundColor: '#03771E',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>
          <Text style={{ color: 'black', fontWeight:'bold'}}>Copyright@ADE23</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#D2E5CA'
  },

  statusbar: {
    height: 24,
    backgroundColor: '#3C7D26'
  },

  cuaca: {
    flex: 2,
    backgroundColor: 'white',
    margin: 5,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 10
  },

  cuacaIcon: {
    flex: 1,
    backgroundColor: '#B5D4A7',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  cuacaLay: {
    flex: 1,
    flexDirection: 'row'
  }
})