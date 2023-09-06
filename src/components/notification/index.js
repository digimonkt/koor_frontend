import { NOTIFICATION_TYPE } from "@utils/enum";
import ExpiredJobCard from "./expiredJobCard";
import JobNotificationCard from "./jobNotificationCard";
import NotificationContentComponent from "./notificationContent";
import AppliedJobCard from "./appliedJobCard";
import ShortlistedUserCard from "./shortlistedUserCard";
import MessageNotificationCard from "./messageCard";
import PlannedInterviewCard from "./plannedInterviewCard";

const NotificationContent = NotificationContentComponent;

export const getNotificationCardByType = (item, handleClose, role) => {
  switch (item.notificationType) {
    case NOTIFICATION_TYPE.advanceFilter:
      return <JobNotificationCard {...item} />;
    case NOTIFICATION_TYPE.expiredJob:
      return <ExpiredJobCard {...item} />;
    case NOTIFICATION_TYPE.applied:
      return <AppliedJobCard {...item} />;
    case NOTIFICATION_TYPE.shortlisted:
      return <ShortlistedUserCard {...item} />;
    case NOTIFICATION_TYPE.plannedInterviews:
      return <PlannedInterviewCard {...item} />;
    case NOTIFICATION_TYPE.message:
      return <MessageNotificationCard {...item} handleClose={() => handleClose()} role={role} />;
    default:
      return <></>;
  }
};

export default NotificationContent;
