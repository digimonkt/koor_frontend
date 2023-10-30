import { generateFileUrl } from "../../utils/generateFileUrl";

export const transformConversationResponse = (data) => {
  const user = data.chat_user[0] || {};
  const lastMessage = data.last_message || {};
  return {
    id: data.id,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: generateFileUrl(user.image?.path || ""),
    },
    lastMessage: {
      message: lastMessage.message,
      attachment: lastMessage.attachment,
      isSeen: lastMessage.is_seen,
      isEdited: lastMessage.is_edited,
      id: lastMessage.id,
      createdAt: lastMessage.created,
    },
    blacklistedByEmployer: user.blacklisted, // this is check job seeker is blacklisted by employer or not
  };
};

export const transformMessageResponse = (data) => {
  return {
    id: data.id,
    user: {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      image: generateFileUrl(data.user.image || ""),
    },
    conversation: data.conversation.id,
    message: data.message,
    attachment: data.attachment,
    isSeen: data.is_seen,
    isEdited: data.is_edited,
    createdAt: data.created,
    reply: data.reply_to || null,
    replyUserId: data?.reply_to?.user_id || null,
    replyUserName: data?.reply_to?.user_name || null
  };
};

export const transformJobApplicationResponse = (result) => {
  return {
    id: result.id,
    shortlistedAt: result.shortlisted_at,
    rejectedAt: result.rejected_at,
    createdAt: result.created,
    shortLetter: result.short_letter,
    interviewAt: result.interview_at,
    job: result.job,
    user: {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      countryCode: result.user.country_code,
      mobileNumber: result.user.mobile_number,
      image: result.user.image,
      description: result.user.description,
      isBlacklisted: result.user.is_blacklisted,
    },
    education: result.education,
    language: result.language,
    skills: result.skill,
  };
};
export const transformTenderApplicationResponse = (result) => {
  return {
    id: result.id,
    shortlistedAt: result.shortlisted_at,
    rejectedAt: result.rejected_at,
    createdAt: result.created,
    shortLetter: result.short_letter,
    user: {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      countryCode: result.user.country_code,
      mobileNumber: result.user.mobile_number,
      image: result.user.image,
      description: result.user.description,
      isBlacklisted: result.user.is_blacklisted,
    },
    tender: {
      id: result.tender.id,
      title: result.tender.title,
    },
  };
};
