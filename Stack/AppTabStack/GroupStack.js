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

const GroupStack = createStackNavigator(
    {
        InputInfo: { screen: InputInfoScreen },
        RoomList: {
            screen: RoomList,
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
        }
    }
    ,
    {
        initialRouteName: Global.personInfo.personType==personType.staff?"InputInfo":"Select",
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

export default GroupStack;