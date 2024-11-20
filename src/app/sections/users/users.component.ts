import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, UserData } from './user-interfaces';
import { getData } from './state-management/users.actions';
import { selectData } from './state-management/users.selectors';
import { DataState } from './state-management/users.reducers';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  data$!: Observable<UserData | undefined>;

  constructor(private store: Store<DataState>) {

  }
  
  ngOnInit(): void {
    select(selectData);
    this.store.dispatch(getData());
    this.data$ = this.store.pipe(select(selectData));
  }
}
