import { Dimensions, Platform, StatusBar, PixelRatio } from 'react-native';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const { width, height } = Dimensions.get('window');
const OS = Platform.OS;
const ios = (OS == 'ios');
const android = (OS == 'android');
const isIPhoneX = (ios && height == 812 && width == 375);
const statusBarHeight = (ios ? (isIPhoneX ? 44 : 20) : StatusBar.currentHeight);


global.gScreen = {
  screen_width: width,
  screen_height: height,
  statusBarHeight: statusBarHeight,
  onePixelRatio: 1 / PixelRatio.get(),
}

global.gDevice = {
  ios: ios,
  android: android,
  isIPhoneX: isIPhoneX,
}


export const personType = {
  staff: 1,
  visitor: 2,
}
global.personInfo = false;
// {
//   companyId: 1,//游客无此属性
//   id: 1,
//   name: "吴宇丁",
//   sex: "男",
//   isIdentified: true,
//   personType: personType.staff,
//   portrait: null,
// };//false

global.company = "";
global.jobnum = "";

global.phone = "";

let storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24 * 7,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // 你可以在构造函数这里就写好sync的方法
  // 或是在任何时候，直接对storage.sync进行赋值修改
  // 或是写到另一个文件里，这里require引入
  // sync: require('你可以另外写一个文件专门处理sync')

})

global.storage = storage;

