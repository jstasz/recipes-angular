import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as formApp from './store/app.reducer'
import * as AuthAction from './auth/store/auth.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<formApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new AuthAction.AutoLogin())
  }
}
