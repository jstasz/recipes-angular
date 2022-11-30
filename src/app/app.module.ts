import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routes.module';
import { HttpClientModule} from '@angular/common/http'
import { AuthComponent } from './auth/auth.component';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, ReactiveFormsModule, ShoppingListModule, SharedModule,
  ],
  bootstrap: [AppComponent],
  // entryComponents: [AlertComponent]
  // add to some angular version
})
export class AppModule { }
