import {
    StyleSheet,
    Text,
    View,
    TimePickerAndroid,
    TouchableHighlight,
} from 'react-native';
import React, { Component } from 'react';
//简单封装一个组件
class CustomButton extends Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#a5a5a5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}
class TimePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hour:new Date().getHours(),
            minute:new Date().getMinutes(),
            text: this.props.text,
        };
    }
    //进行创建时间日期选择器
    async showPicker(options) {
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                ...options,
                is24Hour: true, 
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                let text=hour+":"+minute;
                this.setState({hour:hour,minute:minute,text:text});
                this.props.onSelect(hour,minute);
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    }

    render() {
        return (
            <View>
                <CustomButton text={this.state.text}
                    onPress={this.showPicker.bind(this, { hour: this.state.hour,minute:this.state.minute })} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        margin: 5,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#cdcdcd',
    },
    buttonText: {
        fontSize: 20,
    }
});

export default TimePicker;