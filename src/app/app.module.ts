import { NzModalModule } from 'ng-zorro-antd/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginAdminComponent } from './screens/login-admin/login-admin.component';
import { LoginComponent } from './screens/login/login.component';
import { EditStudentComponent } from './components/admin/EditStudent/EditStudent.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/admin/Dashboard/Dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroItemComponent } from './components/hero-item/hero-item.component';
import { SubjectItemComponent } from './components/subject-item/subject-item.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { HomeComponent } from './screens/home/home.component';
import { QuizRandomComponent } from './screens/quiz-random/quiz-random.component';
import { QuizResultComponent } from './screens/quiz-result/quiz-result.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentComponent } from './components/admin/Student/Student.component';
import { AddStudentComponent } from './components/admin/AddStudent/AddStudent.component';
import { AddQuestionComponent } from './components/admin/AddQuestion/AddQuestion.component';
import { EditSubjectComponent } from './components/admin/EditSubject/EditSubject.component';
import { GetAgePipe } from './helpers/pipes/get-age.pipe';
import { SubjectComponent } from './components/admin/Subject/Subject.component';
import { SocialLoginModule, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzButtonModule } from 'ng-zorro-antd/button';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    GetAgePipe,
    HeroItemComponent,
    HomeComponent,
    SubjectItemComponent,
    HomeLayoutComponent,
    HomeComponent,
    QuizRandomComponent,
    QuizResultComponent,
    // Admin layouts
    AdminLayoutComponent,
    DashboardComponent,
    SubjectComponent,
    StudentComponent,
    AddStudentComponent,
    EditStudentComponent,
    AddQuestionComponent,
    EditSubjectComponent,
    LoginComponent,
    LoginAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    SocialLoginModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NzModalModule,
    NzButtonModule,
    NzModalModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.GOOGLE_CLIENT_ID),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
