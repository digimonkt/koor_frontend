import { Chip } from "@mui/material";
import { SVG } from "@assets/svg";
import { IMAGES } from "@assets/images";

export const MANAGE_TENDERS_ITEMS = [
  {
    img: IMAGES.Pf,
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
    img: IMAGES.Education,
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
    img: IMAGES.Eon,
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
