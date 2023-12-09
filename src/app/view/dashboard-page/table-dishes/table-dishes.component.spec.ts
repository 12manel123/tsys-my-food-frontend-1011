import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDishesComponent } from './table-dishes.component';

describe('TableDishesComponent', () => {
  let component: TableDishesComponent;
  let fixture: ComponentFixture<TableDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDishesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
