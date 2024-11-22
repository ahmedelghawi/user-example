import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { deleteUser, getUser, updateUser } from '../../@core/state-management/users.actions';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../@core/interfaces/user-interfaces';
import { selectUser } from '../../@core/state-management/users.selectors';
import { PageTitleService } from '../../../../@core/services/page-title/page-title.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  userId!: number;
  userData$!: Observable<User | undefined>;
  userData!: User;

  constructor(private store: Store, private route: ActivatedRoute, private pageTitleService: PageTitleService) {
    this.pageTitleService.pageTitle.set('Users > Edit user');
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id') || '');
    this.store.dispatch(getUser({id: this.userId}));
    this.userData$ = this.store.pipe(select(selectUser));
    this.userData$.subscribe(data => {
      this.userData = data || {} as User;
    });
  }

  saveUser(details: User): void {
    this.store.dispatch(updateUser({userId: this.userId, details}));
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
      userId: this.userId
    }));
  }
}
