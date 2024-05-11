import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.page.html',
  styleUrls: ['auth.page.scss'],
})
export class AuthPage {
  email: string = '';
  password: string = '';
  emailTouched: boolean = false;
  passwordTouched: boolean = false;
  invalidEmail: boolean = false;
  invalidPassword: boolean = false;
  loggedIn: boolean = false;
  currentUser: { email: string; password: string; role: string } | null = null;
  hidePassword: boolean = true;

  constructor(private router: Router, private toastController: ToastController) {}

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }

  login() {
    this.emailTouched = true;
    this.passwordTouched = true;

    this.invalidEmail = !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(this.email);
    this.invalidPassword = this.password.length < 4 || this.password.length > 8; // Rango de 4 a 8 caracteres

    if (!this.invalidEmail && !this.invalidPassword) {
      // Lógica de autenticación exitosa...
      const users: { email: string; password: string; role: string }[] = [
        { email: 'admin@example.com', password: 'admin123', role: 'Administrador' },
        { email: 'user@example.com', password: 'user123', role: 'Solicitante' },
      ];
      this.currentUser = users.find(u => u.email === this.email && u.password === this.password) || null;
      if (this.currentUser) {
        this.loggedIn = true;
        // Redirigir a la página proof
        this.router.navigateByUrl('/proof');
      } else {
        this.showErrorToast('Correo o contraseña incorrectos');
      }
    } else {
      if (this.invalidEmail) {
        this.showErrorToast('Correo no válido');
      } else if (this.invalidPassword) {
        this.showErrorToast('La contraseña debe contener de 4 a 8 caracteres');
      }
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
