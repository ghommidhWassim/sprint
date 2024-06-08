import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoogleAutocompleteInputComponent } from './google-autocomplete-input.component';

describe('GoogleAutocompleteInputComponent', () => {
  let component: GoogleAutocompleteInputComponent;
  let fixture: ComponentFixture<GoogleAutocompleteInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleAutocompleteInputComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleAutocompleteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
