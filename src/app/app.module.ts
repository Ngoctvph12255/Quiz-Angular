import { UploadFormComponent } from './screens/upload-form/upload-form.component';
import { LoginAdminComponent } from './screens/login-admin/login-admin.component';
import { LoginComponent } from './screens/login/login.component';
import { EditStudentComponent } from './components/admin/EditStudent/EditStudent.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/admin/Dashboard/Dashboard.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { EditQuestionComponent } from './components/admin/EditQuestion/EditQuestion.component';
import { EditSubjectComponent } from './components/admin/EditSubject/EditSubject.component';
import { RouterModule } from '@angular/router';
import { GetAgePipe } from './helpers/pipes/get-age.pipe';
import { SubjectComponent } from './components/admin/Subject/Subject.component';
import { SocialLoginModule, SocialAuthService, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

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
    UploadFormComponent,
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
