import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProofPageRoutingModule } from './proof-routing.module';

import { ProofPage } from './proof.page';
import { SharedModule } from 'src/app/shared/shared.module';

import { HttpClientModule } from '@angular/common/http';
import { UtilsServiceService } from 'src/app/sevices/utils-service.service';
// import { AppComponent } from 'src/app/app.component';
// import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProofPageRoutingModule,
    SharedModule,
    //BrowserModule,
    HttpClientModule
  ],
  declarations: [ProofPage],
  providers: [UtilsServiceService],
  //bootstrap: [AppComponent]
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProofPageModule {}
