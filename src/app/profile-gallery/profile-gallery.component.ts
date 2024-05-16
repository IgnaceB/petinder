import {Component, inject, OnInit} from '@angular/core';
import {PetService} from "../service/pet.service";
import {Pet} from "../../model/Pet";
import {CommonModule, NgFor} from "@angular/common";
import {Observable} from "rxjs";
import {ReactiveFormsModule,FormsModule, FormBuilder, FormGroup} from "@angular/forms";
import {NameFilterPipe} from "../pipe/name-filter.pipe";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {PopularityValuePipe} from "../pipe/popularity-value.pipe";

@Component({
  selector: 'app-profile-gallery',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, NameFilterPipe, ReactiveFormsModule, RouterLink, RouterLinkActive, PopularityValuePipe],
  templateUrl: './profile-gallery.component.html',
  styleUrl: './profile-gallery.component.css'
})
export class ProfileGalleryComponent implements OnInit{

  private _pets$ :Observable<Pet[]>;
  selectedPet :Pet;
  searchText :string;

  readonly formBuilder :FormBuilder = inject(FormBuilder);
  readonly petService:PetService = inject(PetService);

  createPetForm :FormGroup= this.formBuilder.group({
    name: '',
    kind: '',
    image: '',
    profileText: '',
    popularity: '',
  })

  ngOnInit(){
      this.getPets();
  }
  private getPets() {
    this._pets$ = this.petService.getPets();
  }
  get pets$() : Observable<Pet[]>{
    return this._pets$;
  }
  public selectPet(pet :Pet):void {
    this.selectedPet=pet;
  }


  public deletePet(petId :number){
    this.petService.deletePet(petId)
      .subscribe(()=>this.getPets());

  }
  onSubmit():void{
    let pet :Pet = this.createPetForm.value;
    this.petService.addPet(pet)
      .subscribe(pet => this.getPets())
    this.createPetForm.reset();
  }



}
