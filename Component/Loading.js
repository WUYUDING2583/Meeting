import React from "react";
import Spinner from "react-native-spinkit";
import {StyleSheet,View} from "react-native";

let Loading = () => {
    return (
        <View style={styles.container}>
            <Spinner style={styles.spinner}
                size={100} type={"9CubeGrid"}
                color={"#376B6D"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
    },
    spinner: {
        marginBottom: 50
    },

});

export default Loading;
