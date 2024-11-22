import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingSpinnerService } from '../../services/loading-spinner/loading-spinner.service';
import { finalize } from 'rxjs';

// displays the loader for whenever an API call is made
export const loadingSpinnerInterceptor: HttpInterceptorFn = (req, next) => {

  const loader = inject(LoadingSpinnerService);
  loader.setLoader(true);
  return next(req).pipe(
    finalize(() => loader.setLoader(false))
  );
};
