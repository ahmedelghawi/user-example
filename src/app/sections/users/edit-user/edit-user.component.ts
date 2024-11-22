import { Component, OnInit, signal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getUser, updateUser } from '../state-management/users.actions';
import { ActivatedRoute } from '@angular/router';
import { map, merge, Observable } from 'rxjs';
import { User } from '../interfaces/user-interfaces';
import { selectUser } from '../state-management/users.selectors';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorMessages, IForm } from '../interfaces/form';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageTitleService } from '../../../services/page-title/page-title.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {

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
}
