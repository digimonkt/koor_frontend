import { generateFileUrl } from "@utils/generateFileUrl";

export const transformConversationResponse = (data) => {
  const user = data.chat_user[0];
  return {
    id: data.id,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: generateFileUrl(user.image.path || ""),
    },
    lastMessage: {
      message: data.last_message.message,
      attachment: data.last_message.attachment,
      isSeen: data.last_message.is_seen,
      isEdited: data.last_message.is_edited,
      id: data.last_message.id,
      createdAt: data.last_message.created,
    },
  };
};

export const transformMessageResponse = (data) => {
  return {
    id: data.id,
    user: {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      image: generateFileUrl(data.user.image.path || ""),
    },
    conversation: data.conversation.id,
    message: data.message,
    attachment: data.attachment,
    isSeen: data.is_seen,
    isEdited: data.is_edited,
    createdAt: data.created,
  };
};
