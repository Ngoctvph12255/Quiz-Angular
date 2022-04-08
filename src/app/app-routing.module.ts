import { AuthAdminGuard } from './helpers/auth-admin.guard';
import { LoginAdminComponent } from './screens/login-admin/login-admin.component';
import { LoginComponent } from './screens/login/login.component';
import { StudentComponent } from './components/admin/Student/Student.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { HomeComponent } from './screens/home/home.component';
import { QuizRandomComponent } from './screens/quiz-random/quiz-random.component';
import { QuizResultComponent } from './screens/quiz-result/quiz-result.component';
import { DashboardComponent } from './components/admin/Dashboard/Dashboard.component';
import { SubjectComponent } from './components/admin/Subject/Subject.component';
import { AddStudentComponent } from './components/admin/AddStudent/AddStudent.component';
import { EditStudentComponent } from './components/admin/EditStudent/EditStudent.component';
import { AddQuestionComponent } from './components/admin/AddQuestion/AddQuestion.component';
import { EditSubjectComponent } from './components/admin/EditSubject/EditSubject.component';
import { AuthGuard } from './helpers/auth.guard';
import { UploadFormComponent } from './screens/upload-form/upload-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'mon-hoc',
        component: HomeComponent,
      },
      {
        path: 'quiz/:code',
        // component: QuizComponent,
        component: QuizRandomComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'quiz-result/:idStudent/:id',
        component: QuizResultComponent,
      },
    ],
  },
  // Main layout ADMIN
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'sinh-vien',
        component: StudentComponent,
      },
      {
        path: 'sinh-vien/add',
        component: AddStudentComponent,
        // canActivate: [AuthAdminGuard],
      },
      {
        path: 'sinh-vien/edit/:id',
        component: EditStudentComponent,
        // canActivate: [AuthAdminGuard],
      },
      {
        path: 'mon-hoc',
        component: SubjectComponent,
      },
      {
        path: 'mon-hoc/add',
        component: AddQuestionComponent,
        // canActivate: [AuthAdminGuard],
      },
      {
        path: 'mon-hoc/edit/:id',
        component: EditSubjectComponent,
        // canActivate: [AuthAdminGuard],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login-admin',
    component: LoginAdminComponent,
  },
  {
    path: 'upload-file',
    component: UploadFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
