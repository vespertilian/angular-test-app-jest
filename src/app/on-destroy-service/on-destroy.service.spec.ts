import { TestBed } from '@angular/core/testing';
import { OnDestroyService } from './on-destroy.service';

describe('OnDestroyService', () => {

  function setup() {
    TestBed.configureTestingModule({
      providers: [ OnDestroyService ]
    })

    const service: OnDestroyService = TestBed.inject(OnDestroyService);
    return {service}
  }

  it('completes call next and complete on triggered$ observable when ngOnDestroy is called', () => {
    const {service} = setup()

    let next = null;
    let complete = null;
    service.triggered$
      .subscribe(
        () => {next = true},
        () => fail(),
        () => {complete = true}

      )
    service.ngOnDestroy()

    expect(next).toBe(true)
    expect(complete).toBe(true)
  });
});
