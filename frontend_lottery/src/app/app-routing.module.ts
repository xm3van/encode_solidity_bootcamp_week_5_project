import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LotteryInterfaceComponent } from './lottery-interface/lottery-interface.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lottery', component: LotteryInterfaceComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
