import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';

//Impotamos la libreria
import { Clipboard } from "@capacitor/clipboard";

//Importamos la libreria de guardar
import * as fs from "file-saver";

import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { rejects } from 'assert';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private loadingController: LoadingController, 
    private router: Router
  ) { }

  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }

  setElementInLocalStorage(key: string, element: any){
    return localStorage.setItem(key, JSON.stringify(element));

  }

  //Para obtener el elemento
  getElementFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key) as string);

  }

  async presentLoading(opts?: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }

  //Funcion para quitar el loading

  async dismissLoading(){
    return await this.loadingController.dismiss()
  }

  //Para convertir la imagen
  async shareImageInMobile(url: string){
    let base64: string;
    let path = `${Date.now()}.jpg`

    this.presentLoading();

    if(url.includes('https')){
      base64 = await this.convertUrlToBase64(url) as string;
    }else{
      base64 = url;
    }

    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Cache
    }).then(async(res)=>{

      this.dismissLoading();


      await Share.share({url : res.uri}).then(()=>{
        this.presentToast({
          message: 'Imagen compartida exitosa',
          color: 'primary',
          icon: 'share-social-outline',
          duration: 1000
        })
      })


      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache
      })
      
    })

  }

  //FUNCION PARA CONVERTIR A BASE64 IMAGEN
  async convertUrlToBase64(url:string){
    let response = await fetch(url);
    let blob = await response.blob();

    return new Promise((resolve, rejects)=>{
      let reader = new FileReader();
      reader.onerror = rejects
      reader.onload = ()=>{
        resolve(reader.result);
      }
      reader.readAsDataURL(blob);
    })


  }





//Para llamar a una Modal 
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);
  
    await modal.present();
  }
  dismissModal(){
    return this.modalController.dismiss()
  }

  //Funcion para copiar el texto
  //Sera asincrona y recibirá un parametros
  async copyToClipboard(string : string){
    return await Clipboard.write({string});

  }

  //PARA MOSTRAR QUE SE HAYA COPIADO EL TEXTO
  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }

  //Funcion para guardar la imagen en la web
  saveImageInWeb(url: string){
    return fs.saveAs(url, `${Date.now()}.jpg`)
  }

}
