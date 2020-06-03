import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/models/jobOffer';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { JobOfferService } from 'src/services/job-offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { BidOffer } from 'src/models/BidOffer';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.page.html',
  styleUrls: ['./offer-details.page.scss'],
})
export class OfferDetailsPage implements OnInit {
userId:number;
  offer: JobOffer = new JobOffer();
  offerFG: FormGroup
  loading: boolean;
editing:boolean = false;
  constructor(private vibration: Vibration,private fb:FormBuilder,private job: JobOfferService, private ac: ActivatedRoute, private auth: AuthService, private router: Router,public storage: Storage,public toastController: ToastController) {
    this.loading = true;
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
        this.router.navigate(['/login']);
      }
      else{
        this.storage.get('username').then(res => {
          if(res!=0){
            this.userId=res;
          }})    
        var offId = this.ac.snapshot.params.id;
        this.job.getOffer(offId).subscribe(res => {
          res.edited = true;
          this.offer = res;
console.log(this.offer)

           this.offerFG.controls.title.setValue(this.offer.title);
          this.offerFG.controls.description.setValue(this.offer.description);
          this.offerFG.controls.category.setValue(this.offer.categoryId);
          this.offerFG.controls.category.setValue(this.offer.categoryId);
           this.offerFG.controls.declaredCost.setValue(this.offer.declaredCost);
          this.offerFG.controls.endOffer.setValue(new Date(this.offer.endOfferDate));

          this.loading = false;
        })
      }
    }



  })}
  seteditFG(event: FormGroup): void {
    this.offerFG = event;
    console.log(event)
  }

  setOffer(offer: JobOffer): void {
    this.offer = offer
    console.log(offer)

  }
  edit(){
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
      this.job.updateOffer(offer).subscribe(res => {
        if (res == 1) {
          this.presentToastWithOptions("Sukces","Pomyślnie zaktualizowano")
this.vibration.vibrate(1000);

          this.router.navigate([''])
        }
        else {
          this.presentToast("Błąd aktualizowania kursu ")

        }
      },err=>{
        this.presentToast("Błąd aktualizowania kursu ")

      })
    }}}
  giveJob(offer: BidOffer) {
    console.log(offer)
    var jobid = offer.jobOfferId;
    //var taken = new TakenOffer();
    //taken.addedById = this.offer.addedById;
    //taken.description = this.offer.description;
    //taken.title = this.offer.title;
    //taken.status = 1;
    //taken.takenById = offer.userId;
    //taken.declaredCost = offer.proposition;
    this.job.giveJob(offer).subscribe(res => {
      if (res == 1) {

         this.presentToastWithOptions("Sukces","Pomyślnie zlecono")
this.vibration.vibrate(1000);

          this.router.navigate([''])


      }
    })
  }
  async presentToastWithOptions(header,message) {
    const toast = await this.toastController.create({
      header: header,
      message: message,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Zamknij',
          handler: () => {
            console.log('Favorite clicked');
          }
        }
      ]
    });
    toast.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message:message,
      duration: 2000
    });
    toast.present();
  }
}
