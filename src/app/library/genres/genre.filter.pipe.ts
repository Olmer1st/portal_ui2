import {Pipe, PipeTransform} from '@angular/core';
import {GenreItem} from './genre.item';
@Pipe({
    name: 'genreFilter'
})
export class GenreFilterPipe implements PipeTransform {
    transform(value: GenreItem[], args: string): GenreItem[] {
        let filter = args.toLocaleLowerCase();
        return filter ? value.filter(genre => genre.gdesc.toLocaleLowerCase().indexOf(filter) !== -1) : value;
    }
}
