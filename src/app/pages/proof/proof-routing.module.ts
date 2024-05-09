import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProofPage } from './proof.page';

const routes: Routes = [
  {
    path: '',
    component: ProofPage
  },
  {
    path: 'record-proof',
    loadChildren: () => import('./record-proof/record-proof.module').then( m => m.RecordProofPageModule)
  },
  {
    path: 'detail-proof',
    loadChildren: () => import('./detail-proof/detail-proof.module').then( m => m.DetailProofPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProofPageRoutingModule {}
