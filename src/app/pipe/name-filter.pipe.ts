import { Pipe, PipeTransform } from '@angular/core';
import {Pet} from "../../model/Pet";

@Pipe({
  name: 'nameFilter',
  standalone: true
})
export class NameFilterPipe implements PipeTransform {

  transform(arrayOfPets: Pet[] | null,name :string): Pet[] {
    if(!arrayOfPets){
      return [];
    }
    if (name===undefined){
      return arrayOfPets;
    }
    return arrayOfPets.filter(pet=> pet.name.toLowerCase().includes(name.toLowerCase()))
  }

}
