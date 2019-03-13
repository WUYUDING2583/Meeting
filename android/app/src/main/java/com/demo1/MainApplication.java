package com.demo1;

import android.app.Application;

import com.facebook.react.ReactApplication;
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

  }

}
