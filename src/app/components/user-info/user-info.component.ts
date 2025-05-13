import {Component, OnInit, Inject, inject, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthServiceService} from '../../services/auth-service.service';
import {DataBaseUser} from '../../interfaces/user';

@Component({
  selector: 'app-user-info',
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
  standalone: true
})
export class UserInfoComponent {
  auth = inject(AuthServiceService)
  user: DataBaseUser|null = null;
  constructor() {

  }

  ngOnInit() {

  }
}
