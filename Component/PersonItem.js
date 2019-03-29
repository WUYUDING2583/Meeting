import React, { Component } from "react";
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { backgourndColor } from "../Style";
import Icon from 'react-native-vector-icons/Ionicons';

class PersonItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: this.props.isSelect,
            isAll: false,
        }
    }

    // componentWillMount() {
    //     let isAll = this.props.isAll;
    //     console.log("isALl:"+isAll);
    //     this.setState({ select: isAll });

    // }

    componentWillReceiveProps(nextProps) {
        let { isAll } = this.state;
        let newSelect = nextProps.isAll;
        if (isAll != newSelect) { this.setState({ select: newSelect, isAll: newSelect }); }
    }


    handleSelect = () => {
        let select = !this.state.select;
        this.props.onSelect(this.props.data.id, this.props.data.name, this.props.data.identity, select);
        this.setState({ select: select });
    }

    handleOperation = () => {
        this.props.operation(this.props.data.id);
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onSelect != null ? this.handleSelect : null}>
                <View style={{ margin: 10, marginTop: 5, justifyContent: "space-between", ...this.props.style }}>
                    <View style={{ ...styles.itemContainer, backgroundColor: this.state.select ? "#E9F7EA" : "white" }}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Image source={this.props.data.portraits} style={{ width: 50, height: 50, borderRadius: 50 }} />
                        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>{this.props.data.name}</Text>
                        </View>
                        {this.props.operation != undefined ? this.props.operation != null ?
                            <TouchableOpacity onPress={this.handleOperation}>
                                <Icon name="ios-close" size={40} color={backgourndColor} />
                            </TouchableOpacity> : null : null
                        }
                        {this.props.select ? null : this.props.history ?<Text style={{ fontSize: 18, fontWeight: "bold" }}>{ this.props.data.state }</Text>: null}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent:"space-between",
        padding: 10,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 20,
        margin: 10,
        alignItems: "center",
        //以下是阴影属性：
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#FAFAFA',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
    },
})
export default PersonItem;