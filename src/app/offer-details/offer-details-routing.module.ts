import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferDetailsPage } from './offer-details.page';

const routes: Routes = [
  {
    path: '',
    component: OfferDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferDetailsPageRoutingModule {}
