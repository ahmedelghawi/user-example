import { Component, Input } from '@angular/core';
import { User } from '../../sections/users/interfaces/user-interfaces';
import { UsersService } from '../../sections/users/services/users/users.service';
import { Store } from '@ngrx/store';
import { updateUser } from '../../sections/users/state-management/users.actions';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Input() user!: User;

  constructor(private usersService: UsersService, private store: Store) {}

  avatarStyle(): object {
    return {
      'background-image': `url(${this.user.avatar})`
    };
  }
}
