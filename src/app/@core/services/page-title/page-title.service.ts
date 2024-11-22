import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// Service to share the PageTitle through the usage of signals instead of complicating it through the NgRx store
export class PageTitleService {

  pageTitle = signal<string>('');
}
