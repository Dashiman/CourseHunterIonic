import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  isExpanded = false;
  authority: number;
  username: string;
  lang:string;
  requestCount:number;
  userId:number;
  isLoggedIn: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,public storage:Storage,
    private router:Router, private androidPermissions: AndroidPermissions,public alertCtrl: AlertController,private lcn:LocalNotifications
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.storage.get('username').then(res => {
        if(res!=null){
        if (res.length>0) {
          this.username=res;
          this.isLoggedIn=true;
        }
        this.storage.get('userid').then(resid => {
  this.userId=resid;
        })
        this.storage.get('authority').then(resa => {
          this.authority=resa;

                })
              }
      });
this.lcn.schedule({
  id:1,
  title:"Witaj",
  text:"Witaj w CourseHunter by DS and JS",
  sound:this.setSound(),
  data:{heh:"Tajne dane"}
})
this.lcn.on
      this.statusBar.styleBlackOpaque();
      this.splashScreen.hide();

    });
  }
  logout(){ 
    this.storage.clear();
    this.router.navigate(['/login'])
  }
  reload(){ 
    this.storage.get('username').then(res => {
      if(res!=null){
      if (res.length>0) {
        this.username=res;
        this.isLoggedIn=true;
      }
      this.storage.get('userid').then(resid => {
this.userId=resid;
      })
      this.storage.get('authority').then(resa => {
        this.authority=resa;
        console.log(this.username + "se")

              })
            }
    });
  }
  setSound(){
    if (this.platform.is('android')) {
         return 'file://assets/swiftly.mp3'
       
     }}
}
