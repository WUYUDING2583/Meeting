package com.demo1;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.zphhhhh.speech.SpeechPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import org.wonday.aliyun.push.AliyunPushPackage;
import cn.qiuxiang.react.geolocation.AMapGeolocationPackage;
import cn.qiuxiang.react.baidumap.BaiduMapPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import cn.jystudio.local.barcode.recognizer.LocalBarcodeRecognizerPackage;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
// 下面是被添加的代码

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;


import com.alibaba.sdk.android.push.CloudPushService;
import com.alibaba.sdk.android.push.CommonCallback;
import com.alibaba.sdk.android.push.noonesdk.PushServiceFactory;
import com.alibaba.sdk.android.push.register.HuaWeiRegister;
import com.alibaba.sdk.android.push.register.MiPushRegister;
import com.alibaba.sdk.android.push.register.GcmRegister;
// 添加结束

public class MainApplication extends Application implements ReactApplication {


  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new SpeechPackage(),
            new ReactNativePushNotificationPackage(),
            new AliyunPushPackage(), 
        new AMapGeolocationPackage(), 
        new BaiduMapPackage(),
        new RNViewShotPackage(), 
        new LocalBarcodeRecognizerPackage(), 
        new SvgPackage(),
        new ImagePickerPackage(), 
        new RNCameraPackage(), 
        new VectorIconsPackage(), 
        new RNExitAppPackage(),
        new RNGestureHandlerPackage(), 
        new RNSpinkitPackage() 
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
 //下面是添加的代码
 this.initCloudChannel(this);
 //添加结束
  }
 // 下面是添加的代码
  /**
   * 初始化阿里云推送通道
   * @param applicationContext
   */
  private void initCloudChannel(final Context applicationContext) {

    // 创建notificaiton channel
    this.createNotificationChannel();
    PushServiceFactory.init(applicationContext);
    CloudPushService pushService = PushServiceFactory.getCloudPushService();
    pushService.setNotificationSmallIcon(100);//设置通知栏小图标， 需要自行添加
    pushService.register(applicationContext, "25826865", "c69951b1666a796335f877cba72f91ff", new CommonCallback() {
      @Override
      public void onSuccess(String responnse) {
        // success
      }
      @Override
      public void onFailed(String code, String message) {
        // failed
      }
    });

    // 注册方法会自动判断是否支持小米系统推送，如不支持会跳过注册。
    MiPushRegister.register(applicationContext, "小米AppID", "小米AppKey");
    // 注册方法会自动判断是否支持华为系统推送，如不支持会跳过注册。
    HuaWeiRegister.register(applicationContext);
    // 接入FCM/GCM初始化推送
    GcmRegister.register(applicationContext, "send_id", "application_id"); 
  }


  private void createNotificationChannel() {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
          NotificationManager mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
          // 通知渠道的id
          String id = "1";
          // 用户可以看到的通知渠道的名字.
          CharSequence name = "智会议";
          // 用户可以看到的通知渠道的描述
          String description = "您有一条通知";
          int importance = NotificationManager.IMPORTANCE_HIGH;
          NotificationChannel mChannel = new NotificationChannel(id, name, importance);
          // 配置通知渠道的属性
          mChannel.setDescription(description);
          // 设置通知出现时的闪灯（如果 android 设备支持的话）
          mChannel.enableLights(true);
          mChannel.setLightColor(Color.RED);
          // 设置通知出现时的震动（如果 android 设备支持的话）
          mChannel.enableVibration(true);
          mChannel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200, 400});
          //最后在notificationmanager中创建该通知渠道
          mNotificationManager.createNotificationChannel(mChannel);
      }
  }
  // 添加结束
}
