import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProofPageRoutingModule } from './proof-routing.module';

import { ProofPage } from './proof.page';
import { SharedModule } from 'src/app/shared/shared.module';

import { NgxPaginationModule } from "ngx-pagination";
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProofPageRoutingModule,
    SharedModule,
    NgxPaginationModule,
  ],
  providers: [EmailComposer],
  declarations: [ProofPage],
})
export class ProofPageModule {}
