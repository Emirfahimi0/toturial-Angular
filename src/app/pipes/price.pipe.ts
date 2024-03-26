import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  transform(value: string): unknown {
    //append $ sign to value

    return `${value}$`;
  }
}
