import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Proof } from 'src/app/models/proof.model';
import { User } from 'src/app/models/user.model';
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
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
  ) {}

   form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(10)]),
    dui: new FormControl<number | null>(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    phone: new FormControl<number | null>(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    type: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
    qty: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    status: new FormControl(false, [Validators.required]),
    createdAt: new FormControl(''),
    createdHour: new FormControl<number>(0)
  });

  ngOnInit() {
    this.proof = this.utilsSvc.getData()
    this.user = this.utilsSvc.getFromLocalStorage('user')
    if (this.proof) this.form.setValue(this.proof);
  }

  ionViewWillLeave() {
    this.utilsSvc.deleteData()
    this.form.reset()
  }

  submit() {
    if (this.form.valid) {
      if (this.proof) this.updateProof()
      else this.createProof()
    }
  }

  // CREAR UNA NUEVA CONSTANCIA 
  async createProof() {
    let path = `proofs`
    const loading = await this.utilsSvc.loading()
    await loading.present()

    let currentDate = new Date()
    let createdAt = `${currentDate.getFullYear()}/${currentDate.getMonth()+1}/${currentDate.getDate()}`
    let createdHour = currentDate.getTime()

    this.form.controls.createdAt.setValue(createdAt)
    this.form.controls.createdHour.setValue(createdHour)
    delete this.form.value.id

    this.firebaseSvc.addDocument(path, this.form.value).then(async res => {
      this.utilsSvc.routerLink("/proof")
      this.utilsSvc.presentToast({
        message: "Constancia agregada exitosamente",
        duration: 1500,
        icon: 'checkmark-circle-outline',
        color: 'success',
        position: 'middle'
      })
    }).catch(error => {
      console.log(error);
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        icon: 'alert-circle-outline',
        color: 'danger',
        position: 'middle'
      })
    }).finally(() => {
      loading.dismiss()
    })
  }

  // ACTUALIZAR DATOS DE UNA CONSTANCIA
  async updateProof() {
    let path = `proofs/${this.proof.id}`
    const loading = await this.utilsSvc.loading()
    await loading.present()

    delete this.form.value.id

    this.firebaseSvc.updateDocument(path, this.form.value).then(async res => {
      this.utilsSvc.routerLink("/proof")
      this.utilsSvc.presentToast({
        message: "Constancia actualizada exitosamente",
        duration: 1500,
        icon: 'checkmark-circle-outline',
        color: 'success',
        position: 'middle'
      })
    }).catch(error => {
      console.log(error);
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        icon: 'alert-circle-outline',
        color: 'danger',
        position: 'middle'
      })
    }).finally(() => {
      loading.dismiss()
    })
  }
}