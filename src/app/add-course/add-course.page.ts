import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JobOffer } from 'src/models/jobOffer';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { JobOfferService } from 'src/services/job-offer.service';
import { ToastController, Platform } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.page.html',
  styleUrls: ['./add-course.page.scss'],
})
export class AddCoursePage implements OnInit {

 selectedDate:string="";
  offer: JobOffer = new JobOffer();
  offerFG: FormGroup;
userId:number;

  get title() { return this.offerFG.get('title') }
  get category() { return this.offerFG.get('category') }
  get declaredCost() { return this.offerFG.get('declaredCost') }
  get description() { return this.offerFG.get('description') }
  get endOffer() { return this.offerFG.get('endOffer') }

  constructor(private fb: FormBuilder, private _router: Router, private _job: JobOfferService, 
    public toastController: ToastController, public storage: Storage,private datePicker: DatePicker,public datePipe: DatePipe,public platform:Platform) {
 this.platform.ready().then(()=>{
   this.selectedDate=this.datePipe.transform(new Date(),"dd-MM-yyyy");
 })
  }
  ngOnInit() {
  
    this.offerFG = this.fb.group({
      title: new FormControl(this.offer.title, [Validators.required]),
      category: new FormControl(this.offer.categoryId, [Validators.required]),
      declaredCost: new FormControl(this.offer.declaredCost, [Validators.required]),
      description: new FormControl(this.offer.description, [Validators.required]),
      endOffer: new FormControl(this.offer.endOfferDate, [Validators.required]),

    });
 
    this.storage.get('username').then(res => {
      if(res!=null){
        
      if (res.length<1) {
        this._router.navigate(['/login']);
      }
    }
    });
    this.storage.get('userid').then(res => {
      if(res!=null){
        
      if (res.length!=0) {
        this.userId=res;
      }
    }
    });
  }
selectDate(){ 
var opts={
  date:new Date(),
  mode:"date",
  androidTheme:this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_DARK
}
this.datePicker.show(opts).then((date)=>{
  this.selectedDate=this.datePipe.transform(date,"dd-MM-yyyy");
  this.offerFG.controls.endOffer.setValue(this.selectedDate)
})

}
  edit() {
    this.offerFG.markAllAsTouched();
    if (this.offerFG.valid) {

      var offer = new JobOffer();

      offer.title = this.offerFG.controls.title.value;
      offer.description = this.offerFG.controls.description.value;
      offer.categoryId = this.offerFG.controls.category.value;
      offer.declaredCost = this.offerFG.controls.declaredCost.value;
      //offer.endOfferDate = new Date(this.datePipe.transform(this.offerFG.controls.endOffer.value,"dd-MM-yyyy"));
      offer.endOfferDate=this.offerFG.controls.endOffer.value;
      offer.addedById=this.userId;

      if (this.offer.edited == true) {
        offer.id = this.offer.id;
        offer.addedById = this.offer.addedById;
        offer.status = 1;
        this._job.updateOffer(offer).subscribe(res => {
          if (res == 1) {
            this.presentToast("Pomyślnie zaktualizowano")


            this._router.navigate([''])
          }
          else {
            this.presentToast("Błąd aktualizowania kursu ")

          }
        },err=>{
          this.presentToast("Błąd aktualizowania kursu ")

        })
      }
      else {
   
        this._job.add(offer).subscribe(res => {
          if (res == 1)
            this._router.navigate(['']);
          else
          this.presentToast("Błąd dodawanfia kursu")

        },err=>{
          this.presentToast("Błąd dodawania kursu")

        })
      }
    }
  }
  delete() {
    this._job.deleteOffer(this.offer.id).subscribe(res => {
      if (res == 1) {
        this.presentToast("Usunięto pomyslnie")
        this._router.navigate(['']);
      }
      else
      this.presentToast("Błąd usuwania ")

    },err=>{
      this.presentToast("Błąd usuwania ")

    })
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message:message,
      duration: 2000
    });
    toast.present();
  }

}
