import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pricePerUnit'
})
export class PricePerUnitPipe implements PipeTransform {

  transform(value: number, unit: string = 'Ft/kg'): string {
    const allowedUnits = ['Ft/kg', 'Ft/dkg', 'Ft/db', '€/kg', '€/dg', '€/piece'];
    const safeUnit = allowedUnits.includes(unit) ? unit : 'Ft/kg';
    return `${value} ${safeUnit}`;
  }
  

}
