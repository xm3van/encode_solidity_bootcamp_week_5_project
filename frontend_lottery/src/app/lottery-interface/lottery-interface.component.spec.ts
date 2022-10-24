import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryInterfaceComponent } from './lottery-interface.component';

describe('LotteryInterfaceComponent', () => {
  let component: LotteryInterfaceComponent;
  let fixture: ComponentFixture<LotteryInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotteryInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotteryInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
