import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import { PermissionsAndroid } from "react-native";
import { MapView, Location, Geocode ,Initializer } from 'react-native-baidumap-sdk';
import { Geolocation } from "react-native-amap-geolocation";
import Area from "../area";
import AliyunPush from 'react-native-aliyun-push';

//地理编码逆地理编码
// const searchResult = await Geocode.search('海龙大厦')
// const reverseResult = await Geocode.reverse({ latitude: 39, longitude: 113 })
export default class Example extends Component {
    constructor(props) {
        super(props)
        this.state = {
            location: null,
            reverseResult: null,
        }
    }

    componentWillMount() {
        Geolocation.init({
            android: "49af4bf771f819910e67eb9f62a2e090"
        });
        Initializer.init().catch(e => console.error(e))
    }

    async componentDidMount() {
        Geolocation.setOptions({
            interval: 5000,
            distanceFilter: 10,
            reGeocode: true
        })
        Geolocation.addLocationListener(location => {
            this.updateLocationState(location);
            console.log(location);
        }
        )
    }

    componentWillUnmount() {
        Geolocation.stop()
    }

    updateLocationState(location) {
        if (location) {
            location.timestamp = new Date(location.timestamp).toLocaleString();
            this.setState({ location });
            this.reverse(location.latitude,location.longitude);
            console.log(location)
        }
    }

    reverse = async (latitude,longitude) => {
        let reverseResult = await Geocode.reverse({ latitude, longitude });
        this.setState({ reverseResult });
    }

    startLocation = () => {
        Geolocation.start();
    };
    stopLocation = () => {
        Geolocation.stop();
    };
    getLastLocation = async () => {
        this.updateLocationState(await Geolocation.getLastLocation())
    };


    render() {
        return (
            <View>
                <Button title="开始" onPress={this.startLocation} />
                <Text>{JSON.stringify(this.state.location)}</Text>
                {this.state.location ?
                    <View>
                        <Text>latitude</Text>
                        <Text>{this.state.location.latitude}</Text>
                        <Text>longitude</Text>
                        <Text>{this.state.location.longitude}</Text>
                        <Text>province</Text>
                        <Text>{this.state.location.province}</Text>
                        <Text>city</Text>
                        <Text>{this.state.location.city}</Text>
                        <Text>district</Text>
                        <Text>{this.state.location.district}</Text>
                    </View>
                    : null}
                <Text>reverse</Text>
                <Text>{JSON.stringify(this.state.reverseResult)}</Text>
            </View>
        )
    }
}