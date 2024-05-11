import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Proof } from 'src/app/models/proof.models';
import { UtilsServiceService } from 'src/app/sevices/utils-service.service';

@Component({
  selector: 'app-record-proof',
  templateUrl: './record-proof.page.html',
  styleUrls: ['./record-proof.page.scss'],
})
export class RecordProofPage implements OnInit {

  @Input() proof: Proof;

  

  constructor(
    private modalCtrl: ModalController,
    //private proof: Proof
  ) {}

   form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(10)]),
    DUI: new FormControl('', [Validators.required, Validators.minLength(10)]),
    phone: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    type: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    qty: new FormControl(null, [Validators.required, Validators.min(1)]),
    status: new FormControl('', [Validators.required]),
  });

  utilsSvc = inject(UtilsServiceService);


  ngOnInit() {
    //if (this.proof) this.form.setValue(this.proof);

  }

  // =================== Convertir valores de tipo strings a numeros =============
  setNumberInputs(){
    let {phone, qty} =  this.form.controls;  
    if (phone.value) phone.setValue(parseFloat(phone.value)); 
    if (qty.value) qty.setValue(parseFloat(qty.value));

  }


}