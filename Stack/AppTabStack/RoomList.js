import { createMaterialTopTabNavigator } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import RoomListScreen from "../../App/Staff/Reservation/RoomListScreen";
import RoomListStandbyScreen from "../../App/Staff/Reservation/RoomListStandbyScreen";
import { Dimensions } from "react-native";
import RoomListOutsideScreen from "../../App/Staff/Reservation/RoomListOutsideScreen";

export default RoomList = createMaterialTopTabNavigator({//在这里配置页面的路由
    Best: {
        screen: RoomListScreen,
        navigationOptions: {
            tabBarLabel: '推荐',
        }
    },
    Standby: {
        screen: RoomListStandbyScreen,
        navigationOptions: {
            tabBarLabel: '可用',
        }
    },
    Outside:{
        screen:RoomListOutsideScreen,
        navigationOptions: {
            tabBarLabel: '外部',
        }
    }
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
                minWidth:Dimensions.get("window").width/3,
                width:Dimensions.get("window").width/3,
                justifyContent: "space-evenly",
                
            },
            labelStyle: {//设置TabBar标签的样式
                fontSize: 13,
                marginTop: 6,
                marginBottom: 6,
                color: "black",
                width:Dimensions.get("window").width/3,
            },
            tabStyle: {//设置单个tab的样式
                minWidth: Dimensions.get("window").width / 3,
                justifyContent: "center",
            },
        },
    }
)