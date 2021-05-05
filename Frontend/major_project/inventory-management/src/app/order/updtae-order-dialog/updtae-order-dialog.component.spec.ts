import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdtaeOrderDialogComponent } from './updtae-order-dialog.component';

describe('UpdtaeOrderDialogComponent', () => {
  let component: UpdtaeOrderDialogComponent;
  let fixture: ComponentFixture<UpdtaeOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdtaeOrderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdtaeOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
