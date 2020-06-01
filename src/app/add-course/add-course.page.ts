import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JobOffer } from 'src/models/jobOffer';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { JobOfferService } from 'src/services/job-offer.service';
import { ToastController } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.page.html',
  styleUrls: ['./add-course.page.scss'],
})
export class AddCoursePage implements OnInit {

 
  offer: JobOffer = new JobOffer();
  offerFG: FormGroup;


  get title() { return this.offerFG.get('title') }
  get category() { return this.offerFG.get('category') }
  get declaredCost() { return this.offerFG.get('declaredCost') }
  get description() { return this.offerFG.get('description') }
  get endOffer() { return this.offerFG.get('endOffer') }

  constructor(private fb: FormBuilder, private _router: Router, private _job: JobOfferService, 
    public toastController: ToastController, public storage: Storage,private datePicker: DatePicker) {
 
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
      if (res.length>0) {
        this._router.navigate(['/login']);
      }
    }
    });
    
  }

  addOffer() {
    this.offerFG.markAllAsTouched();
    if (this.offerFG.valid) {

      var offer = new JobOffer();

      offer.title = this.offerFG.controls.title.value;
      offer.description = this.offerFG.controls.description.value;
      offer.categoryId = this.offerFG.controls.category.value;
      offer.declaredCost = this.offerFG.controls.declaredCost.value;
      offer.endOfferDate = this.offerFG.controls.endOffer.value;

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
          this.presentToast("Błąd dodawania kursu ")

        },err=>{
          this.presentToast("Błąd dodawania kursu ")

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
