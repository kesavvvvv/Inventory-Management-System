import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePurchaseDialogComponent } from './update-purchase-dialog.component';

describe('UpdatePurchaseDialogComponent', () => {
  let component: UpdatePurchaseDialogComponent;
  let fixture: ComponentFixture<UpdatePurchaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePurchaseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePurchaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
