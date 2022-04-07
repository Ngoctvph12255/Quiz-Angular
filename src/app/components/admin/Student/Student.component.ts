import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-Student',
  templateUrl: './Student.component.html',
  styleUrls: ['./Student.component.css'],
})
export class StudentComponent implements OnInit {
  listOfStudent: Array<any> = [];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {
    this.onGet();
  }
  onGet(){
    this.studentService.getAll().subscribe((data) => {
      this.listOfStudent = data;
      console.log('data');

      console.log(this.listOfStudent);
    });
  }
  onRemove(id: string){
    this.studentService.remove(id).subscribe(data =>{
      alert("Delete successfully!")
      console.log(data);
      this.onGet();
      
    })
  }
  onUpdate(id: string){
    this.router.navigate(['/admin/sinh-vien/edit/'+id]);
  }
}
