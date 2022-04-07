import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NodeService {
  private node: Subject<Node> = new BehaviorSubject<any>([]);

  get node$() {
    return;
    // return this.node.asObservable().filter((node) => !!node);
  }

  addNode(data: Node) {
    this.node.next(data);
  }
}
