import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordProofPageRoutingModule } from './record-proof-routing.module';

import { RecordProofPage } from './record-proof.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordProofPageRoutingModule,
    SharedModule
  ],
  declarations: [RecordProofPage]
})
export class RecordProofPageModule {}
