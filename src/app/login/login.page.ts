import { Component, OnInit } from '@angular/core';
import { Users } from 'src/models/users';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage'
import { StorageService } from '../storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  user: Users;
  constructor(private _authService: AuthService, private _router: Router,private storageService:StorageService,public storage: Storage) {
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

          this._router.navigate(['/offer-list'])
     }
     else
     alert("błąd logowania")

      }
    );
  }
}
