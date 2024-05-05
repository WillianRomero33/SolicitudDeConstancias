import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailProofPage } from './detail-proof.page';

const routes: Routes = [
  {
    path: '',
    component: DetailProofPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailProofPageRoutingModule {}
