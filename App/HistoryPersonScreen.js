import React, { Component } from "react";
import {
    View, Text, FlatList, StyleSheet,
    TouchableWithoutFeedback, Alert, TouchableOpacity,
    TextInput
} from "react-native";
import PersonItem from "../Component/PersonItem";
import Button from "../Component/Button";
import Loading from "../Component/Loading";
import url from "../url";
import NoInternetScreen from "./NoInternetScreen";
import Global, { personType } from "../Global";
import Modal from "react-native-modal";
import { backgourndColor } from "../Style";

class HistoryPersonScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.getParam("id", -1),
            data: null,
            attendees: [
                {
                    personId: Global.personInfo.id,
                    name: Global.personInfo.name,
                    state: "未出席",
                    identity: Global.personInfo.personType === personType.staff ? "staff" : "visitor",
                },
            ],
            isGetting: false,
            isNet: true,
            isGroup: false,
            select: [],
            groupId: [],
            isModalVisible: false,
            groupName: "",
        }
    }



    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    //获取历史与会人员
    getPersonList = () => {
        this.setState({ isGetting: true, isNet: true });
        let URL = url.getHistoryPerson(Global.personInfo.id);
        let opts = {
            method: "GET"
        }
        console.log(URL);
        fetch(URL, opts).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.status === 200) {
                    this.setState({ data: responseJson.data });
                }
                this.setState({ isGetting: false });
            }).catch((error) => this.setState({ isNet: false }))
    }

    componentWillMount() {
        // this.getPersonList();

        let data = Global.historyPerson;
        this.setState({ data });
    }


    //从历史与会人员种选择
    select = (personId, name, identity, isSelect) => {
        let attendees = this.state.attendees;
        if (isSelect) {
            attendees.push({ personId, name, state: "未出席", identity });
        } else {
            attendees.splice(attendees.findIndex(item => item.personId === personId), 1)
        }
        this.setState({ attendees, isGroup: false });
        console.log(attendees);
    }

    _keyExtractor = (item, index) => item.id.toLocaleString();

    _renderItem = ({ item }) => {
        let { attendees } = this.state;
        let bool = false;
        attendees.map((ite) => {
            if (ite.personId === item.id) {
                bool = true;
            }
        })
        return (
            <PersonItem data={item} onSelect={this.select}
                select={bool}
                style={{ marginTop: 3, marginBottom: 0 }} />
        )
    };

    //设置群名
    getGroupName = () => {
        this._toggleModal();
        let { attendees, groupName } = this.state;
        let id=Math.ceil(Math.random()*1000); 
        let groupLeader=Global.personInfo.id;
        let groupStyle= '永久';
        let groupMembers=[];
        let portraits= [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }];
        attendees.map((item)=>{
            groupMembers.push({id:item.personId,identity:"staff",name:item.name,portraits});
        })
        console.log({id,groupName,groupLeader,groupStyle,groupMembers})
        Global.groupList.push({id,groupName,groupLeader,groupStyle,groupMembers});
        let a = { ...this.props.navigation.getParam("data", {}), attendees: attendees };
        this.props.navigation.push("InputDetail", {
            a, extra: {
                isGroup: false, isCreateGroup: true, groupName,
            }
        });
    }
    //点击继续
    continue = () => {
        let { attendees, isGroup, groupId } = this.state;
        let a = { ...this.props.navigation.getParam("data", {}), attendees: attendees };
        let group = {};
        let data = {};
        if (isGroup) {
            groupId = groupId[0];
            console.log("data:" + JSON.stringify(data));
            this.props.navigation.push("InputDetail", {
                a, extra: {
                    isGroup, groupId, isCreateGroup: false
                }
            });
        } else {
            Alert.alert("是否将与会人员设置为常用群组", "", [
                {
                    text: '是',
                    onPress: () => this._toggleModal()
                },
                {
                    text: '否',
                    onPress: () => {
                        console.log("data:" + JSON.stringify(data));
                        this.props.navigation.push("InputDetail", {
                            a, extra: {
                                isGroup: false,
                                isCreateGroup: false,
                            }
                        });
                    },
                },
            ]);
        }

    }

    //从群组选择
    selectFromGroup = () => {
        this.props.navigation.push("GroupList", {
            isSelect: true,
            attendees: this.getAttendees,
            select: this.state.select,
        });
    }
    //从群组页面取得选取的与会人员
    getAttendees = (select) => {
        console.log("select:" + JSON.stringify(select));
        this.setState({ select });
        let { attendees } = this.state;
        let isGroup = false;
        let groupId = [];
        select.map((item) => {
            attendees = [...attendees, ...item.attendees];
            groupId = [...groupId, item.groupId];
            if (item.isGroup) {
                isGroup = true;
            }
        })
        if (select.length > 1) {
            isGroup = false;
        }
        this.setState({ isGroup, attendees, groupId });
    }

    //添加外部传递方法
    //嘉宾电话作为id
    add = (id, name) => {
        let attendees = this.state.attendees;
        attendees.push({ personId: id, name })
        console.log("添加嘉宾");
        console.log(attendees);
    }
    //添加外部人员
    addExternal = () => {
        this.props.navigation.push("AddExternal", {
            add: this.add,
        });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={this.selectFromGroup}>
                    <View style={{
                        height: 50, borderBottomWidth: 1,
                        borderColor: "#C0C0C0", justifyContent: "center"
                    }}>
                        <Text style={{
                            flex: 20, justifyContent: "center",
                            margin: 15, alignItems: "center", color: "#376B6D"
                        }}>从群组中选择</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.addExternal}>
                    <View style={{
                        height: 50, borderBottomWidth: 1,
                        borderColor: "#C0C0C0", justifyContent: "center"
                    }}>
                        <Text style={{
                            flex: 20, justifyContent: "center",
                            margin: 15, alignItems: "center", color: "#376B6D"
                        }}>添加嘉宾信息</Text>
                    </View>
                </TouchableWithoutFeedback>
                {this.state.isNet ? this.state.isGetting ? <Loading /> : <View style={{ flex: 1, flexDirection: "column-reverse" }}>
                    <View style={styles.bottomButton}>
                        <View style={{ flex: 3, flexWrap: "wrap", alignItems: "center", justifyContent: 'center' }}>
                            <Text style={styles.tip}>点击继续生成二维码扫码邀请</Text>
                        </View>
                        <View style={{ flex: 2, alignItems: "flex-start", justifyContent: "center" }}>
                            <Button background={styles.buttonContainer} textStyle={styles.buttonText}
                                title="继续" onPress={this.continue} />
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        {this.state.data != null ? <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={this.state.data}
                            extraData={this.state}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        /> :
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: "#376B6D", fontSize: 20 }}>你还没有参加过会议哦</Text>
                                <Text style={{ color: "#376B6D", fontSize: 20 }}>(●ˇ∀ˇ●)</Text>
                            </View>
                        }
                    </View>
                </View> : <NoInternetScreen onPress={this.getPersonList} />}
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.modalInput}>
                            <Text style={{ fontSize: 18, color: "white", marginBottom: 10 }}>请输入组名</Text>
                            <TextInput style={styles.input}
                                onChangeText={(groupName) => this.setState({ groupName })} />
                            <Button title="确定" onPress={this.getGroupName}
                                background={{
                                    backgroundColor: "white", borderColor: "white", borderWidth: 1,
                                    justifyContent: "center", alignItems: "center", borderRadius: 20,
                                    marginTop: 15,
                                }}
                                textStyle={{ fontSize: 18, color: backgourndColor, margin: 10 }} />
                        </View>
                    </View>
                </Modal>
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
        marginLeft: Global.gScreen.screen_width * 0.1 + 10,
        marginRight: 10,
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
    modalInput: {
        position: "absolute",
        top: Global.gScreen.screen_height * 0.25,
        left: Global.gScreen.screen_width * 0.15,
        width: Global.gScreen.screen_width * 0.7,
        height: Global.gScreen.screen_width * 0.5,
        backgroundColor: backgourndColor,
        borderWidth: 1,
        borderColor: "#376B6D",
        borderRadius: 10,
        padding: 10,
        justifyContent: "center",
        alignItems: "stretch"
    },
    input: {
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        color: "white",
        marginBottom: 20,
    },
})

export default HistoryPersonScreen;