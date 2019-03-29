import {
    createMaterialTopTabNavigator
} from 'react-navigation';
import MyCreateGroupScreen from '../../App/Group/MyCreateGroupScreen';
import MyGroupListScreen from "../../App/Group/MyGroupListScreen";
import Global from "../../Global";

export default GroupStack = createMaterialTopTabNavigator({//在这里配置页面的路由
    MyCreate: {
        screen: MyCreateGroupScreen,
        navigationOptions: {
            tabBarLabel: '我创建的群',
        }
    },
    MyGroup: {
        screen: MyGroupListScreen,
        navigationOptions: {
            tabBarLabel: '我加入的群',
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
                minWidth:Global.gScreen.screen_width/2,
                width:Global.gScreen.screen_width/2,
                justifyContent: "space-evenly",
                
            },
            labelStyle: {//设置TabBar标签的样式
                fontSize: 13,
                marginTop: 6,
                marginBottom: 6,
                color: "black",
                width:Global.gScreen.screen_width/2,
            },
            tabStyle: {//设置单个tab的样式
                minWidth: Global.gScreen.screen_width / 2,
                justifyContent: "center",
            },
        },
    }
)