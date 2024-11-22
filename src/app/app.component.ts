import { Component, effect, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { PageTitleService } from './services/page-title/page-title.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  pageTitle = this.pageTitleService.pageTitle;

  constructor(private pageTitleService: PageTitleService) {
  }


}
