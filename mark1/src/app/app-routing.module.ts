import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { ReactiveFormsModule } from '@angular/forms';

// const routes: Routes = [];
const routes: Routes = [
 
  {
    path:'home',
    component:HomeComponent,
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'admin',
    loadChildren: ()=> import('./admin/admin.module').then((m)=>AdminModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes),ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  promise = new Promise((resolve,reject)=>{
    resolve("shiva");
  });
  observa = new Observable((observer)=>{
    observer.next("jk");
  });
getval() {
  this.promise.then((val)=>{
    console.log(val)
  });
  this.observa.subscribe((val)=>{
    console.log(val);
  });
  // const route:Routes =[{
  //   path:'home',component:[homecomponen]
  // }]
// @media only screen and(max-width:800px) {
  
// }
//   output=arr.reduce((acc,current)=>{
//     return acc+current,intialval
//   })
// }
// var b= function() {
//   return function() {

//   }
}

// const route:Routes = [
//   {
//     path:'home',
//     loadChildren:'./'
//   }

  // setTimeout((val)=>{

  // },3000)

  // output=arr.forEacch((val)=>{
  //   return jk;
  // });
  // output=arr.map((val)=>{
  //   return jk*2;
  // })
}