import {NotificationService} from './notification.service';
import {NotificationModel} from '../models/notification';

describe('NotificationService - сервис по работе с нотификациями', () => {
    let testedService: NotificationService;

    beforeEach(() => {
        testedService = new NotificationService();
    });

    it('Если вызывается метод по добавлению нотификации, то переданная нотификация попадает в стрим', () => {
        // arrange
        let result: NotificationModel;

        testedService.notificationsStream$.subscribe(data => {
            result = data;
        });

        // act
        const notification: NotificationModel = {text: 'some text', type: 'success'};

        testedService.addNotification(notification);

        // assert
        expect(result).toEqual(notification);
    });
});
