import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailProofPage } from './detail-proof.page';

describe('DetailProofPage', () => {
  let component: DetailProofPage;
  let fixture: ComponentFixture<DetailProofPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProofPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
