import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(private router: Router) {
  }

  goToSignUpPage() {
    this.router.navigate(['/sign-up']);
  }
}
