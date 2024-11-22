import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { map, merge } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { PageTitleService } from '../../@core/services/page-title/page-title.service';
import { ErrorMessages, IForm } from '../../sections/users/@core/interfaces/form';
import { User } from '../../sections/users/@core/interfaces/user-interfaces';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit, OnChanges {
  readonly dialog = inject(MatDialog);

  form!: FormGroup<IForm>;
  requiredErrorMessage = 'You must enter a value';
  emailErrorMessage = 'Not a valid email';

  @Output() submitForm = new EventEmitter<User>();
  @Input() user!: User;

  errorMessages: ErrorMessages = {
    email: signal(this.requiredErrorMessage),
    first_name: signal(this.requiredErrorMessage),
    last_name: signal(this.requiredErrorMessage),
  }

  constructor(private fb: FormBuilder) {
    this.initializeForm();
    this.errorMessageChanges();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.user = changes['user'].currentValue;
    this.form.patchValue(this.user ?
      {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email
      } : {}
    );
  }

  initializeForm(): void {
    this.form = this.fb.group({
      first_name: new FormControl<string | null>(null, [Validators.required]),
      last_name: new FormControl<string | null>(null, [Validators.required]),
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    });
  }

  errorMessageChanges(): void {
    merge(
      this.form.get('email')!.statusChanges.pipe(map(() => 'email')),
      this.form.get('first_name')!.statusChanges.pipe(map(() => 'first_name')),
      this.form.get('last_name')!.statusChanges.pipe(map(() => 'last_name')),
    )
      .pipe(takeUntilDestroyed())
      .subscribe((controlName: string) => this.updateErrorMessage(controlName));
  }

  updateErrorMessage(controlName: string) {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      this.errorMessages[controlName].set(this.requiredErrorMessage);
    } else if (control?.hasError('email')) {
      this.errorMessages[controlName].set(this.emailErrorMessage);
    }
  }

  submit(): void {
    if (this.form.valid) {
      const valueToUpdate = this.form.value as User;
      this.submitForm.emit(valueToUpdate);
    }
  }
}
