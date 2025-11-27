import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignIn } from './sign-in/sign-in';
import { HomePage } from "./home-page/home-page";
import { SignUp } from "./sign-up/sign-up";
import { ThoughtDetails } from "./thoughtDetails/thoughtDetails";
import { NotFound } from './not-found/not-found';
import { MyAccount } from './my-account/my-account';
import { UploadThought } from './upload-thought/upload-thought';
import { AiChat } from './ai-chat/ai-chat';
import { AddResponse } from './add-response/add-response';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, SignIn, HomePage, SignUp, ThoughtDetails, NotFound, MyAccount, UploadThought, AiChat,AddResponse],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('thoughtsAngular');
}
