import { faker } from "@faker-js/faker";

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
