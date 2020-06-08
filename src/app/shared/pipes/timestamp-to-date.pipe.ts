import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

  transform(value: {_seconds: number, _nanoseconds: number}, format?: string): string {

    return moment.unix(value._seconds).format(format ? format : 'DD-MM');
  }

}