//会议室详情
global.roomDetail = [
  {
    id: 92,
    companyId: 1,
    company_name: '玉环县木城包装有限公司',
    type: 'F',
    name: '文501',
    address: '文学楼',
    introduction: '会议室',
    device: '麦克风',
    instruction: '不可损坏设备',
    cost: '0',
    capacity: 120,
    tag: '会议室',
    distance: 0,
    scheduleLength: 0,
    company:
    {
      id: 1,
      name: '玉环县木城包装有限公司',
      address: '玉环市楚门镇城郊村',
      register_num: '91331021MA29YH5M20',
      introduction: '包装用木箱、金属包装容器、托盘、日用不锈钢制品、家具、建筑及家具用金属配件制造、加工、销售。',
      head_name: '孙才兵',
      head_phone: '13589745684',
      open_time: '08:00:00',
      close_time: '20:40:00'
    },
    portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/100.jpg" }]
  },
  {
    id: 94,
    companyId: 1,
    company_name: '玉环县木城包装有限公司',
    type: 'F',
    name: '法学201',
    address: '法学楼',
    introduction: '会议室',
    device: '麦克风',
    instruction: '不可损坏设备',
    cost: '0',
    capacity: 40,
    tag: '会议室',
    distance: 0,
    scheduleLength: 0,
    company:
    {
      id: 1,
      name: '玉环县木城包装有限公司',
      address: '玉环市楚门镇城郊村',
      register_num: '91331021MA29YH5M20',
      introduction: '包装用木箱、金属包装容器、托盘、日用不锈钢制品、家具、建筑及家具用金属配件制造、加工、销售。',
      head_name: '孙才兵',
      head_phone: '13589745684',
      open_time: '08:00:00',
      close_time: '20:40:00'
    },
    portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/50.jpg" }],
  },
  {
    id: 96,
    companyId: 1,
    company_name: '玉环县木城包装有限公司',
    type: 'F',
    name: '法学401',
    address: '法学楼',
    introduction: '会议室',
    device: '麦克风',
    instruction: '不可损坏设备',
    cost: '0',
    capacity: 80,
    tag: '会议室',
    distance: 0,
    scheduleLength: 0,
    company:
    {
      id: 1,
      name: '玉环县木城包装有限公司',
      address: '玉环市楚门镇城郊村',
      register_num: '91331021MA29YH5M20',
      introduction: '包装用木箱、金属包装容器、托盘、日用不锈钢制品、家具、建筑及家具用金属配件制造、加工、销售。',
      head_name: '孙才兵',
      head_phone: '13589745684',
      open_time: '08:00:00',
      close_time: '20:40:00'
    },
    portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/100.1.jpg" }],
  },
  {
    id: 87,
    companyId: 1,
    company_name: '玉环县木城包装有限公司',
    type: 'E',
    name: '图501',
    address: '图书馆',
    introduction: '会议室',
    device: '麦克风',
    instruction: '不可损坏设备',
    cost: '0',
    capacity: 120,
    tag: '会议室',
    distance: 0,
    scheduleLength: 0,
    company:
    {
      id: 1,
      name: '玉环县木城包装有限公司',
      address: '玉环市楚门镇城郊村',
      register_num: '91331021MA29YH5M20',
      introduction: '包装用木箱、金属包装容器、托盘、日用不锈钢制品、家具、建筑及家具用金属配件制造、加工、销售。',
      head_name: '孙才兵',
      head_phone: '13589745684',
      open_time: '08:00:00',
      close_time: '20:40:00'
    },
    portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/100.2.jpg" }],
  }, {
    id: 89,
    companyId: 1,
    company_name: '玉环县木城包装有限公司',
    type: 'E',
    name: '文201',
    address: '文学楼',
    introduction: '会议室',
    device: '麦克风',
    instruction: '不可损坏设备',
    cost: '0',
    capacity: 40,
    tag: '会议室',
    distance: 0,
    scheduleLength: 0,
    company:
    {
      id: 1,
      name: '玉环县木城包装有限公司',
      address: '玉环市楚门镇城郊村',
      register_num: '91331021MA29YH5M20',
      introduction: '包装用木箱、金属包装容器、托盘、日用不锈钢制品、家具、建筑及家具用金属配件制造、加工、销售。',
      head_name: '孙才兵',
      head_phone: '13589745684',
      open_time: '08:00:00',
      close_time: '20:40:00'
    },
    portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/50.1.jpg" }],
  },
  {
    id: 91,
    companyId: 1,
    company_name: '玉环县木城包装有限公司',
    type: 'E',
    name: '文401',
    address: '文学楼',
    introduction: '会议室',
    device: '麦克风',
    instruction: '不可损坏设备',
    cost: '0',
    capacity: 80,
    tag: '会议室',
    distance: 0,
    scheduleLength: 0,
    company:
    {
      id: 1,
      name: '玉环县木城包装有限公司',
      address: '玉环市楚门镇城郊村',
      register_num: '91331021MA29YH5M20',
      introduction: '包装用木箱、金属包装容器、托盘、日用不锈钢制品、家具、建筑及家具用金属配件制造、加工、销售。',
      head_name: '孙才兵',
      head_phone: '13589745684',
      open_time: '08:00:00',
      close_time: '20:40:00'
    },
    portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/100.2.jpg" }],
  },
  {
    id: 83,
    companyId: 1,
    company_name: '玉环县木城包装有限公司',
    type: 'D',
    name: '图101',
    address: '图书馆',
    introduction: '会议室',
    device: '麦克风',
    instruction: '不可损坏设备',
    cost: '0',
    capacity: 20,
    tag: '会议室',
    distance: 0,
    scheduleLength: 0,
    company:
    {
      id: 1,
      name: '玉环县木城包装有限公司',
      address: '玉环市楚门镇城郊村',
      register_num: '91331021MA29YH5M20',
      introduction: '包装用木箱、金属包装容器、托盘、日用不锈钢制品、家具、建筑及家具用金属配件制造、加工、销售。',
      head_name: '孙才兵',
      head_phone: '13589745684',
      open_time: '08:00:00',
      close_time: '20:40:00'
    },
    portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/20.1.jpg" }],
  },

];

