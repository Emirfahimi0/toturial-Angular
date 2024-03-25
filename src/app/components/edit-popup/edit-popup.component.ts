import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { IProduct } from '../../../types';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    DialogModule,
    FormsModule,
    RatingModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Input() header!: string;
  @Output() confirm = new EventEmitter<IProduct>();

  @Input() product: IProduct = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  onConfirm = () => {
    this.confirm.emit(this.product);
    this.display = false;
    this.displayChange.emit(this.display);
  };

  onCancel = () => {
    this.display = false;
    this.displayChange.emit(this.display);
  };
}
