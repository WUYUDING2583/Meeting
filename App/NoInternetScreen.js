import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
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
            color: "#376B6D",
            isVisible: true,
        }
    }
    render() {
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={this.props.onPress}>
                <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#FAFAFA" }}>
                    <View style={styles.container} >
                        <Spinner style={styles.spinner} size={this.state.size}
                            type={this.state.type} color={this.state.color} />
                        <Text style={styles.text}>(((φ(◎ロ◎;)φ)))</Text>
                        <Text style={styles.text}>网络好像丢失了</Text>
                        <Text style={styles.text}>轻触页面刷新</Text>
                        {this.props.onBack ?
                            <TouchableWithoutFeedback style={{ margin: 20 }} onPress={this.props.onBack}>
                                <Text style={styles.text}>点这里返回上一页</Text>
                            </TouchableWithoutFeedback>
                            : null}
                    </View>
                </View>
            </TouchableWithoutFeedback>
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

export default NoInternetScreen;