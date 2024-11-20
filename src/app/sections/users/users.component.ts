import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, UserData } from './user-interfaces';
import { getData } from './state-management/users.actions';
import { selectData } from './state-management/users.selectors';
import { DataState } from './state-management/users.reducers';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  data$!: Observable<UserData | undefined>;
  pageNumber = 1;
  perPage = 10;

  constructor(private store: Store<DataState>) {

  }
  
  ngOnInit(): void {
    select(selectData);
    this.getData();
  }

  getData(): void {
    this.store.dispatch(getData({
      pageNumber: this.pageNumber,
      perPage: this.perPage
    }));
    this.data$ = this.store.pipe(select(selectData));
  }

  handlePageEvent(event: PageEvent): void {
    this.pageNumber = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getData();
  }
}
