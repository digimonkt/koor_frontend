import { SVG } from "@assets/svg";
import { faker } from "@faker-js/faker";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";

export const GenerateFakeChatList = (size) => {
  const users = [];
  for (let i = 0; i < size; i++) {
    const user = {
      name: faker.name.findName(),
      image: faker.image.avatar(),
    };
    const jobTitle = faker.name.jobTitle();
    const lastMessage = faker.lorem.sentence();
    const time = new Date().toLocaleTimeString();
    const id = faker.datatype.uuid();

    users.push({ user, jobTitle, lastMessage, time, id });
  }
  return users;
};
export const ImageDataDelete = [
  {
    option: "Edit",
    icon: <SVG.Edit1 />,
    color: "#121212",
  },
  {
    option: "Copy",
    icon: <ContentCopyOutlinedIcon />,
    color: "#121212",
  },
  {
    option: "Quote",
    icon: <FormatQuoteOutlinedIcon />,
    color: "#121212",
  },
  {
    option: "Delete",
    icon: <SVG.DeleteICon />,
    color: "#E8473D",
  },
];
