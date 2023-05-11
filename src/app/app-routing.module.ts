import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClient
  ]
})
export class AppRoutingModule { }


// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   // aquí puedes definir las rutas de tu aplicación
// ];

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule,
//     HttpClientModule,
//     RouterModule.forRoot(routes)
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
