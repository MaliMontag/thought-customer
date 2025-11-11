import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { ThoughtDetails } from './thoughtDetails/thoughtDetails';
import { NotFound } from './not-found/not-found';
import { MyAccount } from './my-account/my-account';
import { SignIn } from './sign-in/sign-in';
import { SignUp } from './sign-up/sign-up';
import { UploadThought } from './upload-thought/upload-thought';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'thoughtDetails/:id', component: ThoughtDetails },
  { path: 'my-account', component: MyAccount },
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp },
  { path: 'upload-thought', component: UploadThought },
  { path: '**', component: NotFound }

];


