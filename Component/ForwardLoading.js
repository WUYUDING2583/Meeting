import React, { Component } from 'react';
import { View } from 'react-native';
import Styles from '../Style';
import Spinner from "react-native-spinkit";

class ForwardLoading extends Component {
    render() {
        return (
            <View style={{
                flexDirection: "row", justifyContent: "center",
                alignItems: "center"
            }}>
                <View style={Styles.icon}>
                    <Spinner size={30} type={'ThreeBounce'}
                        color={Styles.default.backgroundColor} />
                </View>
            </View>
        );
    }
}

export default ForwardLoading;