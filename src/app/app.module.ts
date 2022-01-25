import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {LoginComponent} from './pages/login/login.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {RegisterDialogComponent} from './pages/login/register-dialog/register-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./core/_guard/auth.guard";
import {AuthenticationService} from "./core/_service/auth/authentication.service";
import {UserService} from "./core/_service/protected/user.service";
import {JwtInterceptor} from "./core/_helpers/jwt.interceptor";
import {HomeComponent} from './pages/protected/home/home.component';
import {LayoutComponent} from './core/layout/layout.component';
import {NavbarComponent} from './core/layout/navbar/navbar.component';
import {FooterComponent} from './core/layout/footer/footer.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SettingsComponent} from './pages/protected/settings/settings.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FriendsComponent} from './pages/protected/friends/friends.component';
import {MatTabsModule} from "@angular/material/tabs";
import {HeaderComponent} from './core/layout/header/header.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SearchFriendComponent} from './pages/protected/friends/search-friend/search-friend.component';
import {FriendsManagementComponent} from './pages/protected/friends/friends-management/friends-management.component';
import {CreatePostDialogComponent} from './pages/protected/home/create-post-dialog/create-post-dialog.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { PostComponent } from './pages/protected/home/posts/post/post.component';
import { PostsComponent } from './pages/protected/home/posts/posts.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { ChatComponent } from './pages/protected/home/chat/chat.component';
import { ChangeRoleDialogComponent } from './pages/protected/home/change-role-dialog/change-role-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterDialogComponent,
    HomeComponent,
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    SettingsComponent,
    FriendsComponent,
    HeaderComponent,
    SearchFriendComponent,
    FriendsManagementComponent,
    CreatePostDialogComponent,
    PostComponent,
    PostsComponent,
    ChatComponent,
    ChangeRoleDialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule,
        ReactiveFormsModule,
        HttpClientModule,
        FontAwesomeModule,
        MatSnackBarModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        FormsModule,
        MatTooltipModule,
        MatCheckboxModule
    ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
