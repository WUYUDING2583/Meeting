import React, { Component } from "react";
import { Image, View, ScrollView, Text, Dimensions } from "react-native";


class ImageSwiper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                './weather.jpg',
                './weather.jpg',
                './weather.jpg'
            ],
            pageIndex: 0,
            width: this.props.imageWidth,
            imageHeight: this.props.imageHeight,
        }
    }

    slide = (e) => {
        let offset = e.nativeEvent.contentOffset.x;           //获取x偏移量
        let DevWidth = this.state.width;
        let t = offset / DevWidth;              //通过偏移量计算出当前页码
        let index = t % 1 > 0.8 ? Math.floor(t) + 1 : Math.floor(t);
        this.setState({
            pageIndex: index
        })
    }

    setTimer = () => {
        let DevWidth = this.state.width;
        let images = this.state.images;
        this.timer = setInterval(() => {
            this.setState((preState) => { //更新pageIndex
                if (preState.pageIndex >= (images.length - 1)) { //如果页码越界则归零
                    return { pageIndex: 0 }
                } else {
                    return { pageIndex: preState.pageIndex + 1 } //否则页码加一
                }
            });

            // 让图片偏移到页码所对应的页面
            let offset = this.state.pageIndex * DevWidth;
            this.refs.scrollView.scrollTo({ x: offset, y: 0, animated: true });
        }, 4000)
    }

    stopTimer = () => {
        clearInterval(this.timer);
    }

    componentDidMount(){
        if(this.props.slide){
            this.setTimer();
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render() {
        let images = this.state.images;
        return (
            <View>
                <ScrollView ref="scrollView" horizontal={true} pagingEnabled={true}
                    showsHorizontalScrollIndicator={false} onMomentumScrollEnd={(e) => this.slide(e)}
                    onScrollBeginDrag={() => { this.stopTimer }} //开始拖拽停止定时器
                    onScrollEndDrag={() => { this.setTimer }} >
                    {images.map((item, index) => {
                        return (
                            <Image key={index} style={{ width: this.state.width, height: this.state.imageHeight, ...this.props.style }}
                                source={require('./weather.jpg')} />
                        )
                    })}
                </ScrollView>
                <View style={{ position: "absolute", top: this.state.imageHeight - 50, width: this.state.width }}>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        {images.length > 1 ? images.map((item, index) => {
                            if (index === this.state.pageIndex) {
                                return (<Text key={index} style={{ fontSize: 15, color: '#5cb0ff', margin: 5 }}>●</Text>)
                            } else {
                                return (<Text key={index} style={{ fontSize: 15, color: 'white', margin: 5 }}>●</Text>)
                            }
                        }) : null}
                    </View>
                </View>
            </View>
        );
    }

}

export default ImageSwiper;