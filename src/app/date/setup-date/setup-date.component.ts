import {Component, inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive, withComponentInputBinding} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Pet} from "../../../model/Pet";
import {concatMap, flatMap, map, Observable} from "rxjs";
import {__values} from "tslib";
import {PetService} from "../../service/pet.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-setup-date',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './setup-date.component.html',
  styleUrl: './setup-date.component.css'
})
export class SetupDateComponent implements OnInit{
  @Input()
  petName :string;
  pet$ :Observable<Pet>;

  petService :PetService = inject(PetService)
  formBuilder :FormBuilder = inject(FormBuilder)

  sendTextForm: FormGroup = this.formBuilder.group(
    {
      text:'',
    }
  );


  ngOnInit(){
    this.pet$ = this.petService.getPetByName(this.petName)
  }
  onSubmit(textForm :FormGroup){

  }


}
