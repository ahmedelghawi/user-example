import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { User, UserData } from '../../@core/interfaces/user-interfaces';
import { PageTitleService } from '../../../../@core/services/page-title/page-title.service';
import { addUser } from '../../@core/state-management/users.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {

  data$!: Observable<UserData | undefined>;

  constructor(private store: Store, private route: ActivatedRoute, private pageTitleService: PageTitleService) {
    this.pageTitleService.pageTitle.set('Users > Create new user');
  }

  // function to create a new user
  createUser(details: User): void {
    this.store.dispatch(addUser({details}));
  }
}
