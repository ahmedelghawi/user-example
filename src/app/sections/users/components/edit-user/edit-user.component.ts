import { Component, inject, OnInit, signal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { deleteUser, getUser, updateUser } from '../../@core/state-management/users.actions';
import { ActivatedRoute } from '@angular/router';
import { map, merge, Observable } from 'rxjs';
import { User } from '../../@core/interfaces/user-interfaces';
import { selectUser } from '../../@core/state-management/users.selectors';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages, IForm } from '../../@core/interfaces/form';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  editForm!: FormGroup<IForm>;

  requiredErrorMessage = 'You must enter a value';
  emailErrorMessage = 'Not a valid email';

  errorMessages: ErrorMessages = {
    email: signal(this.requiredErrorMessage),
    first_name: signal(this.requiredErrorMessage),
    last_name: signal(this.requiredErrorMessage),
  }

  constructor(private store: Store, private route: ActivatedRoute, private fb: FormBuilder, private pageTitleService: PageTitleService) {
    this.initializeForm();
    this.errorMessageChanges();
    this.pageTitleService.pageTitle.set('Users > Edit User');
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id') || '');
    this.store.dispatch(getUser({id: this.userId}));
    this.userData$ = this.store.pipe(select(selectUser));
    this.userData$.subscribe(data => {
      this.editForm.patchValue(data ?
        {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email
        } : {}
      );
    });
  }

  initializeForm(): void {
    this.editForm = this.fb.group({
      first_name: new FormControl<string | null>(null, [Validators.required]),
      last_name: new FormControl<string | null>(null, [Validators.required]),
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    });
  }

  errorMessageChanges(): void {
    merge(
      this.editForm.get('email')!.statusChanges.pipe(map(() => 'email')),
      this.editForm.get('first_name')!.statusChanges.pipe(map(() => 'first_name')),
      this.editForm.get('last_name')!.statusChanges.pipe(map(() => 'last_name')),
    )
      .pipe(takeUntilDestroyed())
      .subscribe((controlName: string) => this.updateErrorMessage(controlName));
  }

  updateErrorMessage(controlName: string) {
    const control = this.editForm.get(controlName);
    if (control?.hasError('required')) {
      this.errorMessages[controlName].set(this.requiredErrorMessage);
    } else if (control?.hasError('email')) {
      this.errorMessages[controlName].set(this.emailErrorMessage);
    }
  }

  saveUser(): void {
    if (this.editForm.valid) {
      const valueToUpdate = this.editForm.value;
      this.store.dispatch(updateUser({userId: this.userId,
          details: valueToUpdate
        }
      ));
    }
    
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
