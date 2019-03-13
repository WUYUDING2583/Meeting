import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Styles from '../Style';

class Forward extends Component {
    render() {
        return (
            <View style={{
                flexDirection: "row", justifyContent: "center",
                alignItems: "center", ...(this.props.style)
            }}>
                <Text style={this.props.title ? (this.props.feasible ? Styles.iconTitle : Styles.iconTitleNot) : null}>{this.props.title}</Text>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={this.props.feasible ? Styles.icon : Styles.iconNot}>
                        <Icon name="ios-arrow-forward" size={30}
                            color={Styles.default.backgroundColor} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Forward;