import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IProduct } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonModule, ConfirmPopupModule],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private confirmationService: ConfirmationService) {}

  @ViewChild('deleteButton') btnDelete: any;
  @Input() product!: IProduct;
  @Output() edit: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() delete: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  handleConfirm = () => {
    this.confirmationService.confirm({
      target: this.btnDelete.nativeElement,
      message: 'Would you like to proceed this action?',
      accept: () => this.deleteProduct(),
    });
  };

  editProduct = () => {
    this.edit.emit(this.product);
  };

  deleteProduct = () => {
    this.delete.emit(this.product);
  };

  ngOnInit() {}
}
