import { IMAGES } from "@assets/images";
import { SVG } from "@assets/svg";
import { Chip } from "@mui/material";
export const RECENT_ITEMS = [
  {
    img: IMAGES.RecentOne,
    title: "Muraua Birhuneya",
    subtitle: (
      <>
        <span>Applied 5 m ago to: </span>{" "}
        <div>Online Research Participant (Work From Home...)</div>
      </>
    ),
    requirement: "Meets your requirements with:",
    chiplabel: (
      <>
        <Chip
          label="Education"
          className="chiplabel"
          icon={<SVG.SchoolIcon />}
        />
        <Chip
          label="Skills"
          className="chiplabel"
          icon={<SVG.SmallSkillsIcon />}
        />
        <Chip
          label="Language"
          className="chiplabel"
          icon={<SVG.SmallLangugeIcon />}
        />
      </>
    ),
    description:
      "Information about the person that they attach as a plain text to grab employer’s attention. We can fit two rows here to be able to showcase yourself before a potential employer even opens your resume. Like “Hi, I’m Maraua and I’m the perfect fit for you...”",
    disabled: "disabled",
  },
  {
    img: IMAGES.RecentTwo,
    title: "Evan Bolognov",
    subtitle: (
      <>
        <span>Applied 25 m ago to: </span>{" "}
        <div>User interface designer for a design studio</div>
      </>
    ),
    requirement: "Meets your requirements with:",
    chiplabel: (
      <>
        <Chip
          label="Skills"
          className="chiplabel"
          icon={<SVG.SmallSkillsIcon />}
        />
        <Chip
          label="Language"
          className="chiplabel"
          icon={<SVG.SmallLangugeIcon />}
        />
      </>
    ),
    description:
      "Hi there! Though I don’t have an education mentioned in your job post, I have 8 years of experience in the job described. Please check out my resume, I’m sure you’ll like it. Looking forward to talking in person!",
  },
  {
    img: IMAGES.RecentThree,
    title: "Junges Müller",
    subtitle: (
      <>
        <span>Applied 30 m ago to: </span>{" "}
        <div>Online Research Participant (Work From Home...</div>
      </>
    ),
    requirement: "Meets your requirements with:",
    chiplabel: (
      <>
        <Chip
          label="Skills"
          className="chiplabel"
          icon={<SVG.SmallSkillsIcon />}
        />
        <Chip
          label="Language"
          className="chiplabel"
          icon={<SVG.SmallLangugeIcon />}
        />
      </>
    ),
    description:
      "Information about the person that they attach as a plain text to grab employer’s attention. We can fit two rows here to be able to showcase yourself before a potential employer even opens your resume. Like “Hi, I’m Maraua and I’m the perfect fit for you...”",
  },
  {
    img: IMAGES.RecentFour,
    title: "Evan Bolognov",
    subtitle: (
      <>
        <span>Applied 25 m ago to: </span>{" "}
        <div>User interface designer for a design studio</div>
      </>
    ),
    requirement: "Meets your requirements with:",
    chiplabel: (
      <>
        <Chip
          label="Skills"
          className="chiplabel"
          icon={<SVG.SmallSkillsIcon />}
        />
        <Chip
          label="Language"
          className="chiplabel"
          icon={<SVG.SmallLangugeIcon />}
        />
      </>
    ),
    description:
      "Hi there! Though I don’t have an education mentioned in your job post, I have 8 years of experience in the job described. Please check out my resume, I’m sure you’ll like it. Looking forward to talking in person!",
  },
  {
    img: IMAGES.RecentFive,
    title: "Laura M. Smith",
    subtitle: (
      <>
        <span>Applied 25 m ago to: </span>{" "}
        <div>User interface designer for a design studio</div>
      </>
    ),
    requirement: "Meets your requirements with:",
    chiplabel: (
      <>
        <Chip
          label="Skills"
          className="chiplabel"
          icon={<SVG.SmallSkillsIcon />}
        />
        <Chip
          label="Language"
          className="chiplabel"
          icon={<SVG.SmallLangugeIcon />}
        />
      </>
    ),
    description:
      "Hi there! Though I don’t have an education mentioned in your job post, I have 8 years of experience in the job described. Please check out my resume, I’m sure you’ll like it. Looking forward to talking in person!",
  },
];
