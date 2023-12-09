import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListOrderComponent } from './table-list-order.component';

describe('TableListOrderComponent', () => {
  let component: TableListOrderComponent;
  let fixture: ComponentFixture<TableListOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableListOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableListOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
