import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee} from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm!: NgForm;
  previewPhoto = false;
  panelTitle: string|any;
  datePickerConfig: Partial<BsDatepickerConfig>;
  employee: Employee | any;
  departments: Department[] = [
    {id:1, name:'Help Desk'},
    {id:2, name:'HR'},
    {id:3, name:'IT'},
    {id:4, name:'Payroll'},
    {id:5, name:'Admin'}
  ];

  constructor(private _employeeService: EmployeeService,
              private _router: Router,
              private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
       { 
         containerClass: 'theme-dark-blue', 
         showWeekNumbers: false,
         //minDate: new Date(2021,0,1),
        // maxDate: new Date(2021,11,31), 
         dateInputFormat: 'DD/MM/YYYY'
        });
   }

   togglePhotoPreview(){
     this.previewPhoto =!this.previewPhoto;
   }

  ngOnInit(): void {
    this._route.paramMap.subscribe(parameterMap=>{
      const id =+ parameterMap.get('id')!;
      this.getEmployee(id);
    });
  }

  private getEmployee(id: number)
  {
    if(id === 0)
    {
      this.employee={
        id:null,
    name: null,
    gender: null,
    contactPreference: null,
    phoneNumber: null,
    email: null,
    dateOfBirth: null,
    department:  "select",
    isActive: null,
    photoPath: null,
    password: null,
    confirmPassword: null,
      };
      this.panelTitle="Create Employee";
      this.createEmployeeForm.reset();
    }else{
      this.panelTitle="Edit Employee";
     this._employeeService.getEmployee(id).subscribe(
       (employee) => this.employee =employee,
       (err: any) => console.log(err)
       );
    }
  }

  fullName: string="";
  email: any;
  gender: string="male";
  phonenumber: string="";
  contactPreference: string="";
  isActive: boolean = false;
  department: any;
  dateOfBirth: Date|any;
  photoPath: any;
  password:any;
  confirmPassword:any;

saveEmployee() :void
{
const newEmployee: Employee =Object.assign({}, this.employee);
if(this.employee.id== null){
this._employeeService.addEmployee(this.employee).subscribe(
  (data: Employee) => {
    console.log(data);
    this.createEmployeeForm.reset();
this._router.navigate(['list']);
  },
  (error: any) => console.log(error)
);
}
else
{
    this._employeeService.updateEmployee(this.employee).subscribe(
      () => {
        this.createEmployeeForm.reset();
    this._router.navigate(['list']);
      },
      (error: any) => console.log(error)
    );

}
}
}
