import {ErrorHandler, inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {Pet} from "../../model/Pet";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PetService {
private _backEndRoute :string;


  constructor(private http:HttpClient) {
    this._backEndRoute = `${environment.backendUrl}/pets`
  }

  public getPets():Observable<Pet[]>{
    return this.http.get<Pet[]>(this._backEndRoute).pipe(
      map(results => results.sort(
        (petA, petB)=> petA.name.localeCompare(petB.name))));
    };

  addPet(pet: Pet):Observable<Pet> {
    pet.id = Math.floor(Math.random()*11000);
    return this.http.post<Pet>(this._backEndRoute,pet)
  }

  getPetByName(petName: string) {
    return this.http.get<Pet>(this._backEndRoute+`/${petName}`)
  }

  deletePet(petId: number) {
    console.log("samer")
    return this.http.delete(this._backEndRoute+`/${petId}`)
  }

  sendMessage(textForm: FormGroup) {
    return this.http.post(this._backEndRoute+'/sendText',textForm)

  }
}

