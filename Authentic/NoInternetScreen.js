import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from "react-native";
import Spinner from "react-native-spinkit";
import Back from "../Component/Back";

class NoInternetScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            type: 'WanderingCubes',
            size: 100,
            color: "white",
            isVisible: true
        }
    }



    render() {
        return (
            <View style={{ flex: 1, flexDirection: "row",backgroundColor:"#376B6D" }}>
                <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                    <Back onPress={() => this.props.navigation.goBack()} />
                </View>
                <View style={styles.container} >
                    <Spinner style={styles.spinner} size={this.state.size}
                        type={this.state.type} color={this.state.color} />
                    <Text style={styles.text}>(((φ(◎ロ◎;)φ)))</Text>
                    <Text style={styles.text}>网络好像丢失了</Text>
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
        backgroundColor: '#376B6D',
    },
    spinner: {
        marginBottom: 50
    },
    text: {
        color: "white",
        fontSize: 20,
    }
});

export default NoInternetScreen;