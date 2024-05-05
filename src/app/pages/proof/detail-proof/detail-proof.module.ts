import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailProofPageRoutingModule } from './detail-proof-routing.module';

import { DetailProofPage } from './detail-proof.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailProofPageRoutingModule,
    SharedModule
  ],
  declarations: [DetailProofPage]
})
export class DetailProofPageModule {}
