import {Pipe, PipeTransform} from '@angular/core';
import {Mapper} from './mapper';

@Pipe({name: 'mapper'})
export class MapperPipe<A, B> implements PipeTransform {
    transform(value: A, mapper: Mapper<A, B>, ...args: any[]): B {
        return mapper(value, ...args);
    }
}
