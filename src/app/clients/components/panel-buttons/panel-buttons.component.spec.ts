import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelButtonsComponent } from './panel-buttons.component';

describe('PanelButtonsComponent', () => {
  let component: PanelButtonsComponent;
  let fixture: ComponentFixture<PanelButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
