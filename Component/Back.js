import React,{Component} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

class Back extends Component{
    render(){
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{...this.props.style}}>
                <Icon name="ios-arrow-round-back" size={40} color={this.props.color?this.props.color:"white"} />
            </TouchableOpacity>
        );
    }
}

export default Back;

