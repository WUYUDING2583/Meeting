import React, { Component } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet } from "react-native";
import Button from "../../../Component/Button";

class InputDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            introduction: '',
            personId: -1,
            companyId: -1,
        }
    }

    componentWillMount() {
        storage.load({
            key: 'staffInfo',
            autoSync: false,
            syncInBackground: false,
        }).then(ret => {
            this.setState({ personId: ret.personId, companyId: ret.companyId });
        }).catch(err => {
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
    }

    complete = () => {
        let { introduction } = this.state;
        let data = {
            ...this.props.navigation.getParam("data", {}), introduction: introduction,
            personId: this.state.personId, companyId: this.state.companyId
        };
        this.props.navigation.push("ReservationComplete", { data: data });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#FAFAFA" }} >
                <Text style={styles.title}>输入会议介绍</Text>
                <TextInput onChangeText={(introduction) => this.setState({ introduction })} multiline={true}
                    numberOfLines={10} style={styles.input} />
                <Button onPress={this.complete} title="完成" background={styles.buttonContainer}
                    textStyle={styles.buttonText} />
                <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}>
                    <Text style={{ color: "#376B6D", fontSize: 15, marginRight: 20, marginLeft: 20 }}>确认信息输入无误后点击完成，预约成功</Text>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: "#376B6D",
        margin: 20,
        fontWeight: "bold",
    },
    input: {
        textAlignVertical: "top",
        margin: 20,
        marginTop: 0,
        borderRadius: 20,
        //以下是阴影属性：
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#FAFAFA',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
    },
    buttonContainer: {
        backgroundColor: "#376B6D",
        alignItems: 'center',
        borderColor: 'white',
        borderRadius: 20,
        borderWidth: 2,
        margin: 20,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 25,
        color: "white",
        margin: 10
    },
})

export default InputDetailScreen;