//历史与会人员
global.historyPerson = [


  {
    id: 3,
    identity: "staff",
    name: "孔春柔",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 4,
    identity: "staff",
    name: "谭志诚",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 5,
    identity: "staff",
    name: "钱永元",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 6,
    identity: "staff",
    name: "马沛岚",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 7,
    identity: "staff",
    name: "顾安福",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 8,
    identity: "staff",
    name: "任欣怿",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 9,
    identity: "staff",
    name: "孟笑萍",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 10,
    identity: "staff",
    name: "梁修明",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 11,
    identity: "staff",
    name: "蒋弘文",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  }, {
    id: 2,
    identity: "staff",
    name: "陆凝丹",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 12,
    identity: "staff",
    name: "潘凯唱",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 13,
    identity: "staff",
    name: "龙安白",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 14,
    identity: "staff",
    name: "梁宛秋",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 15,
    identity: "staff",
    name: "田初瑶",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 17,
    identity: "staff",
    name: "程曼岚",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 18,
    identity: "staff",
    name: "朱曼云",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 23,
    identity: "staff",
    name: "周寻菱",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 24,
    identity: "staff",
    name: "孟安宁",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 61,
    identity: "staff",
    name: "水安然",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 69,
    identity: "staff",
    name: "康红叶",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 70,
    identity: "staff",
    name: "刘再海",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 71,
    identity: "staff",
    name: "王志宏",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 72,
    identity: "staff",
    name: "石建军",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 73,
    identity: "staff",
    name: "刘再海",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 74,
    identity: "staff",
    name: "高桂清",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 76,
    identity: "staff",
    name: "王志宏",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 77,
    identity: "staff",
    name: "吕德厚",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 78,
    identity: "staff",
    name: "毕楷瑞",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 79,
    identity: "staff",
    name: "卫熙茂",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 80,
    identity: "staff",
    name: "彭雅量",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 81,
    identity: "staff",
    name: "尤天佑",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 82,
    identity: "staff",
    name: "钱雄强",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 83,
    identity: "staff",
    name: "严英杰",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 84,
    identity: "staff",
    name: "邬熙华",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 85,
    identity: "staff",
    name: "窦弘文",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 86,
    identity: "staff",
    name: "金黎昕",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 87,
    identity: "staff",
    name: "喻雅畅",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 88,
    identity: "staff",
    name: "孔伟诚",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 89,
    identity: "staff",
    name: "时欣欣",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 90,
    identity: "staff",
    name: "袁宣朗",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 91,
    identity: "staff",
    name: "韩浩",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 92,
    identity: "staff",
    name: "郎嘉懿",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 93,
    identity: "staff",
    name: "严雄博",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 94,
    identity: "staff",
    name: "方越泽",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 95,
    identity: "staff",
    name: "秦芳泽",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 96,
    identity: "staff",
    name: "范红云",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 97,
    identity: "staff",
    name: "顾慧雅",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 98,
    identity: "staff",
    name: "孟丹红",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 99,
    identity: "staff",
    name: "鲁红螺",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 100,
    identity: "staff",
    name: "方和美",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 101,
    identity: "staff",
    name: "王歌飞",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 102,
    identity: "staff",
    name: "花芳菲",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 103,
    identity: "staff",
    name: "姜芳馨",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 104,
    identity: "staff",
    name: "韦格格",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 105,
    identity: "staff",
    name: "赵和雅",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 106,
    identity: "staff",
    name: "邬芳馥",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 107,
    identity: "staff",
    name: "余待永",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 108,
    identity: "staff",
    name: "杨正祥",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 109,
    identity: "staff",
    name: "杨文军",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 110,
    identity: "staff",
    name: "姚海林",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 111,
    identity: "staff",
    name: "佘彪",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 112,
    identity: "staff",
    name: "温鉴苏",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 113,
    identity: "staff",
    name: "魏霁烁",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 114,
    identity: "staff",
    name: "顾箭髹",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 115,
    identity: "staff",
    name: "巫锁",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  },
  {
    id: 116,
    identity: "staff",
    name: "任无",
    portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
  }
]



//可用会议室列表
global.best = [{
  id: 92,
  name: '文501',
  address: '文学楼',
  introduction: '会议室',
  device: '麦克风',
  instruction: '不可损坏设备',
  capacity: 120,
  type: 'F',
  distance: 200,
  portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/100.jpg" }]
},
{
  id: 94,
  name: '法学201',
  address: '法学楼',
  introduction: '会议室',
  device: '麦克风',
  instruction: '不可损坏设备',
  capacity: 40,
  type: 'F',
  distance: 200,
  portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/50.jpg" }]
},
{
  id: 96,
  name: '法学401',
  address: '法学楼',
  introduction: '会议室',
  device: '麦克风',
  instruction: '不可损坏设备',
  capacity: 80,
  type: 'F',
  distance: 300,
  portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/100.1.jpg" }]
},
{
  id: 87,
  name: '图501',
  address: '图书馆',
  introduction: '会议室',
  device: '麦克风',
  instruction: '不可损坏设备',
  capacity: 120,
  type: 'E',
  distance: 350,
  portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/100.2.jpg" }]
},
{
  id: 89,
  name: '文201',
  address: '文学楼',
  introduction: '会议室',
  device: '麦克风',
  instruction: '不可损坏设备',
  capacity: 40,
  type: 'E',
  distance: 400,
  portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/50.1.jpg" }]
},
{
  id: 91,
  name: '文401',
  address: '文学楼',
  introduction: '会议室',
  device: '麦克风',
  instruction: '不可损坏设备',
  capacity: 80,
  type: 'E',
  distance: 500,
  portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/100.2.jpg" }]
},
{
  id: 83,
  name: '图101',
  address: '图书馆',
  introduction: '会议室',
  device: '麦克风',
  instruction: '不可损坏设备',
  capacity: 20,
  type: 'D',
  distance: 600,
  portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/20.1.jpg" }]
},
];

