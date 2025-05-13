import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {DataBaseUser} from '../../interfaces/user';

@Component({
  selector: 'app-user-info',
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
  standalone: true
})
export class UserInfoComponent {
  auth = inject(AuthService)
  user: DataBaseUser|null = null;
  constructor() {

  }
}
