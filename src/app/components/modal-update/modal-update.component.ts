import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Department } from '../../models/department.model';
import { Employee } from '../../models/employee.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DepartmentService } from '../../services/department/department.service';
import { EmployeeService } from '../../services/employee/employee.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-update.component.html',
  styleUrl: './modal-update.component.css',
})
export class ModalUpdateComponent {
  @Input() modeUpdate: 'department' | 'employee' = 'department';
  @Output() close = new EventEmitter<void>();
  @Input() department: Department = {
    _id: '',
    code: 0,
    name: '',
  };
  @Input() employee: Employee = {
    _id: '',
    code: 0,
    name: '',
    lastname1: '',
    lastname2: '',
    departamentCode: {
      _id: '',
      code: 0,
    },
  };

  departmentService = inject(DepartmentService);
  employeeService = inject(EmployeeService);

  router = inject(Router);
  location = inject(Location);
  route = this.location.path();

  departments: Department[] = [];

  constructor() {
    this.departmentService.getDepartments().subscribe(
      (data: Department[]) =>
        // console.log(data)
        (this.departments = data)
    );
  }

  //SE deja como any dado que al llamar la funcion generaba un error de code:Strin no se puede asignar a code:number, cuando el valor dado por el form es un numero
  newDepartment: any = {
    code: 0,
    name: '',
  };

  //Todo - Crear tipo de empleado

  newEmployee: any = {
    code: 0,
    name: '',
    lastname1: '',
    lastname2: '',
    departamentCode: '',
  };

  departmentForm = new FormGroup({
    code: new FormControl('', {
      validators: [Validators.required],
    }),
    name: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  employeeForm = new FormGroup({
    code: new FormControl('', {
      validators: [Validators.required],
    }),
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    lastname1: new FormControl('', {
      validators: [Validators.required],
    }),
    lastname2: new FormControl('', {
      validators: [Validators.required],
    }),
    departamentCode: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  updateOne() {
    if (this.modeUpdate === 'department') {
      if (this.departmentForm.valid) {
        this.newDepartment = this.departmentForm.value;
        this.departmentService
          .updateDepartment(this.newDepartment.code, this.newDepartment)
          .subscribe({
            next: (response: any) => {
              Swal.fire('Departamento Modificado - OK', response, 'success');
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate([this.route]);
                });
            },
            error: (error) => {
              console.log(error);
              Swal.fire('Algo a Fallado', error.error, 'error');
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate([this.route]);
                });
            },
          });
      }
    } else if (this.modeUpdate === 'employee') {
      if (this.employeeForm.valid) {
        this.newEmployee = this.employeeForm.value;
        this.employeeService
          .updateEmployee(this.newEmployee.code, this.newEmployee)
          .subscribe({
            next: (response: any) => {
              console.log(response);
              Swal.fire('Empleado Modificado - OK', response.message, 'success');
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate([this.route]);
                });
            },
            error: (error) => {
              console.log(error);
              Swal.fire('Algo a Fallado', error.error, 'error');
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate([this.route]);
                });
            },
          });
      }
    }
    this.close.emit();
  }
}
