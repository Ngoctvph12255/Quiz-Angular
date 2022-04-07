import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'getAge'
})
export class GetAgePipe implements PipeTransform {

  transform(value: string, ...args: number[]): number {
    // cài moment: npm i moment 

    // value là ngày sinh

    const now  =  moment();
    const birthDate = moment(value);
    return Number(now.diff(birthDate, 'years'));
    // args tham số truyền vào mặc định là 1(năm  - 2 tháng)
  }

}
