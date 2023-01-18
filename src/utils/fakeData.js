import { faker } from "@faker-js/faker";
export function generateJobSeeker() {
  return {
    profileImage: faker.image.avatar(),
    mobileNumber: faker.phone.number(),
    jobLetterApplicationNotification: false,
    newsLetterApplicationNotification: false,
    email: faker.internet.email(),
    name: faker.name.findName(),
    dateOfBirth: faker.date
      .between("2020-01-01T00:00:00.000Z", "2030-01-01T00:00:00.000Z")
      .toISOString(),
    intro: faker.lorem.paragraphs(3),
  };
}
