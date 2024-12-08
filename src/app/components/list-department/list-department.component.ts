import { Component, inject } from '@angular/core';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department/department.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ModalUpdateComponent } from '../modal-update/modal-update.component';

@Component({
  selector: 'app-list-department',
  standalone: true,
  imports: [ModalUpdateComponent,CommonModule],
  templateUrl: './list-department.component.html',
  styleUrl: './list-department.component.css',
})
export class ListDepartmentComponent {
  departmentService = inject(DepartmentService);
  departments: Department[] = [];
  router = inject(Router);
  location = inject(Location);
  route = this.location.path();

  modalUpdateMode: 'department' | 'employee' = 'department';
  modalUpdateIsOpen = false;
  departmentInfo:Department = {
    _id:'',
    code:0,
    name:'',
  }

  constructor() {
    this.departmentService.getDepartments().subscribe(
      (data: Department[]) =>
        // console.log(data)
        (this.departments = data)
    );
  }

  openUpdateModal(modeUpdate:'department'|'employee',department:Department){
    this.modalUpdateMode = modeUpdate;
    this.modalUpdateIsOpen = true;
    this.departmentInfo = department
  }
  
  closeUpdateModal(){
    this.modalUpdateIsOpen = false;
  }

  deleteOne(code: any) {
    this.departmentService.deleteDepartment(code).subscribe({
      next: (response: any) => {
        console.log(response);
        Swal.fire('Departamento Eliminado', response.message, 'success');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([this.route]);
          });
      },
      error: (error) => {
        Swal.fire('Algo a Salido Mal', error.error, 'error');
        console.log(error);
      },
    });
  }
}
