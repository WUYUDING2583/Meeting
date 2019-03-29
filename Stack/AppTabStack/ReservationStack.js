import {
    createStackNavigator
} from 'react-navigation';
import InputInfoScreen from '../../App/Staff/Reservation/InputInfoScreen';
import RoomList from "./RoomList";
import HistoryPersonScreen from '../../App/HistoryPersonScreen';
import InputDetailScreen from '../../App/Staff/Reservation/InputDetailScreen';
import ReservationCompleteScreen from "../../App/Staff/Reservation/ReservationCompleteScreen";
import Global,{personType} from "../../Global";
import SelectScreen from '../../App/Visitor/SelectScreen';
import AddExternalScreen from '../../App/Staff/Reservation/AddExternalScreen';
import GroupListScreen from '../../App/Group/GroupListScreen';
import GroupDetailScreen from '../../App/Group/GroupDetailScreen';
import RoomListScreen from '../../App/Staff/Reservation/RoomListScreen';

const ReservationStack = createStackNavigator(
    {
        InputInfo: { screen: InputInfoScreen },
        RoomList: {
            screen: RoomListScreen,
            navigationOptions: ({ navigation }) => ({
                title: "可预约场地",
                headerStyle: {
                    elevation: 0,//去除导航的下部阴影
                },
            }),
        },
        HistoryPerson:{
            screen:HistoryPersonScreen,
            navigationOptions: ({ navigation }) => ({
                title: "选择与会人员",
                headerStyle: {
                    //elevation: 0,//去除导航的下部阴影
                },
            }),
        },
        InputDetail:{
            screen:InputDetailScreen,
        },
        ReservationComplete:{
            screen:ReservationCompleteScreen,
            navigationOptions: ({ navigation }) => ({
                header:null,
            }),
        },
        Select:{
            screen:SelectScreen,
            navigationOptions:({navigation})=>({
                title:"选择场地",
            })
        },
        AddExternal:{
            screen:AddExternalScreen,
            navigationOptions:({navigation})=>({
                title:"添加嘉宾信息",
            })
        },
        GroupList:{
            screen:GroupListScreen,
        },
        GroupDetail:{
            screen:GroupDetailScreen,
        }
    }
    ,
    {
        initialRouteName: "InputInfo",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
                fontWeight: 'normal',
            },
        },
    }
)

// const ReservationStack = createStackNavigator(
//     {
//         Main: {
//             screen: MainStack,
//         },
//         Scanner: {
//             screen: ScannerScreen,
//             navigationOptions: ({ navigation }) => ({
//                 tabBarVisible: false,
//             }),
//         },
//         RoomDetail:{
//             screen:RoomDetailScreen,
//             navigationOptions: ({ navigation }) => ({
//                 tabBarVisible: false,
//             }),
//         }
//     },
//     {
//         mode: 'modal',
//         headerMode: 'none',
//     }
// );

export default ReservationStack;