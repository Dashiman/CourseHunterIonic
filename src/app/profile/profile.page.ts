import { Component, OnInit } from '@angular/core';
import { ProfileData } from 'src/models/profileData';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { JobOfferService } from 'src/services/job-offer.service';
import { AuthService } from 'src/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EndModel } from 'src/models/jobOffer';
import { Users } from 'src/models/users';

import { Storage } from '@ionic/storage';
import { RegistrationService } from 'src/services/registration.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: Users;
  regisFG: FormGroup;
  loading: boolean;
  profileData: ProfileData;
  endFg: FormGroup;
  userId: number=0;
  endOption: number;
  constructor(private registration:RegistrationService,public toastController: ToastController,public storage:Storage,private job: JobOfferService, private auth: AuthService, private ar: ActivatedRoute, private route: Router, private fb: FormBuilder) {
    this.loading = true;
    this.profileData = new ProfileData();
this.user=new Users();
  }

  ngOnInit() {
    this.endFg = new FormGroup({});
    this.endFg = this.fb.group({
      endSelect: new FormControl(this.endOption, [Validators.required]),

    });
    this.regisFG = this.fb.group({
      name: new FormControl(this.user.firstname, [Validators.required]),
      lastname: new FormControl(this.user.lastname, [Validators.required]),
      phoneNumber: new FormControl(this.user.phone, [Validators.required, Validators.minLength(9)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email])
    });
    this.storage.get('userid').then(res => {
      if(res!=0){
this.userId=res;

  

    console.log(this.userId)
    this.job.getPD(this.userId).subscribe(res => {
      res.editingProfile = false;
      this.profileData = res;
this.user=this.profileData.user;

      this.regisFG.controls.name.setValue(this.profileData.user.firstname);
      this.regisFG.controls.lastname.setValue(this.profileData.user.lastname);
      this.regisFG.controls.phoneNumber.setValue(this.profileData.user.phone);
      this.regisFG.controls.email.setValue(this.profileData.user.email);
console.log(res)
      this.loading = false;
    })
  }
  else{
    this.route.navigate(['']);
  }})
  }
  get name() { return this.regisFG.get('name') }
  get lastname() { return this.regisFG.get('lastname') }
  get phoneNumber() { return this.regisFG.get('phoneNumber') }
  get email() { return this.regisFG.get('email') }
  get endSelect() { return this.endFg.get('endSelect') }
  
  editUser(registerForm: any){ 
    this.regisFG.markAllAsTouched();
    if (this.regisFG.valid) {
      this.user.firstname = registerForm.controls.name.value;
      this.user.lastname = registerForm.controls.lastname.value;
      this.user.phone = parseInt(registerForm.controls.phoneNumber.value);
      this.user.email = registerForm.controls.email.value;
this.user.id=this.userId;
      this.user.authority = 1;
      this.registration.updateProfile(this.user).subscribe(
        (res) => {
          this.presentToast("Pomyślnie zaktualizowano dane użytkownika")

          
        },err=>{
       this.presentToast("Błąd podczas zapisywania zmian")
        }
      );

  }
}
  edit() {
    this.profileData.editingProfile = !this.profileData.editingProfile;
  }
  showDetails(offerId: number) {
    this.route.navigate(['offer/' + offerId])
  }
  endCourse(offerId: number) {
    this.endFg.markAllAsTouched();
    if (this.endFg.valid) {
      var end = new EndModel();
      end.offerId = offerId;
      end.statusId = this.endFg.controls.endSelect.value;

      this.job.endCourse(end).subscribe(res => {
        if (res == 1) {
          alert("Pomyślnie zakończono kurs");
          this.route.navigate([''])
        }
        else
          alert("Błąd podczas zamykania kursu")
      })
    }
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message:message,
      duration: 2000
    });
    toast.present();
  }
}
