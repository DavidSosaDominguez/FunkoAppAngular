import {Component, inject} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-in-error',
  imports: [],
  templateUrl: './sign-in-error.component.html',
  styleUrl: './sign-in-error.component.css'
})
export class SignInErrorComponent {

  modalService = inject(NgbModal);

  closeModel() {
    this.modalService.dismissAll();
  }
}
