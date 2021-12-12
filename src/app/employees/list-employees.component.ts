import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { ResolvedEmployeeList } from './resolved-employeelist.model';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  error: string|any;


  private _searchTerm: string| any;
  get searchTerm(): string
  {
    return this._searchTerm;
  }
  set searchTerm(value: string)
  {
    this._searchTerm =value;
    this.filteredEmployees=this.filterEmployees(value);
  }
 

  filterEmployees(searchString: string)
  {
    return this.employees.filter(employee => 
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !==-1);
  }
  
  constructor(private _router: Router,private _route: ActivatedRoute) {
    const resolvedData: Employee[] | string=
                this.employees=this._route.snapshot.data['employeeList'];

                if(Array.isArray(resolvedData))
                {
                this.employees = resolvedData;
                }else{
                  this.error =resolvedData;
                }

                if(this._route.snapshot.queryParamMap.has('searchTerm'))
                {
                  this.searchTerm=this._route.snapshot.queryParamMap.get('searchTerm')!;
                }else
                {
                  this.filteredEmployees=this.employees;
                }
               }

  ngOnInit(): void {
  //  this._employeeService.getEmployees().subscribe((empList) =>{ 
  //   this.employees =empList;
   //  this.employeeToDisplay=this.employees[0];
  //this.filteredEmployees =this.employees;
   };
   
   onDeleteNotification(id:number)
   {
    const i=this.filteredEmployees.findIndex(e => e.id ===id);
    if( i!==-1)
    {
    this.filteredEmployees.splice(i,1);
    }
   }

  // changeEmployeeName()
  // {
  //   this.employees[0].name="Jordan";
  //   this.filteredEmployees=this.filterEmployees(this.searchTerm);
  // //  const newEmployeeArray: Employee[]=Object.assign([],this.employees); //copiying emplyees->newEmployees Array
  // //  newEmployeeArray[0].name="Jordan";
  // //  this.employees=newEmployeeArray;
  // }
  
  
  
}


