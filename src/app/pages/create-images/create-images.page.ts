import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { surpriseMePrompts } from 'src/assets/data/surprise-promts';
import { Post } from 'src/app/models/post.model';
import { Posts } from 'src/assets/data/images';
import { UtilsService } from 'src/app/services/utils.service';
import { PostDetailComponent } from 'src/app/shared/post-detail/post-detail.component';
import { ImageaiService } from 'src/app/services/imageai.service';
import { log } from 'console';

@Component({
  selector: 'app-create-images',
  templateUrl: './create-images.page.html',
  styleUrls: ['./create-images.page.scss'],
  //standalone: true,
  //imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateImagesPage implements OnInit {

  //CREAR UN NUEVO FORMULARIO
//CREAR UN NUEVO FORMULARIO
form = new FormGroup({
  prompt: new FormControl('', Validators.required),
  name: new FormControl('', Validators.required)
})

//CREAMOS NUEVAS VARIABLES
userPosts : Post[] = [];
  constructor(
    private utilsSvc : UtilsService,
    private imageAiSvc: ImageaiService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUserPosts();
  }

  //Para hacer las publicaciones dinamica
  getUserPosts(){
    return this.userPosts =  this.utilsSvc.getElementFromLocalStorage('userPosts') || [];

  }

  //FUNCION SUBMIT PARA CUANDO LEEMOS LA INFORMACION DEL FORMULARIO
  submit(){
    // console.log(this.form.value);

    let prompt = this.form.value.prompt as string

    this.utilsSvc.presentLoading({
      message:'Aguanta llavesh que ta cargando'
    });
    this.imageAiSvc.sendPrompt(prompt).subscribe({
      next: (res: any) => {
        // console.log(res);

        let post: Post ={
          prompt,
          images: res.images,
          name: this.form.value.name as string
        }

        this.showPostDetail(post, true);

        this.utilsSvc.dismissLoading();
        
      }
      // ,
      // error: (err: any) => {
      //   console.error(err);
        
      // }
    }
    )
    
  }

  //FUNCION PARA CREAR IMAGENES ALEATORIAS
  ramdomPromp(){
    let ramdomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    let ramdomElement = surpriseMePrompts[ramdomIndex];
    this.form.controls.prompt.setValue(ramdomElement);
  }

  //FUNCION PARA SELECCIONAR UNA IMAGEN Y MOSTRARLA
  async showPostDetail(post: Post, isNew?: boolean){
    await this.utilsSvc.presentModal({
      component: PostDetailComponent,
      componentProps:{post, isNew},
      cssClass: 'modal-full-size'
    })
  }

}
