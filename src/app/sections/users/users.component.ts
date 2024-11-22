import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserData } from './@core/interfaces/user-interfaces';
import { getData } from './@core/state-management/users.actions';
import { selectData } from './@core/state-management/users.selectors';
import { DataState } from './@core/state-management/users.reducers';
import { PageEvent } from '@angular/material/paginator';
import { PageTitleService } from '../../@core/services/page-title/page-title.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  data$!: Observable<UserData | undefined>;


  constructor(private store: Store<DataState>, private pageTitleService: PageTitleService) {
    this.pageTitleService.pageTitle.set('Users');
  }
  
  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    select(selectData);
    this.data$ = this.store.pipe(select(selectData));
    this.data$.subscribe(data => {
      if (!data) {
        this.store.dispatch(getData({
          pageNumber: 1,
          perPage: 10
        }));
      }
    })
  }

  handlePageEvent(event: PageEvent): void {
    this.store.dispatch(getData({
      pageNumber: event.pageIndex + 1,
      perPage: event.pageSize
    }));
  }
}
