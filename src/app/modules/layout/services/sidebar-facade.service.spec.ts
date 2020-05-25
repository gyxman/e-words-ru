import {SidebarFacadeService} from './sidebar-facade.service';
import {TestBed} from '@angular/core/testing';
import {LayoutRouteEnum} from '../enums/layout-route.enum';
import {SidebarMenuItem} from '../models/sidebar-menu-item';
import {cold} from 'jest-marbles';

describe('SidebarFacadeService - сервис по управлению левой панелью', () => {
    let testedService: SidebarFacadeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SidebarFacadeService],
        }).compileComponents();

        testedService = TestBed.inject(SidebarFacadeService);
    });

    describe('allMenu - массив с пунктами меню для левой панели', () => {
        it('Если запрашивается меню для левой панели, то оно приходит в определенном порядке', () => {
            // assert
            const result: SidebarMenuItem[] = [
                {
                    title: 'Добавить слово',
                    key: 'addWord',
                    navigateTo: LayoutRouteEnum.AddWord,
                },
            ];

            expect(testedService.allMenu$).toBeObservable(cold('(x|)', {x: result}));
        });
    });
});
