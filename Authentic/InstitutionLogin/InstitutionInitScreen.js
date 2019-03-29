import React, { Component } from 'react';
import Styles, { backgourndColor } from "../../Style";
import { View, Text } from 'react-native';
import { TextInput } from 'react-native';
import Back from "../../Component/Back";
import Forward from "../../Component/Forward";
import Button from "../../Component/Button";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModalDropdown from 'react-native-modal-dropdown';
import url from "../../url";
import Toast from 'react-native-easy-toast';
import Global from "../../Global";

class InstitutionInitScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            institution: '',
            institutionId: '',
            jobnum: '',
            x: 0,//底部元素相对于屏幕左上顶点的坐标，
            y: 0,//用于keyboardawarescrollview出现的空白区域调整
            screenHeight: Global.gScreen.screen_height,
            data: null,//公司列表数据
            companyList: [],//公司列表未处理数据
        };
    }

    faceCognition = () => {
        let { institution, institutionId, jobnum } = this.state;
        Global.jobnum=jobnum;
        if (institution.length > 0 && jobnum.length > 0) {
            this.props.navigation.push("FaceCognition", {
                institution: institution,
                jobnum: jobnum,
                return:this.returnFace,
            });
        }else{
            this.refs.toast.show("先把信息输入完整哦");
        }
    }

    Psw = () => {
        let { institution, jobnum } = this.state;
        console.log("institution:"+institution);
        console.log("jobnum:"+jobnum);

        Global.jobnum=jobnum;
        if (institution.length > 0 && jobnum.length > 0) {
            this.props.navigation.push("InstitutionPsw", {
                institution,
                jobnum,
            });
        }
    }

    getCompanyList = (institution) => {
        let URL = url.getCompanyList(institution);
        let opts = {
            method: "GET"
        };
        fetch(URL, opts).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 200) {
                    let companyList = responseJson.data;
                    let data = [];
                    companyList.map((item) => {
                        data.push(item.name);
                    });
                    this.setState({ data, companyList });
                }
            }).catch(() => {
                this.refs.toast.show("网络似乎在躲猫猫欸");
            })
    }

    inputInstitutionName = (institution) => {
        this.setState({ institution });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.getCompanyList(institution);
            // let companyList = [
            //     {
            //         id: 1,
            //         name: "Ligon568",
            //     },
            //     {
            //         id: 2,
            //         name: "asdfa",
            //     },
            // ];
            // let data = [];
            // companyList.map((item) => {
            //     data.push(item.name);
            // });
            // this.setState({ data, companyList });
            if (institution.length === 0) {
                this.drop.hide();
            } else {
                this.drop.show();
            }
        }, 500);
    }

    select = (inde) => {
        let data = this.state.companyList;
        data.map((item, index) => {
            if (inde == index) {
                this.setState({ institution: item.name, institutionId: item.id });
                Global.company=item.name;
                console.log(Global.company);
            }
        })
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    onLayout = (e) => {
        let { x, y } = e.nativeEvent.layout;
        this.setState({ x: x, y: y });
    }

    returnFace = () => {
        Alert.alert('很抱歉，没有认出你', '第一次登录请使用其他登录方式', [
            {
                text: '再试一次', onPress: () => {
                    this.props.navigation.push("FaceCognition", {
                        personType: personType.visitor,
                        phone: this.state.phone,
                        return: this.returnFace,
                    })
                }
            },
            {
                text: '其他方式登录',
            },
        ]);
    }
    render() {
        let { y, screenHeight } = this.state;
        return (
            <KeyboardAwareScrollView style={{ flex: 1 }}>
                <View style={Styles.default}>
                    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                        <Back onPress={() => this.props.navigation.goBack()} />
                    </View>
                    <View style={{ flex: 8, alignItems: "stretch", justifyContent: "flex-start" }} >
                        <Text style={Styles.title}>机构登录</Text>
                        <Text style={Styles.itemTitle}>机构名称（单位）</Text>
                        <TextInput style={{ ...Styles.input }}
                            value={this.state.institution}
                            onChangeText={(institution) => this.inputInstitutionName(institution)} />
                        <ModalDropdown
                            ref={ref => {
                                this.drop = ref;
                            }}
                            style={{ marginTop: 0, }}
                            options={this.state.data}
                            onSelect={this.select}
                            dropdownStyle={{ width: Global.gScreen.screen_width * 0.8 }}
                            textStyle={{ fontSize: 0 }}
                        />


                        <Text style={Styles.itemTitle}>工号</Text>
                        <TextInput style={{ ...Styles.input, marginBottom: 20 }}
                            onChangeText={(jobnum) => this.setState({ jobnum })} />
                        <Button title="人脸识别登录" onPress={this.faceCognition}
                            background={Styles.authButtonfocusdContainer}
                            textStyle={Styles.authFocusedButtonText} />
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "white", fontSize: 15, marginRight: 20, marginLeft: 20 }}>第一次登录请使用账号密码登录</Text>
                        </View>
                        <View style={{
                            flex: 1, height: (screenHeight - y+10), flexDirection: "column-reverse",
                            alignItems: "flex-end",backgroundColor:backgourndColor,
                        }} onLayout={this.onLayout}>
                            <Forward onPress={this.Psw} title="账号密码登录"
                                feasible={this.state.institution.length > 0} />
                        </View>
                    </View>
                    <View style={{ flex: 1 }} />
                </View>
                <Toast
                    ref="toast"
                    style={Styles.toast}
                    opacity={0.8}
                    position="top"
                    fadeOutDuration={1000}
                    textStyle={{ color: backgourndColor, fontSize: 20, fontWeight: "bold" }}
                />
            </KeyboardAwareScrollView>
        )
    }
}
export default InstitutionInitScreen;