import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfferDetailsPageRoutingModule } from './offer-details-routing.module';

import { OfferDetailsPage } from './offer-details.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfferDetailsPageRoutingModule,ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [OfferDetailsPage]
})
export class OfferDetailsPageModule {}
