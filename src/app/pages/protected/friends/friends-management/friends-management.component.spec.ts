import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsManagementComponent } from './friends-management.component';

describe('FriendsManagmentComponent', () => {
  let component: FriendsManagementComponent;
  let fixture: ComponentFixture<FriendsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
