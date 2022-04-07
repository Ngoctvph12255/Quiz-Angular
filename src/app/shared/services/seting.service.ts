import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetingService {
  public sidebarImageIndex = 0;
  public sidebarImageIndexUpdate: EventEmitter<number> = new EventEmitter();
  public sidebarFilter = '#fff';
  public sidebarFilterUpdate: EventEmitter<string> = new EventEmitter();
  public sidebarColor = '#D80B0B';
  public sidebarColorUpdate: EventEmitter<string> = new EventEmitter();
  public isCollapsed: boolean = false;
  public hideSidebar: boolean = false;

  constructor() {
  }

  getSidebarImageIndex(): number {
    return this.sidebarImageIndex;
  }

  setSidebarImageIndex(id: any) {
    this.sidebarImageIndex = id;
    this.sidebarImageIndexUpdate.emit(this.sidebarImageIndex);
  }

  getSidebarFilter(): string {
    return this.sidebarFilter;
  }

  setSidebarFilter(color: string) {
    this.sidebarFilter = color;
    this.sidebarFilterUpdate.emit(this.sidebarFilter);
  }

  getSidebarColor(): string {
    return this.sidebarColor;
  }

  setSidebarColor(color: string) {
    this.sidebarColor = color;
    this.sidebarColorUpdate.emit(this.sidebarColor);
  }


}
