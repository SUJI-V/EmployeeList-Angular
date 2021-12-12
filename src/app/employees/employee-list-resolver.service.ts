import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { Employee } from "../models/employee.model";
import { EmployeeService } from "./employee.service";
import { of, throwError } from 'rxjs';
import { catchError} from "rxjs/operators";
import { map } from 'rxjs/operators';
import { ResolvedEmployeeList } from "./resolved-employeelist.model";

@Injectable()
export class EmployeeListResolverService implements Resolve<Employee[] | string>
{
    constructor(private _employeeService: EmployeeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] | string> {
        return this._employeeService.getEmployees()
        .pipe(
            catchError((err: string) => of(err))
            );
    }
}