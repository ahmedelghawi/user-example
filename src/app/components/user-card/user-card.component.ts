import { Component, Input } from '@angular/core';
import { User } from '../../sections/users/user-interfaces';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Input() user!: User;

  avatarStyle(): object {
    return {
      'background-image': `url(${this.user.avatar})`
    };
  }
}
