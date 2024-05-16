import { TestBed } from '@angular/core/testing';

import { PetService } from './pet.service';
import {provideHttpClient} from "@angular/common/http";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {environment} from "../../environments/environment.development";
import {firstValueFrom} from "rxjs";
import {Pet} from "../../model/Pet";

describe('PetService', () => {
  let service: PetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PetService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(PetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetch the correct endpoint',async ()=>{
    const petsResult: Pet[] = [
      {id: 1, name: 'test 1', kind: 'cat', image: 'test_1.jpg', profileText: 'test', popularity: 1},
      {id: 2, name: 'test 2', kind: 'dog', image: 'test_2.jpg', profileText: 'test', popularity: 2}
    ];
    const httpTesting = TestBed.inject(HttpTestingController);
    const pets$ = service.getPets();
    const configPromise = firstValueFrom(pets$);
    const req = httpTesting.expectOne(
    `${environment.backendUrl}/pets`
    );
    expect(req.request.method).toBe('GET')
    req.flush(petsResult);
    expect(await configPromise).toEqual(petsResult);
    httpTesting.verify();


  });

});
