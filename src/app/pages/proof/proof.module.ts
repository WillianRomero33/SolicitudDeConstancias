import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProofPageRoutingModule } from './proof-routing.module';

import { ProofPage } from './proof.page';
import { SharedModule } from 'src/app/shared/shared.module';

import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProofPageRoutingModule,
    SharedModule,
    NgxPaginationModule,
  ],
  declarations: [ProofPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProofPageModule {}
