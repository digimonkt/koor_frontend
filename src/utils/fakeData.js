import { faker } from "@faker-js/faker";
import { EMPLOYMENT_STATUS, GENDER, ORGANIZATION_TYPE } from "./enum";
export function generateJobSeeker() {
  return {
    id: faker.database.mongodbObjectId(),
    email: faker.internet.email(),
    mobileNumber: faker.phone.number(),
    countryCode: "+91",
    name: faker.name.fullName(),
    profileImage: faker.image.avatar(),
    profile: {
      description: faker.lorem.paragraphs(3),
      dob: faker.date
        .between("2020-01-01T00:00:00.000Z", "2030-01-01T00:00:00.000Z")
        .toISOString(),
      gender: GENDER.male,
      employment_status: EMPLOYMENT_STATUS.fresher,
      market_information: false,
      job_notification: false,
    },
    educationRecord: [
      {
        id: faker.database.mongodbObjectId(),
        degree: faker.name.jobTitle(),
        startDate: faker.date
          .between("2020-01-01T00:00:00.000Z", "2030-01-01T00:00:00.000Z")
          .toISOString(),
        endDate: faker.date
          .between("2020-01-01T00:00:00.000Z", "2030-01-01T00:00:00.000Z")
          .toISOString(),
        isPresent: faker.datatype.boolean(),
        organization: faker.company.name(),
        description: faker.name.jobDescriptor(),
      },
    ],
    workExperience: [
      {
        id: faker.database.mongodbObjectId(),
        title: faker.name.jobTitle(),
        startDate: faker.date
          .between("2020-01-01T00:00:00.000Z", "2030-01-01T00:00:00.000Z")
          .toISOString(),
        endDate: faker.date
          .between("2020-01-01T00:00:00.000Z", "2030-01-01T00:00:00.000Z")
          .toISOString(),
        isPresent: faker.datatype.boolean(),
        organization: faker.company.name(),
        description: faker.name.jobDescriptor(),
      },
    ],
    resume: [],
    languages: [],
    skills: [],
  };
}

export function generateEmployer() {
  return {
    id: faker.database.mongodbObjectId(),
    email: faker.internet.email(),
    mobileNumber: faker.phone.number(),
    countryCode: "+91",
    name: faker.name.fullName(),
    profileImage: faker.image.avatar(),
    profile: {
      organization_name: faker.company.name(),
      description: faker.name.jobDescriptor(),
      organization_type: ORGANIZATION_TYPE.business,
      license_id: "AB1235E5342",
      license_id_file: "",
    },
  };
}

export function generateRandomId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

// date formate function "yyyy-mm-dd"
export const formatDateFunc = (dateData) => {
  const d = new Date(dateData);
  // const date = d.getDate();
  // const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return year;
};
