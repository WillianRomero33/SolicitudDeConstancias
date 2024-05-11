import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from '../models/user.model';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { getFirestore, setDoc, getDoc, doc, addDoc, collection, collectionData, query, updateDoc, deleteDoc } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { getStorage, uploadString, ref, getDownloadURL, deleteObject } from "firebase/storage";
import { UtilsService } from "./utils.service";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth)
  firestore = inject(AngularFirestore)
  storage = inject(AngularFireStorage)
  utilsSvc = inject(UtilsService)

  // ====================================== AUTENTICACION =======================================
  getAuth() {
    return getAuth()
  }

  // =================== SIGN IN ====================
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  // =================== REGISTRARSE ====================
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  // =================== ACTUALIZAR USUARIO ====================
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }

  // =================== ENVIAR EMAIL DE RESTABLECER CONTRASEÑA ====================
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email)
  }

  // =================== CERRAR SESION ====================
  signOut() {
    getAuth().signOut()
    localStorage.removeItem('user')
    // this.utilsSvc.routerLink('/auth')
  }

  // ====================================== BASE DE DATOS =======================================

  // =================== OBTENER COLECCION ====================
  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path)
    return collectionData(query(ref, ...collectionQuery), { idField: 'id' })
  }

  // =================== SET UN DOCUMENTO ====================
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data)
  }

  // =================== ACTUALIZAR UN DOCUMENTO ====================
  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data)
  }

  // =================== ELIMINAR UN DOCUMENTO ====================
  deleteDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path))
  }

  // =================== OBTENER UN DOCUMENTO ====================
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data()
  }

  // =================== AGREGAR UN DOCUMENTO ====================
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data)
  }
}
