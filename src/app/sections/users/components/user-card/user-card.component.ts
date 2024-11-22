import { Component, inject, Input } from '@angular/core';
import { User } from '../../@core/interfaces/user-interfaces';
import { UsersService } from '../../@core/services/users/users.service';
import { Store } from '@ngrx/store';
import { deleteUser, updateUser } from '../../@core/state-management/users.actions';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  readonly dialog = inject(MatDialog);

  @Input() user!: User;

  constructor(private store: Store) {}

  avatarStyle(): object {
    return {
      'background-image': `url(${this.user.avatar})`
    };
  }

  openDeleteUserDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? this.deleteUser() : null;
    })
  }

  deleteUser(): void {
    this.store.dispatch(deleteUser({
      userId: this.user.id
    }));
  }
}
