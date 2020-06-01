import { Component, OnInit } from '@angular/core';
import { Users } from 'src/models/users';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage'
import { StorageService } from '../storage.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  user: Users;
  constructor(private _authService: AuthService, private _router: Router,private storageService:StorageService,
    public storage: Storage,private vibration: Vibration,private androidPermissions: AndroidPermissions,public toastController: ToastController) {
    this.user = new Users();

  }
  ngOnInit() {
    this.storage.get('username').then(res => {
      if(res!=null){
      if (res.length>0) {
        this._router.navigate(['/offer-list']);
      }
    }
    });
    
  }

  login(loginForm: any) {
   // this.vibration.vibrate([2000,1000,2000]);

    this.user.username = loginForm.controls.username.value;
    this.user.password = loginForm.controls.password.value;

    this._authService.loginUser(this.user).subscribe(
      (res) => {
        var user=new Users();
        user=res;
     if(user.username!=null&&user.authority!=0&&user.id!=0){
      this.storageService.set('username',user.username);
      this.storageService.set('authority',user.authority);
      this.storageService.set('userid',user.id);
      this.presentToast("Zalogowano pomyslnie")

          this._router.navigate(['/offer-list'])
     }
     else{
      this.presentToast("Błędne dane logowania")
       
      this.vibration.vibrate([2000,1000,2000]);
     }

      }
      ,err=>{
        this.presentToast("Błąd logowania")
      this.vibration.vibrate([1000,1000,2000]);

      }
    );
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message:message,
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
