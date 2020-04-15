import { Directive, HostListener, HostBinding, Output, EventEmitter } from "@angular/core";

@Directive({
  selector: '[dnd]'
})
export class DndDirective {

  @HostBinding('class.dragdrop') fileHover: boolean;
  @Output() fileDropped = new EventEmitter<FileList>();

  @HostListener('dragover', ['$event']) onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.fileHover = true;
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.fileHover = false;
  }

  @HostListener('drop', ['$event']) public ondrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.fileHover = false;

    if (e.dataTransfer.files.length > 0) {
      this.fileDropped.emit(e.dataTransfer.files);
    }    
  }

}