import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignIn } from './sign-in/sign-in';
@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterModule, SignIn],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('thoughtsAngular');
}
