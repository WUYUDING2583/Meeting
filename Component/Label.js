import React from "react";
import { StyleSheet, View, Text } from "react-native";

let Label = (props) => {
    return (
        <View style={{ ...styles.container, backgroundColor:props.backgroundColor }}>
            <Text style={{ ...styles.text, color:props.textColor }}>{props.text.length>10?props.text.substring(0,8)+"...":props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "white",
        //backgroundColor: "#E9F7EA",
        borderRadius: 20,
        margin: 5,
    },
    text: {
        fontSize: 13,
        // color: "#2D6D4B",
        margin: 10,
    },
})

export default Label;