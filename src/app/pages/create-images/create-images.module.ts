import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CreateImageRoutingModule } from './create-images-routing.module';
import { CreateImagesPage } from './create-images.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http'; // Agregar import aquí
import { ImageaiService } from 'src/app/services/imageai.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CreateImageRoutingModule,
    HttpClientModule // Agregar aquí
  ],
  declarations: [CreateImagesPage],
  providers: [ImageaiService]
})
export class CreateImagesPageModule {}
