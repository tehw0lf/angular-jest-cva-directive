import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { StuffService } from './stuff.service';
import { TestDirective } from './test.directive';

@Component({
  template: `
    <form #form="ngForm">
      <input
        id="input"
        name="test"
        [(ngModel)]="modelValue"
        someDirectiveSelector
      />
    </form>
  `,
})
class TestHostComponent {
  modelValue = 21;
}

const mockStuffService = {
  parse: jest.fn(),
  format: jest.fn(),
};

describe('TestDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent, TestDirective],
      imports: [FormsModule],
      providers: [{ provide: StuffService, useValue: mockStuffService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    directive = fixture.debugElement.query(By.directive(TestDirective));
    directive.injector.get(TestDirective).onChange = jest.fn();
    fixture.detectChanges();
  });

  it('should parse the input', () => {
    directive.triggerEventHandler('input', { target: { value: '42' } });

    expect(mockStuffService.parse).toHaveBeenCalledWith('42');
  });

  it('should write a value', () => {
    directive.injector.get(TestDirective).writeValue('42');

    expect(mockStuffService.format).toHaveBeenCalledWith('42');
  });
});
