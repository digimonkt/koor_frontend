import { NOTIFICATION_TYPE } from "@utils/enum";
import ExpiredJobCard from "./expiredJobCard";
import JobNotificationCard from "./jobNotificationCard";
import NotificationContentComponent from "./notificationContent";
import AppliedJobCard from "./appliedJobCard";
import ShortlistedUserCard from "./shortlistedUserCard";
import MessageNotificationCard from "./messageCard";

const NotificationContent = NotificationContentComponent;

export const getNotificationCardByType = (item, handleClose) => {
  switch (item.notificationType) {
    case NOTIFICATION_TYPE.advanceFilter:
      return <JobNotificationCard {...item} />;
    case NOTIFICATION_TYPE.expiredJob:
      return <ExpiredJobCard {...item} />;
    case NOTIFICATION_TYPE.applied:
      return <AppliedJobCard {...item} />;
    case NOTIFICATION_TYPE.shortlisted:
      return <ShortlistedUserCard {...item} />;
    case NOTIFICATION_TYPE.message:
      return <MessageNotificationCard {...item} handleClose={() => handleClose()} />;
    default:
      return <></>;
  }
};

export default NotificationContent;
