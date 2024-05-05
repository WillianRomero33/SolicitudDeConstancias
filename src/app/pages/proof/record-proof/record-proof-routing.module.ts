import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordProofPage } from './record-proof.page';

const routes: Routes = [
  {
    path: '',
    component: RecordProofPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordProofPageRoutingModule {}
