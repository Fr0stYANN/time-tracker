import { NotificationTypes, SetNotificationType } from 'types/notificationTypes';

const { v1: uuidv1 } = require('uuid');

export const buildNotification = ({ message, description, type = 'success' }: SetNotificationType): NotificationTypes => {
    return {
        id: uuidv1(),
        message,
        description,
        type
    };
};
