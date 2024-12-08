import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
private readonly apiUrl = `http://localhost:3000/departament`
 private http = inject(HttpClient);
 
 getDepartments():Observable<Department[]>{
  return this.http.get<Department[]>(`${this.apiUrl}/get-all-departaments`)
 }

createDepartment(departament:Partial<Department>): Observable<Department>{
  return this.http.post<Department>(`${this.apiUrl}/create-departament`,departament)
}

updateDepartment(code:number, departament:Partial<Department>):Observable<Department>{
return this.http.patch<Department>(`${this.apiUrl}/update-departament/${code}`,departament)
}

deleteDepartment(code:any):Observable<Department>{
  return this.http.delete<Department>(`${this.apiUrl}/delete-departament/${code}`)
}

}
