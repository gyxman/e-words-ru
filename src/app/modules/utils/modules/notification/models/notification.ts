export type NotificationModel = Readonly<{
    text: string;
    type: 'success' | 'warning' | 'error';
    time?: number;
}>;
