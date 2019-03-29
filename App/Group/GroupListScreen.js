import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Spinner from "react-native-spinkit";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import GroupItem from "../../Component/GroupItem";
import url from "../../url";
import Global from "../../Global";
import Loading from "../../Component/Loading";
import NoInternetScreen from "../NoInternetScreen";
import Button from "../../Component/Button";

class GroupListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshState: RefreshState.Idle,
            isSelect: false,
            isGetting: true,
            isNet: true,
            select: [],
        }
    }

    //获取群组列表
    getGroupList = () => {
        this.setState({ isGetting: true, isNet: true });
        let URL = url.getGroupList(Global.personInfo.id);
        let opt = {
            method: "GET"
        };
        console.log(URL);
        fetch(URL, opt).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.status === 200) {
                    if (responseJson.data != null) {
                        let groupCreate = responseJson.data[0].recommends;
                        let groupContain = responseJson.data[1].recommends;
                        let data = [...groupCreate, ...groupContain];
                        console.log(data);
                        this.setState({ data, isGetting: false });
                    } else {
                        this.setState({ isGetting: false });
                    }
                } else {
                    this.setState({ isNet: false })
                }
            }).catch((error) => {
                this.setState({ isNet: false });
                console.log(error);
            })
    }

    componentWillMount() {
        this.setState({
            isSelect: this.props.navigation.getParam("isSelect", false),
            select: this.props.navigation.getParam("select", []),
        });
        // this.getGroupList();
        let data =Global.groupList;
        this.setState({data,isGetting: false});
    }

    _keyExtractor = (item, index) => item.id.toLocaleString();

    _renderItem = ({ item }) => {
        return (
            <GroupItem onPress={this.entryGroup} data={item} />
        )
    }

    entryGroup = (id) => {
        let { data, select } = this.state;
        let groupDetail = {};
        let selectDetail = [];
        data.map((item) => {
            if (item.id === id) {
                groupDetail = { ...item };
            }
        });
        console.log(select);
        select.map((item) => {
            selectDetail=[...selectDetail,...item.attendees];
            // if (item.groupId === id) {
            //     selectDetail = item;
            // }
        })
        
        // console.log(select);
        // console.log("groupDetail:" + JSON.stringify(groupDetail))
        this.props.navigation.push("GroupDetail", {
            isSelect: this.state.isSelect,
            data: groupDetail,
            attendees: this.attendees,
            selectDetail,
        })
    }

    //回调函数
    attendees = (data) => {
        let { select } = this.state;
        select.splice(select.findIndex(item => item.groupId === data.groupId), 1);
        select.push(data);
        this.setState({ select });
    }

    _empty = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>(((φ(◎ロ◎;)φ)))</Text>
                <Text style={styles.text}>你还没有群组欸</Text>
                <Text style={styles.text}>去发起会议创建群组吧</Text>
            </View>
        )
    }

    //确定
    verify = () => {
        console.log("state:" + JSON.stringify(this.state));
        let { select } = this.state;
        this.props.navigation.state.params.attendees(select);
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{
                flex: 1, alignItems: "stretch", justifyContent: "center",
                marginLeft: 10, marginRight: 10, backgroundColor: "#FAFAFA"
            }}>
                {this.state.isNet ? this.state.isGetting ? <Loading /> : this.state.data.length != 0 ?
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        keyExtractor={this._keyExtractor}
                        extraData={this.state}
                        renderItem={this._renderItem}
                    /> :
                    this._empty() : <NoInternetScreen onPress={this.getRoomDetail}
                        onBack={() => this.props.navigation.goBack()} />}
                {this.state.isSelect ? <View style={styles.bottomButton}>
                    <View style={{ flex: 3, flexWrap: "wrap", alignItems: "center", justifyContent: 'center' }}>
                        <Text style={styles.tip}>若确定人员请点击确定</Text>
                    </View>
                    <View style={{ flex: 2, alignItems: "flex-start", justifyContent: "center" }}>
                        <Button background={styles.buttonContainer} textStyle={styles.buttonText}
                            title="确定" onPress={this.verify} />
                    </View>
                </View> : null}
            </View>
        )
    }
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
    text: {
        color: "#376B6D",
        fontSize: 20,
    },
    buttonContainer: {
        backgroundColor: "#FF5A5E",
        width: Global.gScreen.screen_width * 0.3,
        height: Global.gScreen.screen_height * 0.15 * 0.5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 15,
    },
    itemTitle: {
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20,
        fontWeight: "bold",
    },
    itemText: {
        fontSize: 18,
        marginLeft: 20,
        marginBottom: 10
    },
    bottomButton: {
        flexDirection: "row",
        backgroundColor: "white",
        borderTopWidth: 2,
        borderTopColor: "white",
        height: Global.gScreen.screen_height * 0.1,
        width: Global.gScreen.screen_width * 1.2,
        marginLeft: -Global.gScreen.screen_width * 0.1,
        //以下是阴影属性：
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#FAFAFA',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 5,
    },
    tip: {
        fontSize: 18,
        color: "#376B6D",
        fontWeight: "bold",
        margin: 10,
        marginTop: 15,
        marginLeft: Global.gScreen.screen_width * 0.1 + 10,
        marginRight: 10,
    },
});


export default GroupListScreen;