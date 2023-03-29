import { NOTIFICATION_TYPE } from "@utils/enum";
import ExpiredJobCard from "./expiredJobCard";
import JobNotificationCard from "./jobNotificationCard";
import NotificationContentComponent from "./notificationContent";

const NotificationContent = NotificationContentComponent;
export const getNotificationCardByType = (item) => {
  switch (item.notificationType) {
    case NOTIFICATION_TYPE.advanceFilter:
      return <JobNotificationCard {...item} />;
    case NOTIFICATION_TYPE.expiredJob:
      return <ExpiredJobCard {...item} />;
  }
};

export default NotificationContent;
