import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  private _isLoading = signal(false);

  get isLoading() {
    return this._isLoading();
  }

  setLoader(flag: boolean): void {
    console.log(flag);
    this._isLoading.set(flag);
  }
}
