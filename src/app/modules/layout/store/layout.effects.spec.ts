import {LayoutEffects} from './layout.effects';
import {EffectsMetadata, getEffectsMetadata} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {hot} from 'jest-marbles';
import {wordsActions} from '../../words/store/words.actions';

describe('LayoutEffects - эффекты по работе с авторизованной зоной приложения', () => {
    let testedEffects: LayoutEffects;
    let metadata: EffectsMetadata<LayoutEffects>;
    let actionsMock$: Observable<Action>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LayoutEffects, provideMockActions(() => actionsMock$)],
        });

        testedEffects = TestBed.inject(LayoutEffects);
        metadata = getEffectsMetadata(testedEffects);
    });

    describe('getWordsStart$ - эффект по загрузке слов из базы данных', () => {
        it('Эффект по загрузке слов из базы данных диспатчит экшен, переподписывается при ошибке', () => {
            // assert
            expect(metadata.getWordsStart$).toEqual({
                dispatch: true,
                useEffectsErrorHandler: true,
            });
        });

        it('Если эффекты проинициализировись, начинается загрузка слов из базы данных', () => {
            // act
            actionsMock$ = hot('x', {
                x: {type: '[layout] Инициализация эффектов'},
            });

            // assert
            const expected$ = hot('x', {
                x: wordsActions.getWordsStart(),
            });

            expect(testedEffects.getWordsStart$).toBeObservable(expected$);
        });
    });
});
