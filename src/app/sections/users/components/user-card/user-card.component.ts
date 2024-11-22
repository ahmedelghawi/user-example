import { Component, inject, Input } from '@angular/core';
import { User } from '../../@core/interfaces/user-interfaces';
import { Store } from '@ngrx/store';
import { deleteUser } from '../../@core/state-management/users.actions';
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

  // styling for the avatar image
  avatarStyle(): object {
    return {
      'background-image': `url(${this.user.avatar ? this.user.avatar : '/images/person-icon.jpg'})`
    };
  }

  // Opens a dialog confirmation for deleting a user
  openDeleteUserDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      result ? this.deleteUser() : null;
    })
  }

  // Funcitionality to delete user
  deleteUser(): void {
    this.store.dispatch(deleteUser({
      userId: this.user.id
    }));
  }
}
