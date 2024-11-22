import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { catchError, finalize, tap, throwError } from 'rxjs';

// displays a snackbar depending on whether the API succeeds or fails
export const snackbarInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbar = inject(MatSnackBar);
  const snackbarSettings = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  } as MatSnackBarConfig;


  return next(req).pipe(
    tap(() => {
      snackbar.open('Request completed successfully!', 'Close', {
        ...snackbarSettings,
        panelClass: 'snackbar-success'
    });
    }),
    catchError((error) => {
      snackbar.open('An error occurred while processing the request', 'Close', {
        ...snackbarSettings,
        panelClass: 'snackbar-error'
    });
      return throwError(() => error);
    })
  );
};
