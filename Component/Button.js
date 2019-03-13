import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Styles from "../Style";

class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={{...this.props.background}}>
                        <Text style={{...this.props.textStyle}}>
                            {this.props.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Button;