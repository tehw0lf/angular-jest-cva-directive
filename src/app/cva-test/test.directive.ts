import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { StuffService } from './stuff.service';

@Directive({
  selector: '[someDirectiveSelector]',
})
export class TestDirective implements ControlValueAccessor {
  onChange!: any;

  constructor(
    private renderer: Renderer2,
    private element: ElementRef,
    private stuffService: StuffService
  ) {}

  @HostListener('input', ['$event.target.value'])
  input(value: any) {
    this.onChange(this.stuffService.parse(value));
  }
  writeValue(value: any): void {
    const element = this.element.nativeElement;
    this.renderer.setProperty(
      element,
      'value',
      this.stuffService.format(value)
    );
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
