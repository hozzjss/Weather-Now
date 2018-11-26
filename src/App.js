import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, StatusBar,Button, StyleSheet } from 'react-native';

// you wanted a review there you have it
// it's not meant as judgment but as a sort of advice

// consider using typescript it's more sophisticated and a plus in my opinion
// you use ES6 features that's nice!

export default class App extends Component {
    // You should use redux or mobx instead,
    // you're gonna work on enterprise software
    // that demands complex state
    state = {
        loading: true,
        userLocation: '',
        wind: '',
        weather: '',
        name: '',
        C: true
      }

      componentDidMount(){
        // for business logic use redux saga or separate the logic
          // into a separate file that has a function that returns a promise
          // that either resolves with the location or rejects with the error
          try{
        navigator.geolocation.getCurrentPosition(position => {  
            fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
            .then(response => response.json())
            .then(result => this.setState({
                loading: false,
                userLocation: result.main,
                wind: result.wind,
                weather: result.weather[0],
                name: result.name
                
            }))
        })
    } catch (err) {
        alert(err)
    }
       }
    

  render() {
        // C is not very helpful as a variable name
      // maybe use a state field which stores the currently selected one between 'F' or 'C'
      const {loading, C} = this.state;
    return (
        // instead of inline styles you should use a separate file for the stylesheets

            <View style={styles.container}>
            <StatusBar hidden/>
                <View style={{justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{color: '#fff', fontSize: 60}}>Weather</Text>
                        <Text style={{color: '#fff', fontSize: 60}}> Now</Text>
                </View>
            {loading ? <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><ActivityIndicator size="large" color={'#9bfb8c'} /></View> :
                        <View style={{alignItems: 'center', justifyContent:'flex-end', flex:1, marginBottom: 100}}>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                            <Image style={{width: 150,height:150}} source={{uri: this.state.weather.icon}}/>    
                        </View>   
                        <Text style={{color: '#fff', fontSize: 30}}>{this.state.name}</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{color: '#fff', fontSize: 30}}>{`Temp :${C ? (this.state.userLocation.temp) : ((9/5)*(this.state.userLocation.temp)+32)}`}</Text>
                            <Button title={C ? "C" : "F"} onPress={()=>this.setState({C: !this.state.C })} />
                        </View>
                        <Text style={{color: '#fff', fontSize: 30}}>{this.state.weather.main}</Text>   
                    </View>
                    
                }
            </View>
    );
  }
}

// it's preferable to use Stylesheet
// like this, with typescript you specify the elements
// it's gonna target too which is super nice
const stylish = StyleSheet.create({

});

const styles = {
  container: {
        flex: 1,
        backgroundColor: '#133337'
  },
  
};
