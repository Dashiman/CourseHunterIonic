import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera/ngx';
import {IonicStorageModule} from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Backlight } from '@ionic-native/backlight/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AuthGuardService } from './auth';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule,
    HttpClientModule,
    

    IonicStorageModule.forRoot(),
    FormsModule],
  providers: [
    StatusBar,
    Camera,
    Vibration,
    Storage,AuthGuardService,
    YoutubeVideoPlayer,
    DatePicker,
    InAppBrowser,
    Backlight,
    AndroidPermissions,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
