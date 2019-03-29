import React, { Component } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet } from "react-native";
import Button from "../../../Component/Button";
import Global from "../../../Global";
import url from "../../../url";
import Toast from "react-native-easy-toast";

class InputDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            introduction: '',
            personId: -1,
            companyId: -1,
            data: null,
        }
    }

    componentWillMount() {
        let { id, companyId } = Global.personInfo;
        this.setState({ personId: id, companyId });
    }

    complete = () => {
        // let { introduction } = this.state;
        // let a = {
        //     ...this.props.navigation.getParam("a", {}), orderer_id: Global.personInfo.id,
        //     ordererType: "staff", companyId: Global.personInfo.companyId, introduction
        // };
        // let {starttime,endtime,duration,capacity,type,place_id,place_name,attendees,
        //     orderer_id,ordererType,companyId}=a;

        // let extra =this.props.navigation.getParam("extra", {});
        // let {isGroup,isCreateGroup}=extra;
        // let appointment={duration,capacity,type,place_id,place_name,orderer_id,ordererType,companyId,introduction};
        // let data={appointment,startTime:starttime,endTime:endtime,isGroup};
        // if(isGroup){
        //     let {groupId}=extra;
        //     data={...data,groupId};
        // }
        // data={...data,isCreateGroup};
        // if(isCreateGroup){
        //     let {groupName}=extra;
        //     data={...data,groupName};
        // }
        // data={...data,attendees};
        // console.log(JSON.stringify(data));
        // let opts = {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json;charset=utf-8',
        //         'Content-Type': 'application/json;charset=utf-8',
        //     },
        //     body: JSON.stringify(data),
        // };
        // console.log(url.makeReservationStaff());
        // fetch(url.makeReservationStaff(), opts).then((response) => response.json())
        //     .then((responseJson) => {
        //         console.log(responseJson);
        //         if (responseJson.status === 200) {
        //             if("success".localeCompare(responseJson.result)===0){
        //                 let code=responseJson.data;
        //                 this.props.navigation.push("ReservationComplete", { code,data });
        //             }
        //         }else{
        //             this.refs.toast.show(responseJson.msg);
        //         }
        //     }).catch((error) => {
        //         this.refs.toast.show("哦哦网络在躲猫猫欸")
        //         console.log(error);
        //     })


        // let { introduction } = this.state;
        //  let a = {
        //     ...this.props.navigation.getParam("a", {}), orderer_id: Global.personInfo.id,
        //     ordererType: "staff", companyId: Global.personInfo.companyId, introduction
        // };
        // console.log("a:"+JSON.stringify(a));
        // let extra =this.props.navigation.getParam("extra", {});
        // console.log("extra:"+JSON.stringify(extra));
        // let data={a,...extra};
        let { introduction } = this.state;
        let a = {
            ...this.props.navigation.getParam("a", {}), orderer_id: Global.personInfo.id,
            ordererType: "staff", companyId: Global.personInfo.companyId, introduction
        };
        let { starttime, endtime, duration, capacity, type, place_id, place_name, attendees,
            orderer_id, ordererType, companyId, address } = a;
        let appointmentId = Math.ceil(Math.random() * 1000);
        let place = place_name;
        // address: '文学楼楼',
        // start_time: '2019-05-27 15:30:00',
        // end_time: '2019-05-27 16:30:00',
        // introduction: '服务外包第一次讨论',
        let organizer = Global.personInfo.name;
        let  portraits= [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }];
        let att=[];
        attendees.map((item)=>{
            att.push({...item,portraits});
        });
        // attendees:
        let data={appointmentId,place,address,start_time:starttime,end_time:endtime,organizer,attendees:att,introduction};
        console.log({appointmentId,place,address,start_time:starttime,end_time:endtime,organizer,attendees:att,introduction})
        Global.presentMeeting.push({appointmentId,place,address,start_time:starttime,end_time:endtime,introduction,organizer,attendees:att});
        Global.myAppoint.push({appointmentId,place,address,start_time:starttime,end_time:endtime,introduction,organizer,attendees:att})
        this.props.navigation.push("ReservationComplete", { code: 13,data });

        //     appointmentId: 153,
        // place: '文201',
        // address: '文学楼楼',
        // start_time: '2019-05-28 15:30:00',
        // end_time: '2019-035-28 16:30:00',
        // introduction: '服务外包第三次讨论',
        // organizer: '付初露',
        // phone: '15984565488',
        // attendees:
        //   [{
        //     id: 9,
        //     appointmentId: 183,
        //     personId: 1,
        //     name: '付初露',
        //     identity: 'staff',
        //     state: '出席',
        //     portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
        //   },
        //   {
        //     id: 9,
        //     appointmentId: 183,
        //     personId: 2,
        //     identity: 'staff',
        //     name: '陆凝丹',
        //     state: '出席',
        //     portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
        //   },
        //   {
        //     id: 9,
        //     appointmentId: 183,
        //     personId: 2,
        //     identity: 'visitor',
        //     name: '吴宇丁',
        //     state: '出席',
        //     portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/1.jpg" }]
        //   }
        //   ]

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#FAFAFA" }} >
                <Text style={styles.title}>输入会议介绍</Text>
                <TextInput onChangeText={(introduction) => this.setState({ introduction })} multiline={true}
                    numberOfLines={10} style={styles.input} />
                <Button onPress={this.complete} title="完成" background={styles.buttonContainer}
                    textStyle={styles.buttonText} />
                <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}>
                    <Text style={{ color: "#376B6D", fontSize: 15, marginRight: 20, marginLeft: 20 }}>确认信息输入无误后点击完成，预约成功</Text>
                </View>
                <Toast
                    ref="toast"
                    style={styles.toast}
                    opacity={0.8}
                    position="top"
                    fadeOutDuration={1000}
                    textStyle={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: "#376B6D",
        margin: 20,
        fontWeight: "bold",
    },
    input: {
        textAlignVertical: "top",
        margin: 20,
        marginTop: 0,
        borderRadius: 20,
        //以下是阴影属性：
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#FAFAFA',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 4,
    },
    buttonContainer: {
        backgroundColor: "#376B6D",
        alignItems: 'center',
        borderColor: 'white',
        borderRadius: 20,
        borderWidth: 2,
        margin: 20,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 25,
        color: "white",
        margin: 10
    },
    toast: {
        width: Global.gScreen.screen_width * 0.5,
        height: Global.gScreen.screen_width * 0.5,
        backgroundColor: "#376B6D",
        borderWidth: 1,
        borderColor: "#376B6D",
        borderRadius: 10,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default InputDetailScreen;