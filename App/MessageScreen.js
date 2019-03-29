import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    BackHandler
} from "react-native";
import Spinner from "react-native-spinkit";
import Back from "../Component/Back";

class MessageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'WordPress',
            size: 100,
            color: "#376B6D",
        }
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        this.props.navigation.state.params.start();
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#FAFAFA" }}>
                <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                    <Back onPress={() => {
                        this.props.navigation.state.params.start();
                        this.props.navigation.goBack();
                    }}
                        color={"#376B6D"} />
                </View>
                <View style={styles.container}>
                    <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={this.state.type} color={this.state.color} />
                    <Text style={styles.text}>{this.props.navigation.getParam("message", "什么也没有(+_+)?")}</Text>
                </View>
                <View style={{ flex: 1 }} />
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
    },
    spinner: {
        marginBottom: 50
    },
    text: {
        color: "#376B6D",
        fontSize: 20,
    }
});

export default MessageScreen;
