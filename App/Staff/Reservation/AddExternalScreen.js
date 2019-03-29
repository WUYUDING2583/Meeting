import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback, Image, TextInput } from "react-native";
import { backgourndColor } from "../../../Style";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from 'react-native-image-picker';
import Button from "../../../Component/Button";
import { ScrollView } from "react-native-gesture-handler";

class AddExternalScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: null,
            guestName: "",
            guestPhone: "",
            guestCarNum:"",
        }
    }

    chooseImage = () => {
        const options = {
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择照片',
            customButtons: [
                { name: 'fb', title: 'Choose Photo from Facebook' },
            ],
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high',
            durationLimit: 10,
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.8,
            angle: 0,
            allowsEditing: false,
            noData: false,
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.launchImageLibrary(options, (response) => {

            let source = { uri: response.uri };
            this.setState({ source });

            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            // this.setState({
            //     avatarSource: source
            // });

        });
    }

    add = () => {
        let { guestPhone, guestName } = this.state;
        this.props.navigation.state.params.add(guestPhone, guestName);
        this.props.navigation.goBack();
    }
    render() {
        return (

            <View style={{ flex: 1, backgroundColor: "#FAFAFA", flexDirection: "row" }}>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 8 }}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <TouchableWithoutFeedback onPress={this.chooseImage}>
                            <View>
                                <View style={{
                                    width: 150, height: 150, borderWidth: 1, borderColor: "#C0C0C0",
                                    marginTop: 50, justifyContent: "center", alignItems: "center"
                                }}>
                                    {this.state.source === null ? <Icon name="ios-add" size={150} color={backgourndColor} />
                                        : <Image source={this.state.source} style={{ width: 150, height: 150, }} />}

                                </View>
                                <Text style={{ margin: 10, fontSize: 20, color: backgourndColor }}>选择照片信息</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={{ fontSize: 20, color: backgourndColor, margin: 10 }}>嘉宾姓名</Text>
                        <TextInput style={{
                            height: 40,
                            borderBottomWidth: 2,
                            borderBottomColor: backgourndColor,
                            color: backgourndColor,
                        }}
                            value={this.state.guestName}
                            onChangeText={(guestName) => this.setState({ guestName })} />
                        <Text style={{ fontSize: 20, color: backgourndColor, margin: 10 }}>嘉宾电话</Text>
                        <TextInput style={{
                            height: 40,
                            borderBottomWidth: 2,
                            borderBottomColor: backgourndColor,
                            color: backgourndColor,
                        }}
                            keyboardType="number-pad"
                            value={this.state.guestPhone}
                            onChangeText={(guestPhone) => this.setState({ guestPhone })} />
                        <Text style={{ fontSize: 20, color: backgourndColor, margin: 10 }}>嘉宾车牌号</Text>
                        <TextInput style={{
                            height: 40,
                            borderBottomWidth: 2,
                            borderBottomColor: backgourndColor,
                            color: backgourndColor,
                        }}
                            onChangeText={(guestCarNum) => this.setState({ guestCarNum })} />
                        <Button onPress={this.add}
                            background={{
                                backgroundColor: backgourndColor, marginTop: 20, borderWidth: 1,
                                borderColor: backgourndColor, borderRadius: 20, alignItems: "center",
                                justifyContent: "center", height: 50,marginBottom:30,
                            }}
                            textStyle={{ color: "white", fontSize: 20 }}
                            title={"添加"} />
                    </ScrollView>
                </View>
                <View style={{ flex: 1 }} />
            </View>
        )
    }
}

export default AddExternalScreen;