import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { backgourndColor } from "../../Style";
import Spinner from "react-native-spinkit";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import GroupItem from "../../Component/GroupItem";
import PersonItem from "../../Component/PersonItem";
import Global from "../../Global";

class GroupDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isSelect: true,//判断页面是否是选择与会人员
            attendees: [],
            isSelectAll: false,//是否全选
            groupId: -1,
        }
    }

    componentWillMount() {
        let data = this.props.navigation.getParam("data", []);
        let selectDetail = this.props.navigation.getParam("selectDetail", []);
        console.log(selectDetail);
        let attendees = [];
        let isSelectAll = false;
        if (selectDetail.length != 0) {
            attendees = selectDetail;
            isSelectAll = selectDetail.isGroup;
        }
        let groupId = data.id;
        this.setState({
            isSelect: this.props.navigation.getParam("isSelect", true),
            data,
            groupId,
            attendees,
            isSelectAll,
        });
    }

    componentDidMount() {
        this.props.navigation.setParams({ navigatePress: this.nextStep })
    }


    static navigationOptions = ({ navigation }) => {

        const params = navigation.state.params || {};
        return {
            headerTitle: '群成员',
            headerRight:
                <View>
                    {navigation.getParam("isSelect", false) ?
                        <TouchableWithoutFeedback onPress={() => navigation.state.params.navigatePress()}>
                            <Text style={{ fontSize: 18, color: backgourndColor, marginRight: 10 }}>确定</Text>
                        </TouchableWithoutFeedback> : null}
                </View>,
        };
    };

    //确定
    nextStep = () => {
        let { attendees, isSelectAll, groupId } = this.state;
        let data = { groupId, isGroup: isSelectAll, attendees };
        this.props.navigation.state.params.attendees(data);
        console.log(data);
        this.props.navigation.goBack();
    }


    _keyExtractor = (item, index) => index.toLocaleString();

    //选择人员
    select = (personId, name, identity, select) => {
        let { attendees } = this.state;
        console.log("select:" + JSON.stringify(select));
        if (select) {
            attendees.push({ personId, name, state: "未出席", identity });
        } else {
            attendees.splice(attendees.findIndex(item => item.personId === personId), 1)
        }
        this.setState({ attendees });
        console.log(attendees);
    }
    _renderItem = ({ item }) => {
        let { attendees } = this.state;
        let bool = false;
        attendees.map((i) => {
            if (item.id === i.personId) {
                bool = true;
            }
        })
        if (item.id != Global.personInfo.id) {
            // let isSelectAll=this.state.isSelectAll;
            return (
                <PersonItem onSelect={this.select}
                    data={item} isAll={this.state.isSelectAll}
                    selectAll={this.selectAll} isSelect={bool} />
            )
        } else {
            return null;
        }
    }

    

    //全选
    selectAll = () => {
        let attendees = [];
        let isSelectAll = !this.state.isSelectAll;
        this.setState({ isSelectAll });
        let { groupMembers } = this.state.data;
        if (isSelectAll) {
            groupMembers.map((item) => {
                if (item.id != Global.personInfo.id) {
                    attendees.push({ personId: item.id, name: item.name, state: "未出席", identity: item.identity })
                }
            })
        }
        this.setState({ attendees });
        console.log(attendees);
    }

    render() {
        return (
            <View style={{
                flex: 1, alignItems: "stretch", justifyContent: "center",
                marginLeft: 10, marginRight: 10, backgroundColor: "#FAFAFA"
            }}>
                <View style={{ flexDirection: "row-reverse", margin: 20 }}>
                    {
                        this.state.isSelect ? (
                            <TouchableWithoutFeedback onPress={this.selectAll}>
                                {this.state.isSelectAll ?
                                    <Text style={{ fontSize: 18, marginRight: 10, color: backgourndColor }}>
                                        取消
                                </Text> :
                                    <Text style={{ fontSize: 18, marginRight: 10, color: backgourndColor }}>
                                        全选
                                </Text>}
                            </TouchableWithoutFeedback>
                        ) : null
                    }
                </View>
                <FlatList
                    extraData={this.state}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={this.state.data.groupMembers}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
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
    }
});


export default GroupDetailScreen;