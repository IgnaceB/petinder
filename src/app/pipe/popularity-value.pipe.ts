import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'popularityValue',
  standalone: true
})
export class PopularityValuePipe implements PipeTransform {

  transform(popularityNumber: number):string {
    console.log(popularityNumber)
    if (popularityNumber<1){
      return "Freezing"
    }
    if (popularityNumber<=2){
      return "Normal"
    }
    if (popularityNumber>=3 && popularityNumber<=4){
      return "Popular"
    }
    if (popularityNumber>4){
      return "Sizzling hot!"
    }
    else {
      return "unknown"
    }
  }

}
