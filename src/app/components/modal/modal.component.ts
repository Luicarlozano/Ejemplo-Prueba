import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ModalTypes } from '../../models/modal.type';
import { Department, iDeparment } from '../../models/department.model';
import { Employee, iEmployee } from '../../models/employee.model';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DepartmentService } from '../../services/department/department.service';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../services/employee/employee.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() mode: 'department' | 'employee' = 'department';

  @Output() close = new EventEmitter<void>();
  departmentService = inject(DepartmentService);
  employeeService = inject(EmployeeService);

  departments: Department[] = [];

  router = inject(Router);
  location = inject(Location);
  route = this.location.path();

  constructor() {
    this.departmentService.getDepartments().subscribe(
      (data: Department[]) =>
        // console.log(data)
        (this.departments = data)
    );
  }

  //SE deja como any dado que al llamar la funcion generaba un error de code:Strin no se puede asignar a code:number, cuando el valor dado por el form es un numero
  department: any = {
    code: 0,
    name: '',
  };

  //Todo - Crear tipo de empleado

  employee: any = {
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

  onSubmit() {
    if (this.mode == 'department') {
      if (this.departmentForm.valid) {
        this.department = this.departmentForm.value;
        this.departmentService.createDepartment(this.department).subscribe({
          next: (response: any) => {
            Swal.fire('Departamento Creado', response.message, 'success');
            this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([this.route]);})
          },
          error: (error) => {
            Swal.fire('Algo a fallado', error.error, 'error')
          },
        });
      }
    } else if (this.mode == 'employee') {
      if (this.employeeForm.valid) {
        this.employee= this.employeeForm.value;
        this.employeeService.createEmployee(this.employee).subscribe({
          next: (response: any) => {
            console.log(response)
            Swal.fire('Empleado Creado', response.message, 'success');
            this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([this.route]);})
          },
          error: (error) => {
            Swal.fire('Algo a fallado', error.error, 'error')
            console.log(error);
          },
        });
      }
      console.log(this.employeeForm.value)
      console.log('Se guardo el empleado');
    }
    this.close.emit();
  }
}
