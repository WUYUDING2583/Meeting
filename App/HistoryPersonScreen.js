import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedback, Dimensions } from "react-native";
import PersonItem from "../Component/PersonItem";
import Button from "../Component/Button";
import Loading from "../Component/Loading";
import url from "../url";
import NoInternetScreen from "./NoInternetScreen";

class HistoryPersonScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.getParam("id", -1),
            data: null,
            attendees: [],
            isGetting: false,
            isNet: true,
        }
    }

    getPersonList = () => {
        this.setState({ isGetting: true, isNet: true });
        let URL = url.getHistoryPerson(this.props.navigation.getParam("personId", -1));
        let opts = {
            method: "GET"
        }
        fetch(URL, opts).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 200) {
                    this.setState({ data: responseJson.data });
                }
                this.setState({ isGetting: false });
            }).catch((error) => this.setState({ isNet: false }))
    }

    componentWillMount() {
        this.getPersonList();
        // this.setState({ isGetting: false });
        // let data = [
        //     {
        //         id: 1,
        //         name: "张鑫楠",
        //     },
        //     {
        //         id: 2,
        //         name: "龙杰",
        //     },
        //     {
        //         id: 3,
        //         name: "韩明杰",
        //     },
        //     {
        //         id: 4,
        //         name: "吴宇丁",
        //     },
        //     {
        //         id: 4,
        //         name: "吴宇丁",
        //     },
        //     {
        //         id: 4,
        //         name: "吴宇丁",
        //     },
        //     {
        //         id: 4,
        //         name: "吴宇丁",
        //     },
        //     {
        //         id: 4,
        //         name: "吴宇丁",
        //     },
        //     {
        //         id: 4,
        //         name: "吴宇丁",
        //     },
        // ];
        // this.setState({ data });
    }

    select = (id, name, isSelect) => {
        let attendees = this.state.attendees;
        if (isSelect) {
            attendees.push({ id, name });
        } else {
            attendees.splice(attendees.findIndex(item => item.id === id), 1)
        }
        this.setState({ attendees });
    }

    _keyExtractor = (item, index) => item.id.toLocaleString();

    _renderItem = ({ item }) => (
        <PersonItem data={item} select={true} onSelect={this.select} style={{ marginTop: 3, marginBottom: 0 }} />
    );

    continue = () => {
        let { attendees } = this.state;
        let data = { ...this.props.navigation.getParam("data", {}), attendees: attendees };
        this.props.navigation.push("InputDetail", { data: data });
    }
    render() {
        let { width, height } = Dimensions.get("window");
        return (
            <View style={{ flex: 1 }}>
                {this.state.isNet ? this.state.isGetting ? <Loading /> : <View style={{ flex: 1, flexDirection: "column-reverse" }}>
                    <View style={styles.bottomButton}>
                        <View style={{ flex: 3, flexWrap: "wrap", alignItems: "center", justifyContent: 'center' }}>
                            <Text style={styles.tip}>若当前列表无出席人员请点击继续</Text>
                        </View>
                        <View style={{ flex: 2, alignItems: "flex-start", justifyContent: "center" }}>
                            <Button background={styles.buttonContainer} textStyle={styles.buttonText}
                                title="继续" onPress={this.continue} />
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.state.data ? <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={this.state.data}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        /> :
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: "#376B6D", fontSize: 20 }}>你还没有参加过会议哦</Text>
                                <Text style={{ color: "#376B6D", fontSize: 20 }}>直接点继续吧</Text>
                                <Text style={{ color: "#376B6D", fontSize: 20 }}>(●ˇ∀ˇ●)</Text>
                            </View>
                        }
                    </View>
                </View> : <NoInternetScreen onPress={this.getPersonList} />}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    tip: {
        fontSize: 18,
        color: "#376B6D",
        fontWeight: "bold",
        margin: 10,
        marginTop: 15,
        marginLeft: Dimensions.get("window").width * 0.1 + 10,
        marginRight: 10,
    },
    buttonContainer: {
        backgroundColor: "#FF5A5E",
        width: Dimensions.get("window").width * 0.3,
        height: Dimensions.get("window").height * 0.15 * 0.5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 15,
    },
    bottomButton: {
        flexDirection: "row",
        backgroundColor: "white",
        borderTopWidth: 2,
        borderTopColor: "white",
        height: Dimensions.get("window").height * 0.1,
        width: Dimensions.get("window").width * 1.2,
        marginLeft: -Dimensions.get("window").width * 0.1,
        //以下是阴影属性：
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#FAFAFA',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 5,
    }
})

export default HistoryPersonScreen;