import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
    transform(value: string[], search: string): string[] {
        return value.filter(item => item.toLowerCase().includes(search));
    }
}
