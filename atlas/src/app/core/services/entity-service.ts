import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor() { }

  clone<T>(source : T) : T {
    return Object.assign({}, source);
  }

  merge = (target: any, sources : any) => {
    Object.assign(target, ...sources)
  }

  propertiesDiffer = (entityA : {}, entityB : {}) => {
    Object.keys(entityA).find(key => entityA[key] !== entityB[key]);
  }
}
