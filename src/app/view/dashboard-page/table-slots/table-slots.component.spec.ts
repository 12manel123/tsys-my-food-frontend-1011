import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSlotsComponent } from './table-slots.component';

describe('TableSlotsComponent', () => {
  let component: TableSlotsComponent;
  let fixture: ComponentFixture<TableSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSlotsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
