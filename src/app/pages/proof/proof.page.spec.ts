import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProofPage } from './proof.page';

describe('ProofPage', () => {
  let component: ProofPage;
  let fixture: ComponentFixture<ProofPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
