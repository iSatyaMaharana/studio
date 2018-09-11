import { Injectable } from '@angular/core';
import * as _ from 'lodash';

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

  camelCase = (source : any) : any  => {
    return source.map(obj => _.mapKeys(obj, (value, key) =>  key != '_id' ?  _.camelCase(key): key ));
    
  }
}
