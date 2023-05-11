import { Component, OnInit } from '@angular/core';

import { Post } from 'src/app/models/post.model';
import { UtilsService } from 'src/app/services/utils.service';
import { PostDetailComponent } from 'src/app/shared/post-detail/post-detail.component';
import { Posts } from 'src/assets/data/images';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  //standalone: true,
  //imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  //creo un nuevo arreglo
  posts: Post[]= []
  loading: boolean= false
  

  constructor(
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
  }

  //----------Funcion para ver cada vez que la persona entra a la pagina-----------
  ionViewWillEnter(){
    this.getPosts()
  }

  //-----------Funcion para refrescar la pagina cuando el usuario deslize la pantalla ------------
  doRefresh(event: any){
    setTimeout(() => {
      this.getPosts();
      event.target.complete();
    }, 2000);

  }

  //-------Funcion 
  getPosts(){
    this.loading= true;

    //TIEMPO DE ESPERA DE CARGAR LAS IMAGENES POR DOS SEGUDNOS 
    // setTimeout(() => {
    //   this.loading = false;
      this.posts = Posts;
  //   }, 2000);
  //   console.log(this.posts);
    
  }

  async showPostDetail(post: Post){
    await this.utilsSvc.presentModal({
      component: PostDetailComponent,
      componentProps:{post},
      cssClass: 'modal-full-size'
    })
  }

}
