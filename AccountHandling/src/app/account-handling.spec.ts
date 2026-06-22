import { TestBed } from '@angular/core/testing';
import { AccountHandling } from './account-handling';

describe('AccountHandling', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountHandling],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AccountHandling);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
