import { Chip } from "@mui/material";
import pf from "./assets/pf.png";
import recent2 from "./assets/education.png";
import recent3 from "./assets/eon.png";
import { SVG } from "@assets/svg";

export const MANAGE_TENDERS_ITEMS = [
  {
    img: pf,
    title: "Path finder",
    plan: "Interview plan",

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
      "We work with aluminium for last 20 years. We know what to do. ",
    disabled: "disabled",
  },
  {
    img: recent2,
    title: "Education development trust",
    plan: "Interview planned",

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
      "Viverra venenatis arcu consectetur nisl eu risus et ullamcorper elementum. Varius neque facilisi dolor donec commodo lobortis est sollicitudin. Enim, ipsum et varius ante. Pulvinar condimen…",
  },
  {
    img: recent3,
    title: "Education development trust",
    plan: "Interview plan",

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
      "Viverra venenatis arcu consectetur nisl eu risus et ullamcorper elementum. Varius neque facilisi dolor donec commodo lobortis est sollicitudin. Enim, ipsum et varius ante. Pulvinar condimen…",
  },
];
