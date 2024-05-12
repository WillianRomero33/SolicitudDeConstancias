import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Proof } from 'src/app/models/proof.model';
import { UtilsService } from 'src/app/services/utils.service';


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

  utilsSvc = inject(UtilsService);
  


  ngOnInit() {
    //if (this.proof) this.form.setValue(this.proof);

  }

  // =================== Convertir valores de tipo strings a numeros =============
  setNumberInputs(){
    let {phone, qty} =  this.form.controls;  
    if (phone.value) phone.setValue(parseFloat(phone.value)); 
    if (qty.value) qty.setValue(parseFloat(qty.value));

  }

  
  async submit() {
    if (this.form.valid) {
      if (this.proof) this.updateProof();
      else this.createProof();
    }
  }


  async createProof() {

    let path = `users/${this.user.uid}/products`


    const loading = await this.utilsSvc.loading();
    await loading.present();

          delete this.form.value.id;
    
          this.firebaseSrv.addDocument(path, this.form.value).then(async res => {

            this.utilsSvc.presentToast({
              message: 'Producto creado exitosamente',
              duration: 1500,
              color: 'success',
              position: 'middle',
              icon: 'checkmark-circle-outline',
            });
          
          })
    
      .catch((error) => {
        console.log(error);
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline',
        });
      })
      .finally(() => {
        loading.dismiss();
      });
}


  async updateProof() {

    let path = `users/${this.user.uid}/products/${this.proof.id}`;


    const loading = await this.utilsSvc.loading();
    await loading.present();

          delete this.form.value.id;
          this.firebaseSrv.updateDocument(path, this.form.value).then(async res => {
          

            this.utilsSvc.presentToast({
              message: 'Producto actualizado exitosamente',
              duration: 1500,
              color: 'success',
              position: 'middle',
              icon: 'checkmark-circle-outline',
            });
          
          })
    
      .catch((error) => {
        console.log(error);
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline',
        });
      })
      .finally(() => {
        loading.dismiss();
      });
  }


}