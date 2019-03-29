import React, { Component } from "react";
import Label from "./Label";
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import ImageSwiper from "./ImageSwiper";
import Global, { personType } from "../Global";

class PlaceItem extends Component {
    constructor(props) {
        super(props);
    }

    handlePress = () => {
        this.props.onPress(this.props.item.id, this.props.item.type);
    }
    render() {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.imageContainer}>
                    {/* <Image source={require('./weather.jpg')}
                            style={styles.image} /> */}
                    <ImageSwiper imageWidth={styles.image.width} imageHeight={styles.image.height}
                        style={styles.image} source={this.props.item.portraits} />
                </View>
                <TouchableWithoutFeedback onPress={this.handlePress}>
                    <View style={{ alignItems: "stretch", margin: 5, flex: 1 }}>
                        <Text style={styles.itemName}>{this.props.item.name}</Text>
                        <Text style={styles.itemAddress}>
                            {this.props.item.address.toLocaleString().length > (Global.gScreen.screen_width - 20 - 20 - 14) / 25 ?
                                this.props.item.address.toLocaleString().substring(0, (Global.gScreen.screen_width - 20 - 20 - 14) / 25 - 5) + "..." : this.props.item.address}</Text>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            <Label backgroundColor="#E9F7EA" textColor="#2D6D4B" text={'最大可容纳' + this.props.item.capacity + '人'} />
                            <Label backgroundColor="#FEDFE1" textColor="#E16B8C"
                                text={this.props.item.introduction} />
                            <Label backgroundColor="#FEDFE1" textColor="#E16B8C"
                                text={'距离'+this.props.item.distance+'米'} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 20,
        margin: 10,
        height: Global.gScreen.screen_height * 0.6,
        alignItems: "stretch",
        //以下是阴影属性：
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#FAFAFA',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "stretch", margin: 5
    },
    image:
    {
        width: Global.gScreen.screen_width - 20 - 20 - 14,
        height: Global.gScreen.screen_height * 0.5 * 0.6,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    itemName: {
        margin: 10,
        color: '#2EA9DF',
        fontSize: 20,
    },
    itemAddress: {
        fontSize: 25,
        marginLeft: 10,
        color: "black",
    },
    capacityContainer: {
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "#E9F7EA",
        borderRadius: 20,
        margin: 10,
    },
    capacity: {
        fontSize: 13,
        color: "#2D6D4B",
        margin: 10,
    },
})

export default PlaceItem;