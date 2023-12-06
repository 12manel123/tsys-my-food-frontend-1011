import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialUserPageComponent } from './initial-user-page.component';

describe('InitialUserPageComponent', () => {
  let component: InitialUserPageComponent;
  let fixture: ComponentFixture<InitialUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialUserPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitialUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
