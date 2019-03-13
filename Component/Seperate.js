import React from "react";
import {View,Text} from "react-native";

let Seperate=(props)=>{
    return(
        <View style={{margin:20,borderTopColor:'#696969',borderTopWidth:1,...props.style}} />
    )
}

export default Seperate;