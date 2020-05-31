import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { Storage } from '@ionic/storage';
import { StorageService } from './storage.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  baseUrl: string;
  constructor(public auth: AuthService, public router: Router, private http: HttpClient,private storage: StorageService) {
    this.baseUrl = window.location.origin;

  }
  canActivate(): boolean {
    var result = false;
    var username="";
    var authority=0;
    var userid=0;
     this.storage.get('username').then(res => {
      if (res) {
        return true;
      }

      this.router.navigate(['/login']);
      return false;
    });

  

  return true;


}}