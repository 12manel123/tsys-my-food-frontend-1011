import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefPageComponent } from './chef-page.component';

describe('ChefPageComponent', () => {
  let component: ChefPageComponent;
  let fixture: ComponentFixture<ChefPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChefPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChefPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