//我的群组
global.groupList = [
  {
    id: 8,
    groupLeader: 2,
    groupStyle: '永久',
    groupName: '无敌小分队1',
    groupMembers:
      [{
        groupId: 8,
        id: 2,
        identity: 'staff',
        name: '陆凝丹',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      }]
  }, {
    id: 9,
    groupLeader: 2,
    groupStyle: '永久',
    groupName: '无敌小分队2',
    groupMembers:
      [{
        groupId: 9,
        id: 2,
        identity: 'staff',
        name: '陆凝丹',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      }]
  }, {
    id: 10,
    groupLeader: 5,
    groupStyle: '永久',
    groupName: '无敌小分队3',
    groupMembers:
      [{
        groupId: 8,
        id: 2,
        identity: 'staff',
        name: '陆凝丹',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        id: 5,
        identity: "staff",
        name: "钱永元",
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        id: 6,
        identity: "staff",
        name: "马沛岚",
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        id: 10,
        identity: "staff",
        name: "梁修明",
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        id: 11,
        identity: "staff",
        name: "蒋弘文",
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      ]
  }, {
    id: 11,
    groupLeader: 2,
    groupStyle: '永久',
    groupName: '无敌小分队4',
    groupMembers:
      [{
        groupId: 8,
        id: 2,
        identity: 'staff',
        name: '陆凝丹',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      }]
  }, {
    id: 12,
    groupLeader: 1,
    groupStyle: '永久',
    groupName: '无敌小分队5',
    groupMembers:
      [
        {
          groupId: 8,
          id: 2,
          identity: 'staff',
          name: '陆凝丹',
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
        },
        {
          groupId: 8,
          id: 1,
          identity: 'staff',
          name: '付初露',
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
        },
        {
          id: 13,
          identity: "staff",
          name: "龙安白",
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
        },
        {
          id: 14,
          identity: "staff",
          name: "梁宛秋",
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
        },
        {
          id: 15,
          identity: "staff",
          name: "田初瑶",
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
        },
        {
          id: 17,
          identity: "staff",
          name: "程曼岚",
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
        },
        {
          id: 18,
          identity: "staff",
          name: "朱曼云",
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
        },
        {
          id: 23,
          identity: "staff",
          name: "周寻菱",
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
        },
        {
          id: 24,
          identity: "staff",
          name: "孟安宁",
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
        },
        {
          id: 61,
          identity: "staff",
          name: "丁冬芹",
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
        },
        {
          id: 70,
          identity: "staff",
          name: "刘再海",
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
        },
        {
          id: 71,
          identity: "staff",
          name: "王志宏",
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
        },
        {
          id: 72,
          identity: "staff",
          name: "石建军",
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
        },
        {
          id: 73,
          identity: "staff",
          name: "刘再海",
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
        },
      ]
  }, {
    id: 13,
    groupLeader: 2,
    groupStyle: '永久',
    groupName: '无敌小分队6',
    groupMembers:
      [{
        groupId: 8,
        id: 2,
        identity: 'staff',
        name: '陆凝丹',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        id: 8,
        identity: "staff",
        name: "任欣怿",
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        id: 9,
        identity: "staff",
        name: "孟笑萍",
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        id: 17,
        identity: "staff",
        name: "程曼岚",
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        id: 18,
        identity: "staff",
        name: "朱曼云",
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        id: 70,
        identity: "staff",
        name: "刘再海",
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      ]
  }, {
    id: 14,
    groupLeader: 2,
    groupStyle: '永久',
    groupName: '无敌小分队7',
    groupMembers:
      [{
        groupId: 8,
        id: 2,
        identity: 'staff',
        name: '陆凝丹',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      }]
  }, {
    id: 15,
    groupLeader: 8,
    groupStyle: '永久',
    groupName: '无敌小分队8',
    groupMembers:
      [{
        groupId: 8,
        id: 2,
        identity: 'staff',
        name: '陆凝丹',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        id: 8,
        identity: "staff",
        name: "任欣怿",
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        id: 9,
        identity: "staff",
        name: "孟笑萍",
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        id: 10,
        identity: "staff",
        name: "梁修明",
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        id: 11,
        identity: "staff",
        name: "蒋弘文",
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      ]
  }, {
    id: 6,
    groupLeader: 61,
    groupStyle: '永久',
    groupName: '无敌小分队9',
    groupMembers:
      [{
        groupId: 8,
        id: 2,
        identity: 'staff',
        name: '陆凝丹',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      }, {
        id: 61,
        identity: "staff",
        name: "丁冬芹",
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      }, {
        id: 74,
        identity: "staff",
        name: "高桂清",
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        id: 76,
        identity: "staff",
        name: "王志宏",
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },]
  }, {
    id: 17,
    groupLeader: 2,
    groupStyle: '永久',
    groupName: '无敌小分队10',
    groupMembers:
      [{
        groupId: 8,
        id: 2,
        identity: 'staff',
        name: '陆凝丹',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      }]
  },
  {
    id: 18,
    groupLeader: 7,
    groupStyle: '永久',
    groupName: '无敌小分队11',
    groupMembers:
      [
        {
          groupId: 8,
          id: 2,
          identity: 'staff',
          name: '陆凝丹',
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
        },
        {
          groupId: 8,
          id: 1,
          identity: 'staff',
          name: '付初露',
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
        },
        {
          id: 7,
          identity: 'staff',
          name: "顾安福",
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
        },
      ],
  },
  {
    id: 19,
    groupLeader: 2,
    groupStyle: '永久',
    groupName: '咏算子',
    groupMembers:
      [{
        groupId: 8,
        id: 2,
        identity: 'staff',
        name: '顾安福',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        groupId: 8,
        id: 3,
        identity: 'staff',
        name: '田初瑶',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        groupId: 8,
        id: 5,
        identity: 'staff',
        name: '钱永元',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        groupId: 8,
        id: 7,
        identity: 'staff',
        name: '任欣怿',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },]
  },
  {
    id: 20,
    groupLeader: 3,
    groupStyle: '永久',
    groupName: '清平乐',
    groupMembers:
      [{
        groupId: 8,
        id: 2,
        identity: 'staff',
        name: '顾安福',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      }, {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        groupId: 8,
        id: 3,
        identity: 'staff',
        name: '田初瑶',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },]
  },
  {
    id: 21,
    groupLeader: 3,
    groupStyle: '永久',
    groupName: '菩萨蛮',
    groupMembers:
      [{
        groupId: 8,
        id: 2,
        identity: 'staff',
        name: '顾安福',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      }, {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        groupId: 8,
        id: 3,
        identity: 'staff',
        name: '田初瑶',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },]
  },
  {
    id: 22,
    groupLeader: 3,
    groupStyle: '永久',
    groupName: '破阵子',
    groupMembers:
      [{
        groupId: 4,
        id: 2,
        identity: 'staff',
        name: '朱曼云',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      }, {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        groupId: 8,
        id: 3,
        identity: 'staff',
        name: '田初瑶',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        groupId: 8,
        id: 5,
        identity: 'staff',
        name: '周寻菱',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },]
  },
  {
    id: 23,
    groupLeader: 2,
    groupStyle: '永久',
    groupName: '永遇乐',
    groupMembers:
      [{
        groupId: 4,
        id: 2,
        identity: 'staff',
        name: '朱曼云',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      }, {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        groupId: 8,
        id: 3,
        identity: 'staff',
        name: '田初瑶',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },]
  },
  {
    id: 124,
    groupLeader: 9,
    groupStyle: '永久',
    groupName: '声声慢',
    groupMembers:
      [{
        groupId: 4,
        id: 2,
        identity: 'staff',
        name: '朱曼云',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      }, {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        groupId: 8,
        id: 5,
        identity: 'staff',
        name: '周寻菱',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },]
  },
  {
    id: 24,
    groupLeader: 3,
    groupStyle: '永久',
    groupName: '雨霖铃',
    groupMembers:
      [{
        groupId: 4,
        id: 2,
        identity: 'staff',
        name: '朱曼云',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      }, {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        groupId: 8,
        id: 3,
        identity: 'staff',
        name: '田初瑶',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },]
  },
  {
    id: 25,
    groupLeader: 1,
    groupStyle: '永久',
    groupName: '鹊桥仙',
    groupMembers:
      [{
        groupId: 4,
        id: 2,
        identity: 'staff',
        name: '高桂清',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      }, {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        groupId: 8,
        id: 3,
        identity: 'staff',
        name: '卫熙茂',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        groupId: 8,
        id: 67,
        identity: 'staff',
        name: '孔伟诚',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },]
  },
  {
    id: 252,
    groupLeader: 5,
    groupStyle: '永久',
    groupName: '临江仙',
    groupMembers:
      [{
        groupId: 4,
        id: 2,
        identity: 'staff',
        name: '高桂清',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      }, {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        groupId: 8,
        id: 5,
        identity: 'staff',
        name: '孔伟诚',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },]
  },
  {
    id: 26,
    groupLeader: 1,
    groupStyle: '永久',
    groupName: '卜算子',
    groupMembers:
      [
        {
          groupId: 8,
          id: 3,
          identity: 'staff',
          name: '卫熙茂',
          protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
        }, {
          groupId: 8,
          id: 1,
          identity: 'staff',
          name: '付初露',
          portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
        },
        {
          groupId: 8,
          id: 5,
          identity: 'staff',
          name: '孔伟诚',
          protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
        },]
  },
  {
    id: 27,
    groupLeader: 4,
    groupStyle: '永久',
    groupName: '鹊桥仙',
    groupMembers:
      [{
        groupId: 4,
        id: 2,
        identity: 'staff',
        name: '高桂清',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      }, {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        groupId: 8,
        id: 3,
        identity: 'staff',
        name: '卫熙茂',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      }]
  },
  {
    id: 28,
    groupLeader: 1,
    groupStyle: '永久',
    groupName: '枕草子',
    groupMembers:
      [{
        groupId: 4,
        id: 2,
        identity: 'staff',
        name: '高桂清',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      }, {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        groupId: 8,
        id: 3,
        identity: 'staff',
        name: '袁宣朗',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        groupId: 8,
        id: 5,
        identity: 'staff',
        name: '孔伟诚',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },]
  },
  {
    id: 29,
    groupLeader: 5,
    groupStyle: '永久',
    groupName: '满江红',
    groupMembers:
      [{
        groupId: 4,
        id: 2,
        identity: 'staff',
        name: '顾慧雅',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      }, {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        groupId: 8,
        id: 3,
        identity: 'staff',
        name: '袁宣朗',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        groupId: 8,
        id: 5,
        identity: 'staff',
        name: '孔伟诚',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },]
  },
  {
    id: 30,
    groupLeader: 1,
    groupStyle: '永久',
    groupName: '声声慢',
    groupMembers:
      [{
        groupId: 4,
        id: 2,
        identity: 'staff',
        name: '顾慧雅',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      }, {
        groupId: 8,
        id: 1,
        identity: 'staff',
        name: '付初露',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        groupId: 8,
        id: 3,
        identity: 'staff',
        name: '袁宣朗',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },
      {
        groupId: 8,
        id: 5,
        identity: 'staff',
        name: '鲁红螺',
        protraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }],
      },]
  },
];

global.presentMeeting = [
  {
    appointmentId: 183,
    place: '文201',
    address: '文学楼楼',
    start_time: '2019-05-27 15:30:00',
    end_time: '2019-05-27 16:30:00',
    introduction: '服务外包第一次讨论',
    organizer: '付初露',
    phone: '15984565488',
    attendees:
      [{
        id: 9,
        appointmentId: 183,
        personId: 1,
        name: '付初露',
        identity: 'staff',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'staff',
        name: '陆凝丹',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'visitor',
        name: '吴宇丁',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/1.jpg" }]
      },
      {
        personId: 113,
        identity: "staff",
        name: "魏霁烁",
        portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
      },
      {
        personId: 114,
        identity: "staff",
        name: "顾箭髹",
        portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
      },
      ]
  },
  {
    appointmentId: 173,
    place: '文201',
    address: '文学楼楼',
    start_time: '2019-05-27 08:30:00',
    end_time: '2019-05-27 09:30:00',
    introduction: '服务外包第二次讨论',
    organizer: '付初露',
    phone: '15984565488',
    attendees:
      [{
        id: 9,
        appointmentId: 183,
        personId: 1,
        name: '付初露',
        identity: 'staff',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'staff',
        name: '陆凝丹',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'visitor',
        name: '吴宇丁',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/1.jpg" }]
      }
      ]
  },
  {
    appointmentId: 153,
    place: '文201',
    address: '文学楼楼',
    start_time: '2019-05-28 15:30:00',
    end_time: '2019-05-28 16:30:00',
    introduction: '服务外包第三次讨论',
    organizer: '付初露',
    phone: '15984565488',
    attendees:
      [{
        id: 9,
        appointmentId: 183,
        personId: 1,
        name: '付初露',
        identity: 'staff',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'staff',
        name: '陆凝丹',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'visitor',
        name: '吴宇丁',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/1.jpg" }]
      }
      ]
  },
  {
    appointmentId: 114,
    place: '文201',
    address: '文学楼楼',
    start_time: '2019-05-29 15:30:00',
    end_time: '2019-05-29 16:30:00',
    introduction: '服务外包最后一次讨论',
    organizer: '付初露',
    phone: '15984565488',
    attendees:
      [{
        id: 9,
        appointmentId: 183,
        personId: 1,
        name: '付初露',
        identity: 'staff',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'staff',
        name: '陆凝丹',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'visitor',
        name: '吴宇丁',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/1.jpg" }]
      },
      {
        personId: 109,
        identity: "staff",
        name: "杨文军",
        portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
      },
      {
        personId: 110,
        identity: "staff",
        name: "姚海林",
        portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
      },
      ]
  }
]

global.myAppoint = [
  {
    appointmentId: 183,
    place: '文201',
    address: '文学楼楼',
    start_time: '2019-05-27 15:30:00',
    end_time: '2019-05-27 16:30:00',
    introduction: '服务外包第一次讨论',
    organizer: '付初露',
    phone: '15984565488',
    attendees:
      [{
        id: 9,
        appointmentId: 183,
        personId: 1,
        name: '付初露',
        identity: 'staff',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'staff',
        name: '陆凝丹',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'visitor',
        name: '吴宇丁',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/1.jpg" }]
      },
      {
        personId: 113,
        identity: "staff",
        name: "魏霁烁",
        portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
      },
      {
        personId: 114,
        identity: "staff",
        name: "顾箭髹",
        portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
      },
      ]
  },
  {
    appointmentId: 173,
    place: '文201',
    address: '文学楼楼',
    start_time: '2019-05-27 08:30:00',
    end_time: '2019-05-27 09:30:00',
    introduction: '服务外包第二次讨论',
    organizer: '付初露',
    phone: '15984565488',
    attendees:
      [{
        id: 9,
        appointmentId: 183,
        personId: 1,
        name: '付初露',
        identity: 'staff',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'staff',
        name: '陆凝丹',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'visitor',
        name: '吴宇丁',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/1.jpg" }]
      }
      ]
  },
  {
    appointmentId: 153,
    place: '文201',
    address: '文学楼楼',
    start_time: '2019-05-28 15:30:00',
    end_time: '2019-05-28 16:30:00',
    introduction: '服务外包第三次讨论',
    organizer: '付初露',
    phone: '15984565488',
    attendees:
      [{
        id: 9,
        appointmentId: 183,
        personId: 1,
        name: '付初露',
        identity: 'staff',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'staff',
        name: '陆凝丹',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'visitor',
        name: '吴宇丁',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/1.jpg" }]
      }
      ]
  },
  {
    appointmentId: 114,
    place: '文201',
    address: '文学楼楼',
    start_time: '2019-05-29 15:30:00',
    end_time: '2019-05-29 16:30:00',
    introduction: '服务外包最后一次讨论',
    organizer: '付初露',
    phone: '15984565488',
    attendees:
      [{
        id: 9,
        appointmentId: 183,
        personId: 1,
        name: '付初露',
        identity: 'staff',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'staff',
        name: '陆凝丹',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'visitor',
        name: '吴宇丁',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/1.jpg" }]
      },
      {
        personId: 109,
        identity: "staff",
        name: "杨文军",
        portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
      },
      {
        personId: 110,
        identity: "staff",
        name: "姚海林",
        portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
      },
      ]
  }
];

global.historyMeeting = [
  {
    appointmentId: 1453,
    place: '天A201',
    address: '天楼',
    start_time: '2019-03-21T01:44:00.000+0000',
    end_time: '2019-03-21T02:44:00.000+0000',
    introduction: '好纠结',
    organizer: '付初露',
    phone: '15984565488',
    attendees:
      [{
        id: 9,
        appointmentId: 183,
        personId: 1,
        name: '付初露',
        identity: 'staff',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'staff',
        name: '陆凝丹',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      }
      ]
  },
  {
    appointmentId: 183,
    place: '文201',
    address: '文学楼楼',
    start_time: '2019-01-27 15:30:00',
    end_time: '2019-01-27 16:30:00',
    introduction: '服务外包第一次讨论',
    organizer: '付初露',
    phone: '15984565488',
    attendees:
      [{
        id: 9,
        appointmentId: 183,
        personId: 1,
        name: '付初露',
        identity: 'staff',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'staff',
        name: '陆凝丹',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'visitor',
        name: '吴宇丁',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/1.jpg" }]
      },
      {
        personId: 113,
        identity: "staff",
        name: "魏霁烁",
        state: '出席',
        portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
      },
      {
        personId: 114,
        identity: "staff",
        name: "顾箭髹",
        state: '出席',
        portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
      },
      ]
  },
  {
    appointmentId: 173,
    place: '文201',
    address: '文学楼楼',
    start_time: '2019-02-27 08:30:00',
    end_time: '2019-02-27 09:30:00',
    introduction: '服务外包第二次讨论',
    organizer: '付初露',
    phone: '15984565488',
    attendees:
      [{
        id: 9,
        appointmentId: 183,
        personId: 1,
        name: '付初露',
        identity: 'staff',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'staff',
        name: '陆凝丹',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'visitor',
        name: '吴宇丁',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/1.jpg" }]
      }
      ]
  },
  {
    appointmentId: 153,
    place: '文201',
    address: '文学楼楼',
    start_time: '2019-02-28 15:30:00',
    end_time: '2019-02-28 16:30:00',
    introduction: '服务外包第三次讨论',
    organizer: '付初露',
    phone: '15984565488',
    attendees:
      [{
        id: 9,
        appointmentId: 183,
        personId: 1,
        name: '付初露',
        identity: 'staff',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'staff',
        name: '陆凝丹',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'visitor',
        name: '吴宇丁',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/1.jpg" }]
      }
      ]
  },
  {
    appointmentId: 114,
    place: '文201',
    address: '文学楼楼',
    start_time: '2019-01-29 15:30:00',
    end_time: '2019-01-29 16:30:00',
    introduction: '服务外包最后一次讨论',
    organizer: '付初露',
    phone: '15984565488',
    attendees:
      [{
        id: 9,
        appointmentId: 183,
        personId: 1,
        name: '付初露',
        identity: 'staff',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/33.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'staff',
        name: '陆凝丹',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/weather.jpg" }]
      },
      {
        id: 9,
        appointmentId: 183,
        personId: 2,
        identity: 'visitor',
        name: '吴宇丁',
        state: '出席',
        portraits: [{ uri: "https://www.jsjzx.top/Volunteer/Images/1.jpg" }]
      },
      {
        personId: 109,
        identity: "staff",
        name: "杨文军",
        state: '出席',
        portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
      },
      {
        personId: 110,
        identity: "staff",
        name: "姚海林",
        state: '出席',
        portraits: [{ uri: 'https://www.jsjzx.top/Volunteer/Images/weather.jpg' }]
      },
      ]
  }
]
export default global;