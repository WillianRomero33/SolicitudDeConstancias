import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordProofPage } from './record-proof.page';

describe('RecordProofPage', () => {
  let component: RecordProofPage;
  let fixture: ComponentFixture<RecordProofPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordProofPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
