import { Component } from '@angular/core';
import { ModalTypes } from '../../models/modal.type';
import { ModalComponent } from "../../components/modal/modal.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListDepartmentComponent } from '../../components/list-department/list-department.component';
import { ListEmployeeComponent } from '../../components/list-employee/list-employee.component';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ModalComponent,CommonModule,FormsModule,ListDepartmentComponent, ListEmployeeComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
 view: 'department'|'employee' = 'department';
 modalIsOpen = false;
 modalMode : 'department'|'employee' = 'department';

 openModal(mode: 'department'|'employee'){
  this.modalMode = mode;
  this.modalIsOpen = true;
 }

closeModal(){
  this.modalIsOpen = false;
}

}
