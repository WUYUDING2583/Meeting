import React, { Component } from "react";
import { View, Text, FlatList, Image, TouchableWithoutFeedback, Dimensions } from "react-native";
import PersonItem from "../Component/PersonItem";
import Icon from "react-native-vector-icons/Ionicons";
import X from "../Component/X";

class PersonListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendees: [],
            isHistory:false,
        }
    }

    componentWillMount() {
        let attendees = this.props.navigation.getParam("attendees", []);
        let isHistory=this.props.navigation.getParam("isHistory",false);
        this.setState({ attendees,isHistory });
    }

    _keyExtractor = (item, index) => item.personId.toLocaleString();

    _renderItem = ({ item }) => (
        <PersonItem data={item} history={this.state.isHistory} />
    );
    render() {
        return (
            <View style={{ justifyContent: "center", alignItems: "stretch", backgroundColor: "#FAFAFA",flex:1 }}>
                <X onPress={() => this.props.navigation.goBack()} />
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={this.state.attendees}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}

export default PersonListScreen;