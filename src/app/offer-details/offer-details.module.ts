import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferDetailsPageRoutingModule } from './offer-details-routing.module';

import { OfferDetailsPage } from './offer-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferDetailsPageRoutingModule
  ],
  declarations: [OfferDetailsPage]
})
export class OfferDetailsPageModule {}
