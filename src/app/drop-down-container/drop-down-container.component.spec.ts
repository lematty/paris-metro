
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DropDownContainerComponent } from './drop-down-container.component';

describe('LinesListComponent', () => {
  let component: DropDownContainerComponent;
  let fixture: ComponentFixture<DropDownContainerComponent>;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
