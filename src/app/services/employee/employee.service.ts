import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
private readonly apiUrl = `http://localhost:3000/employee`
  private http = inject(HttpClient)

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/get-all-employees`)
  }

  createEmployee(employee:Partial<Employee>): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}/create-employee`,employee)
  }

  updateEmployee(code:number,employee:Partial<Employee>): Observable<Employee>{
    return this.http.patch<Employee>(`${this.apiUrl}/update-employees/${code}`,employee)
  }

  deleteEmployee(code:any): Observable<Employee>{
    return this.http.delete<Employee>(`${this.apiUrl}/delete-employee/${code}`)
  }
}
