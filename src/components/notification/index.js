import { NOTIFICATION_TYPE } from "@utils/enum";
import ExpiredJobCard from "./expiredJobCard";
import JobNotificationCard from "./jobNotificationCard";
import NotificationContentComponent from "./notificationContent";
import AppliedJobCard from "./appliedJobCard";
import ShortlistedUserCard from "./shortlistedUserCard";

const NotificationContent = NotificationContentComponent;
export const getNotificationCardByType = (item) => {
  switch (item.notificationType) {
    case NOTIFICATION_TYPE.advanceFilter:
      return <JobNotificationCard {...item} />;
    case NOTIFICATION_TYPE.expiredJob:
      return <ExpiredJobCard {...item} />;
    case NOTIFICATION_TYPE.applied:
      return <AppliedJobCard {...item} />;
    case NOTIFICATION_TYPE.shortlisted:
      return <ShortlistedUserCard {...item} />;
    default:
      return <></>;
  }
};

export default NotificationContent;
