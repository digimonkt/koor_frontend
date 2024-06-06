import { NOTIFICATION_TYPE } from "../../utils/enum";
import ExpiredJobCard from "./expiredJobCard";
import JobNotificationCard from "./jobNotificationCard";
import NotificationContentComponent from "./notificationContent";
import AppliedJobCard from "./appliedJobCard";
import ShortlistedUserCard from "./shortlistedUserCard";
import MessageNotificationCard from "./messageCard";
import PlannedInterviewCard from "./plannedInterviewCard";
import RejectedCard from "./rejectedCard";
import JobPreference from "./jobPreference";
import UpdatePassword from "./updatePassword";
import AppliedTenderCard from "./appliedTenderCard";

const NotificationContent = NotificationContentComponent;

export const getNotificationCardByType = (
  item,
  handleClose,
  role,
  handleRemoveMessages,
  handleSeen
) => {
  switch (item.notificationType) {
    case NOTIFICATION_TYPE.advanceFilter:
      return (
        <JobNotificationCard
          {...item}
          handleClose={() => handleClose()}
          role={role}
          handleSeen={handleSeen}
        />
      );
    case NOTIFICATION_TYPE.expiredJob:
      return (
        <ExpiredJobCard
          {...item}
          handleClose={() => handleClose()}
          role={role}
          handleSeen={handleSeen}
        />
      );
    case NOTIFICATION_TYPE.appliedJob:
      return (
        <AppliedJobCard
          {...item}
          handleClose={() => handleClose()}
          role={role}
          handleSeen={handleSeen}
        />
      );
    case NOTIFICATION_TYPE.shortlisted:
      return (
        <ShortlistedUserCard
          {...item}
          handleClose={() => handleClose()}
          role={role}
          handleSeen={handleSeen}
        />
      );
    case NOTIFICATION_TYPE.plannedInterviews:
      return (
        <PlannedInterviewCard
          {...item}
          handleClose={() => handleClose()}
          role={role}
          handleSeen={handleSeen}
        />
      );
    case NOTIFICATION_TYPE.message:
      return (
        <MessageNotificationCard
          {...item}
          handleClose={() => handleClose()}
          handleRemoveMessages={handleRemoveMessages}
          role={role}
          handleSeen={handleSeen}
        />
      );
    case NOTIFICATION_TYPE.rejected:
      return (
        <RejectedCard
          {...item}
          handleSeen={handleSeen}
          handleClose={() => handleClose()}
          role={role}
        />
      );
    case NOTIFICATION_TYPE.jobPreference:
      return (
        <JobPreference
          {...item}
          handleClose={() => handleClose()}
          role={role}
          handleSeen={handleSeen}
        />
      );
    case NOTIFICATION_TYPE.passwordUpdate:
      return (
        <UpdatePassword
          {...item}
          handleClose={() => handleClose()}
          role={role}
          handleSeen={handleSeen}
        />
      );
    case NOTIFICATION_TYPE.appliedTender:
      return (
        <AppliedTenderCard
          {...item}
          handleClose={() => handleClose()}
          role={role}
          handleSeen={handleSeen}
        />
      );
    default:
      return <></>;
  }
};

export default NotificationContent;
