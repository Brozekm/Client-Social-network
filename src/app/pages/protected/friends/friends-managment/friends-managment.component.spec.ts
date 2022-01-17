import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsManagmentComponent } from './friends-managment.component';

describe('FriendsManagmentComponent', () => {
  let component: FriendsManagmentComponent;
  let fixture: ComponentFixture<FriendsManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
