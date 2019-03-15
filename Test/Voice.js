import { Synthesizer } from "react-native-speech-iflytek";
import React, { Component } from "react";
import { View, Button } from "react-native";

export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appId: "5c8a6d71",
        }
    }

    componentDidMount() {
        Synthesizer.init(this.state.appId);
    }

    start = () => {
        Synthesizer.start("东方红，太阳升，中国出了个毛泽东"+
        " 他为人民谋幸福，呼儿嗨哟，他是人民大救星"+
        "他为人民谋幸福，呼儿嗨哟，他是人民大救星"+
        " 毛主席，爱人民，他是我们的带路人"+
        "为了建设新中国，呼儿嗨哟，领导我们向前进"+
        " 为了建设新中国，呼儿嗨哟，领导我们向前进"+
        "共产党 ，像太阳，照到那里那里亮"+
        "那里有了共产党，呼儿嗨哟，那里人民得解放"+
        "那里有了共产党，呼儿嗨哟，那里人民得解放"+
        "东方红，太阳升，中国出了个毛泽东"+
        "他为人民谋幸福，呼儿嗨哟，他是人民大救星"+
        "他为人民谋幸福，呼儿嗨哟，他是人民大救星，大救星");
    }
    render() {
        return (
            <View>
                <Button title="开始" onPress={this.start} />
            </View>
        )
    }
}