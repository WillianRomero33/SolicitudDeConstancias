import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.page.html',
  styleUrls: ['auth.page.scss'],
})
export class AuthPage {

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl<string>(''),
  })

  emailTouched: boolean = false;
  passwordTouched: boolean = false;
  invalidEmail: boolean = false;
  invalidPassword: boolean = false;
  hidePassword: boolean = true;

  constructor(
    private toastController: ToastController,
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
  ) { }

  ionViewWillLeave() {
    this.form.reset()
  }

  submit() {
    this.emailTouched = true;
    this.passwordTouched = true;

    this.invalidEmail = !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(this.form.value.email);
    this.invalidPassword = this.form.value.password.length < 4 || this.form.value.password.length > 8; // Rango de 4 a 8 caracteres


    if (!this.invalidEmail && !this.invalidPassword) {
      this.login()
    } else {
      if (this.invalidEmail) {
        this.utilsSvc.presentToast({
          message: 'Correo no válido',
          duration: 2500,
          icon: 'alert-circle-outline',
          color: 'danger',
          position: 'middle'
        })
      } else if (this.invalidPassword) {
        this.utilsSvc.presentToast({
          message: 'La contraseña debe contener de 4 a 8 caracteres',
          duration: 2500,
          icon: 'alert-circle-outline',
          color: 'danger',
          position: 'middle'
        })
      }
    }
  }

  async login() {
    const loading = await this.utilsSvc.loading()
    await loading.present()

    this.firebaseSvc.signIn(this.form.value as User).then(async res => {
      this.getUserInfo(res.user.uid)
    }).catch(error => {
      console.error(error)
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

  async getUserInfo(uid: string) {
    const loading = await this.utilsSvc.loading()
    await loading.present()

    let path = `users/${uid}`

    this.firebaseSvc.getDocument(path).then((user: User) => {
      this.utilsSvc.setInLocalStorage('user', user)
      this.utilsSvc.routerLink('/proof')

      this.utilsSvc.presentToast({
        message: `Te damos la bienvenida ${user.name}`,
        duration: 1500,
        icon: 'person-outline',
        color: 'primary',
        position: 'middle'
      })

    }).catch(error => {
      console.log(error)
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

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
