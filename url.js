const app = `https://www.jsjzx.top/smr-0.0.1-SNAPSHOT`;

function encodeFilter(filter) {
    return encodeURIComponent(JSON.stringify(filter));
}
export const QRCType={
    meeting:200,
}
export default {
    //发送验证码
    sendVerifyMsg: (phone) => app + `/visitor/sendMess?phone=${phone}`,
    //职员登录
    staffLogin: (jobnum, pswd, company) => app + `/staff/alogin?jobnum=${jobnum}&pswd=${pswd}&company=${company}`,
    //验证游客账号
    verifyVisitor:(phone)=>app+`/visitor/alogin?phone=${phone}`,
    //游客注册
    visitorRegister: () => app + `/visitor/regist`,
    //获取会议室详情--职员
    getPlaceMsgStaff: (id) => app + `/place/staff/getPlaceMess?id=${id}`,
    //获取场地详情--游客
    getPlaceMsgVisitor:(id)=>app+`/place/visitor/getPlaceMess?id=${id}`,
    //返回可用会议室列表--职员
    getPlaceListStaff:()=>app+`/place/staff/getRecommendList`,
    //返回可用场地列表--游客
    getPlaceListVisitor:()=>app+`/place/visitor/getRecommendList`,
    //获取历史与会人员
    getHistoryPerson:(staff_id)=>app+`/staff/getPersonFromHistory?staff_id=${staff_id}`,
    //添加与会人员
    addAttendee:()=>app+`/conference/staff/addAttendPerson`,
    //查看近期会议--职员
    getRecentArrangeStaff:(personId)=>app+`/conference/staff/getRecently?personId=${personId}`,
    //查看近期行程--游客
    getRecentArrangeVisitor:(personId)=>app+`/conference/visitor/getRecently?personId=${personId}`,
    //查看历史会议--职员
    getHistoryArrangeStaff:(personId)=>app+`/conference/staff/getHistory?personId=${personId}`,
    //查看历史行程--游客
    getHistoryArrangeVisitor:(personId)=>app+`/conference/visitor/getHistory?personId=${personId}`,
    //预约会议--职员
    makeReservationStaff:()=>app+`/conference/staff/appointment`,
    //预约行程--游客
    makeReservationVisitor:()=>app+`/conference/visitor/appointment`,
    //取消预约
    cancelArrange:(appointmentId)=>app+`/conference/cancelAppointment?appointmentId=${appointmentId}`,
    //查看个人预约会议--职员
    getAppointmentStaff:(personId)=>app+`/conference/staff/getAppointment?personId=${personId}`,
    //查看个人预约--游客
    getAppointmentVisitor:(personId)=>app+`/conference/visitor/getAppointment?personId=${personId}`,
    //人脸登录
    faceLogin:()=>app+`/face/login`,
    //人脸认证
    faceVerify:()=>app+`/face/addFaceInfo`,
    //获取公司列表
    getCompanyList:(name)=>app+`/company/getCompany?name=${name}`,
}
