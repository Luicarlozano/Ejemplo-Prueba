import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee, iEmployee } from '../../models/employee.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ModalUpdateComponent } from '../modal-update/modal-update.component';

@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [ModalUpdateComponent,CommonModule],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.css'
})
export class ListEmployeeComponent {
employeeService = inject(EmployeeService);
employees: Employee[] =[];
location = inject(Location);
router = inject(Router)
route = this.location.path()

modalUpdateMode: 'department' | 'employee'  = 'department'
modalUpdateIsOpen = false
employeeInfo:Employee = {
  _id:'',
  code:0,
  name:'',
  lastname1:'',
  lastname2:'',
  departamentCode:{
    _id:'',
    code:0
  }

}

constructor(){
  this.employeeService.getEmployees().subscribe((data: Employee[])=>(
        // console.log(data)
        this.employees = data))

}

openUpdateModal(modeUpdate:'department'|'employee', employee:Employee){
  this.modalUpdateMode = modeUpdate;
  this.modalUpdateIsOpen = true;
  this.employeeInfo = employee;
}

closeUpdateModal(){
  this.modalUpdateIsOpen = false;
}

deleteOne(code:any){
  console.log(code)
  this.employeeService.deleteEmployee(code).subscribe({
    next: (response: any) => {
      console.log(response)
      Swal.fire('Empleado Eliminado', response.message, 'success');
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([this.route]);})
    },
    error: (error) => {
      Swal.fire('Algo a salido mal', error.error.message, 'error');
      console.log(error);
    }
  })

}

}
