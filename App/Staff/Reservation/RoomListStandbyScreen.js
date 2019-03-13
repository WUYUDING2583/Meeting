import React, { Component } from 'react';
import {
    View, FlatList,
    StyleSheet
} from 'react-native';
import PlaceItem from "../../../Component/PlaceItem";

class RoomListStandbyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.navigation.getParam("standby",[]),
        }
    }

    _keyExtractor = (item, index) => item.id.toLocaleString();

    _renderItem = ({ item }) => (
        <PlaceItem item={item} onPress={() => alert("1111")} />
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
const styles = StyleSheet.create({

})
export default RoomListStandbyScreen;