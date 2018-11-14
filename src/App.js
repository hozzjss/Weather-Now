import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, StatusBar,Button } from 'react-native';


export default class App extends Component {
    
    state = {
        loading: true,
        userLocation: '',
        wind: '',
        weather: '',
        name: '',
        C: true
      }

      componentDidMount(){
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
      const {loading, C} = this.state;
    return (
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

const styles = {
  container: {
        flex: 1,
        backgroundColor: '#133337'
  },
  
};
