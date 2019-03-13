import React from 'react';
import {View,Slider,StyleSheet} from 'react-native';

let Slider=(props)=>{
    return(
        <View style={styles.containers}>
            <Slider />
        </View>
    );
};

const styles=StyleSheet.create({
    container:{
        borderWidth:2,
        borderColor:'white',
        margin:10,
        alignItems:"center",
        justifyContent:"center",
        borderRaduis:20,

    }
})

export default Slider;