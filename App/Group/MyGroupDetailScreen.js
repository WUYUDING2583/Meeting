import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedback, Alert, TouchableOpacity } from "react-native";
import { backgourndColor } from "../../Style";
import Spinner from "react-native-spinkit";
import RefreshListView, { RefreshState } from "react-native-refresh-list-view";
import GroupItem from "../../Component/GroupItem";
import PersonItem from "../../Component/PersonItem";
import Global from "../../Global";
import X from "../../Component/X";

class MyGroupDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isSelect: false,//判断页面是否是选择与会人员
            isMyCreate:false,
        }
    }

    componentWillMount() {
        let data = this.props.navigation.getParam("data", []);
        console.log(data);
        this.setState({
            isSelect: this.props.navigation.getParam("isSelect", false),
            data,
            isMyCreate:this.props.navigation.getParam("isMyCreate", false),
        });
    }

    _keyExtractor = (item, index) => index.toLocaleString();

    //删除群成员
    delete=(id)=>{
        Alert.alert("是否要删除改群成员","",[
            {
                text:"是",
                onPress: () => {
                    let groupDetail={};
                    Global.groupList.map((item)=>{
                        let {id}=this.state.data;
                        if(item.id===id){
                            groupDetail=item;
                        }
                    });
                    groupDetail.groupMembers.splice(groupDetail.groupMembers.findIndex(item=>item.id===id),1);
                    Global.groupList.splice(Global.groupList.findIndex(item=>item.id===this.state.data.id),1);
                    Global.groupList.push(groupDetail);
                    this.setState({data:groupDetail});
                }
            },
            {
                text:"否",
            }
        ])
    }
    _renderItem = ({ item }) => {
        if (item.id != this.state.data.groupLeader) {
            return (
                <PersonItem key={item.id} onSelect={this.state.isSelect ? this.select : null}
                    data={item}
                    isSelect={false}
                    operation={this.state.isMyCreate?this.delete:null}
                    />
            )
        } else {
            return null;
        }
    }

    invite=()=>{
        this.props.navigation.navigate("Invite",{
            groupId:this.state.data.id,
        })
    }

    render() {
        return (
            <View style={{ justifyContent: "center", alignItems: "stretch", backgroundColor: "#FAFAFA", flex: 1 }}>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <X onPress={() => this.props.navigation.goBack()} />
                <TouchableOpacity onPress={this.invite}>
                    <Text style={{fontSize:18,color:backgourndColor,marginRight:10}}>添加群成员</Text>
                </TouchableOpacity>
                </View>
                {this.state.data.groupMembers.map((item) => {
                    if (item.id === this.state.data.groupLeader) {
                        return (
                            <View>
                                <Text style={{fontSize:20,color:backgourndColor,marginLeft:20,fontWeight:"bold"}}>群主</Text>
                                <PersonItem key={item.personId} onSelect={this.state.isSelect ? this.select : null}
                                    data={item} isSelect={false} />
                            </View>
                        )
                    }
                })} 
                <Text style={{fontSize:20,color:backgourndColor,marginLeft:20,fontWeight:"bold"}}>群成员</Text>
                                
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


export default MyGroupDetailScreen;