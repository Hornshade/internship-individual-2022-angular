import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleryModalComponent } from './galery-modal.component';

describe('GaleryModalComponent', () => {
  let component: GaleryModalComponent;
  let fixture: ComponentFixture<GaleryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
