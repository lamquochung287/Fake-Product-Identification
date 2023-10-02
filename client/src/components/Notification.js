import * as Notifications from 'expo-notifications';

const sendNotification = async (message) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Success',
            body: "Success",
        },
        trigger: {
            seconds: 5, // time in seconds after which the notification will be shown
        },
    });
};

export default sendNotification;