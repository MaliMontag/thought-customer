import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';

export const routes: Routes = [
{path:'', component:HomePage},
  { path: '**', redirectTo: '' }     // כל נתיב אחר → מפנה ל־HomePage

];
