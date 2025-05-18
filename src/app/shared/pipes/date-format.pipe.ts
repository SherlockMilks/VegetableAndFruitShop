import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Timestamp | Date | undefined): string {
    if (!value) return 'N/A';
    
    if (value instanceof Timestamp) {
      return value.toDate().toLocaleDateString('hu-HU');
    } 
    else if (value instanceof Date) {
      return value.toLocaleDateString('hu-HU');
    }
    return new Date(value).toLocaleDateString('hu-HU');
  }
}