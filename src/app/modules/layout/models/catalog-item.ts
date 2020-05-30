import {ComponentEnum} from '../../exercises/enums/component.enum';

export type CatalogItem = Readonly<{
    name: string;
    component: ComponentEnum;
}>;
