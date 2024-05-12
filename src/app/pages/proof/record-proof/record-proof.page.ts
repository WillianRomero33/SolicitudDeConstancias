import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-record-proof',
  templateUrl: './record-proof.page.html',
  styleUrls: ['./record-proof.page.scss'],
})
export class RecordProofPage implements OnInit {

  proof: Proof 
  user: User

  constructor(
    private modalCtrl: ModalController,
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
  ) {}

   form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(10)]),
    dui: new FormControl<number | null>(null, [Validators.required, Validators.minLength(9)]),
    phone: new FormControl<number | null>(null, [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    type: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    qty: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    status: new FormControl(false, [Validators.required]),
    createdAt: new FormControl('')
  });

 


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