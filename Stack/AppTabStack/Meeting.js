import { createMaterialTopTabNavigator } from "react-navigation";
import HistoryReservationScreen from "../../App/Meeting/HistoryReservationScreen";
import PresentReservationScreen from "../../App/Meeting/PresentReservationScreen";
import { Dimensions } from "react-native";

export default Meeting = createMaterialTopTabNavigator({//在这里配置页面的路由
    Present: {
        screen: PresentReservationScreen,
        navigationOptions: {
            tabBarLabel: '当前',
        }
    },
    History: {
        screen: HistoryReservationScreen,
        navigationOptions: {
            tabBarLabel: '历史',
        }
    },
},
    {
        swipeEnabled: true,
        tabBarOptions: {
            upperCaseLabel: false,//是否使标签大写，默认为true
            scrollEnabled: false,//是否支持 选项卡滚动，默认false
            // activeTintColor: 'white',//label和icon的前景色 活跃状态下（选中）
            // inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
            style: {//设置整个TabBar的样式
                backgroundColor: 'white',//TabBar 的背景颜色
            },
            indicatorStyle: {//设置 indicator(tab下面的那条线)的样式
                height: 2,
                backgroundColor: 'black',
                minWidth:Dimensions.get("window").width/2,
                width:Dimensions.get("window").width/2,
                justifyContent: "space-evenly",
                
            },
            labelStyle: {//设置TabBar标签的样式
                fontSize: 13,
                marginTop: 6,
                marginBottom: 6,
                color: "black",
                width:Dimensions.get("window").width/2,
            },
            tabStyle: {//设置单个tab的样式
                minWidth: Dimensions.get("window").width / 2,
                justifyContent: "center",
            },
        },
    }
)