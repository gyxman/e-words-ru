import {NotificationFacadeService} from './notification-facade.service';
import {NotificationService} from './notification.service';
import {TestBed} from '@angular/core/testing';
import {instance, mock, verify} from 'ts-mockito';
import {NotificationModel} from '../models/notification';

describe('NotificationFacadeService - публичный сервис для добавления нотификаций', () => {
    let testedService: NotificationFacadeService;
    let notificationServiceMock: NotificationService;

    beforeEach(() => {
        notificationServiceMock = mock(NotificationService);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NotificationFacadeService,
                {
                    provide: NotificationService,
                    useFactory: () => instance(notificationServiceMock),
                },
            ],
        });
    });

    beforeEach(() => {
        testedService = TestBed.inject(NotificationFacadeService);
    });

    it('Если необходимо показать нотификацию, то вызываем метод показа, который передаст данные в сервис по работе с нотификациями', () => {
        // arrange
        const notification: NotificationModel = {text: 'some text', type: 'success'};

        // act
        testedService.showNotification(notification);

        // assert
        verify(notificationServiceMock.addNotification(notification)).once();
    });
});
