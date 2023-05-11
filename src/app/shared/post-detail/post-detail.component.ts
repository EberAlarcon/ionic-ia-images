import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {

  //Va a recibir dos parametros
  @Input() post!: Post;
  @Input() isNew!: boolean;

  //Visualizador de imagenes
  selectedImage = '';

  constructor(
    public plataform: Platform,
    private utilsSvc: UtilsService,
    private postsSvc: PostsService
  ) { }

  ngOnInit() {
    //Que va a hacer la primera imagen de la publicacion
    this.selectedImage = this.post.images[0];
  }

  //Funcion para crear una publicacion
  submit() {
    let userPosts: Post[] = this.utilsSvc.getElementFromLocalStorage('userPosts') || [];

    this.utilsSvc.presentLoading({ message: 'Publicando tu huevada...' });
    this.postsSvc.createPost(this.post).subscribe({
      next: (res: any) => {
        userPosts.push(res.data);
        this.utilsSvc.setElementInLocalStorage('userPosts', userPosts);
        this.utilsSvc.routerLink('/home');
        this.utilsSvc.dismissModal();
        this.utilsSvc.dismissLoading();
      },
      error: (error: any) => {
        console.log(error);
        this.utilsSvc.presentToast({
          message: error,
          color: 'danger',
          duration: 1500,
          icon: 'alert-circle-outline'
        });
        this.utilsSvc.dismissLoading();
      }
    });
  }

  //FUNCION PARA GUARDAR IMAGENES
  saveImage() {
    if (this.plataform.is('capacitor')) {
      this.utilsSvc.shareImageInMobile(this.selectedImage); //compartir
    } else { //Llamamos a la funcion de guardar
      this.utilsSvc.saveImageInWeb(this.selectedImage);
    }
  }

  //Funcion para copiar el texto dado que se coloco en el archivo de utils.service.ts
  copyPrompToClipboard() {
    this.utilsSvc.copyToClipboard(this.post.prompt);
    this.utilsSvc.presentToast({
      message: 'Copiado a portapapeles',
      icon: 'clipboard-outline',
      duration: 1000,
      color: 'primary'
    });
  }

  submitPost() {
    if (this.post) {
      this.submit();
    } else {
      console.log("El objeto post es nulo");
    }
  }
}

