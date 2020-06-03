import { Component, OnInit, ViewChild } from '@angular/core';
import { JobOffer } from 'src/models/jobOffer';
import { JobOfferService } from 'src/services/job-offer.service';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { BidOffer } from 'src/models/BidOffer';
import { IonInfiniteScroll } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.page.html',
  styleUrls: ['./offer-list.page.scss'],
})
export class OfferListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  loading: boolean;
  p: number = 1;
  cost: number;
  userId: number;
  offer: JobOffer[];
  canBid: boolean;
  constructor(private job: JobOfferService, private auth: AuthService, private route: Router,public storageService: StorageService,public storage:Storage) {
    this.offer = [];
    this.loading = true;
    this.cost = 0;
    this.userId = 0;
    this.canBid = false;
  }

  ngOnInit() {
    this.job.get().subscribe(res => {
      this.offer = res;
      this.offer.forEach(x =>{
        x.bidding = false;
        x.expanded=false;
      })
      this.loading = false;

    })

    this.storage.get('username').then(res => {
      if(res!=null){
      if (res.length>0) {
        this.canBid=true;
      }
      this.storage.get('userid').then(res => {
this.userId=res;
console.log(this.userId)

      })
    }
    });
  }
  applyFor(offerId: number) {
    if (this.cost != 0 ) {
      console.log(this.cost)
      var bid = new BidOffer();
      bid.jobOfferId = offerId;
      bid.offerDate = new Date();
      bid.proposition = this.cost;
      this.job.applyFor(bid).subscribe(res => {
        if (res == 1)
          alert("Sukces")
        else ("Error")
        this.offer.forEach(x => x.bidding = false)

      })
    }
  }
  bid(offerId: number) {
    this.offer.forEach(x => x.bidding = false)
    console.log(offerId)
    this.offer.forEach(x => {
      if (x.id == offerId)
        x.bidding = true;


    })
 
  }
  showDetails(offerId: number) {
    this.route.navigate(['offer/' + offerId])
  }
  refresh(event) {
    this.job.get().subscribe(res => {
      this.offer = res;
      this.offer.forEach(x => {
        x.bidding = false;
        x.editing = false;
      })
      this.loading = false;
    })

   setTimeout(()=>{
event.target.complete();
   },2000)
    


  }
  expandItem(item): void {

    
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.offer.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
}
