import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Styles from "../Style";
import Spinner from "react-native-spinkit";

let ButtonLoading = (props) => {
    return (
        <View>
            <View style={props.background}>
                <Spinner size={props.size?props.size:30} type={'ThreeBounce'}
                    color={props.color ? props.color : "white"}
                    style={props.style} />
            </View>
        </View>
    )
}


export default ButtonLoading;