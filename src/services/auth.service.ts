import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';
import { Users } from '../models/users';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { StorageService } from 'src/app/storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string;

    constructor(private http: HttpClient, pl: PlatformLocation,private storage:StorageService) {
       // this.baseUrl = window.location.origin;
       this.baseUrl = "https://jobhunterug.azurewebsites.net";

    }



  loginUser(user: Users): Observable<Users> {
      return this.http.post<Users>(this.baseUrl + "/api/auth/LoginIonic", user).pipe(map(res => { return res as Users })
        )
  }
  getAuthority(): Observable<number>{
    return this.http.get( this.baseUrl+"/api/auth/GetAuthority").pipe(map(res => { return res as number }));
  }
  getUserName(): Observable<string>{
    return this.http.get(this.baseUrl+"/api/auth/GetUsername").pipe(map(res => { return res as string }));
  }
  getUserId(): Observable<number> {
    return this.http.get(this.baseUrl + "/api/auth/GetUserId").pipe(map(res => { return res as number }));
  }
  logout(): Observable<number> {
    return this.http.get(this.baseUrl+"/api/auth/Logout").pipe(map(res => { return res as number }));
  }
  isLoggedIn(): boolean {
    var username="";
    var authority=0;
    var userid=0;
    this.storage.get('username').then((val)=>{
username=val;
    });

    this.storage.get('authority').then((val)=>{
      authority=val;
      });

          this.storage.get('userid').then((val)=>{
            userid=val;
console.log(val + " elo melo")

            });
    if(username==null||username==""||authority==0||userid==0)
    return false;

else
    return true;
  }}
