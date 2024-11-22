import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageTitleService } from './@core/services/page-title/page-title.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

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
