import React, { Component } from 'react';
import {
    View, FlatList,
    StyleSheet
} from 'react-native';
import PlaceItem from "../../../Component/PlaceItem";

class RoomListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.navigation.getParam("best",[]),
        }
    }
    static navigationOptions = {
        header: null,  //隐藏顶部导航栏
    };

    //进入会议室详情页面
    getDetail = (id,type) => {
        let data={...this.props.navigation.getParam("data",{}),type:type};
        this.props.navigation.push("RoomDetail", { id: id,data:data });
    }

    _keyExtractor = (item, index) => item.id.toLocaleString();

    _renderItem = ({ item }) => (
        <PlaceItem item={item} onPress={this.getDetail} />
    );

    render() {
        return (
            <View style={{
                flex: 1, alignItems: "stretch", justifyContent: "center",
                marginLeft: 10, marginRight: 10, backgroundColor: "#FAFAFA"
            }}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}
export default RoomListScreen;