import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsDataComponent } from './clients-data.component';

describe('ClientsDataComponent', () => {
  let component: ClientsDataComponent;
  let fixture: ComponentFixture<ClientsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
