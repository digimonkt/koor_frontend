import { Container, Divider, Stack } from "@mui/material";
import React from "react";
import XIcon from "@mui/icons-material/X";
import { Link } from "react-router-dom";
import { SVG } from "../../assets/svg";
import dayjs from "dayjs";
import { SOCIAL_LINKS } from "@utils/enum";

function Footer() {
  return (
    <div className="footer">
      <Container
        maxWidth={false}
        sx={{
          "@media(min-width:992px)": {
            paddingLeft: "100px",
            paddingRight: "100px",
          },
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            alignItems="center"
          >
            <SVG.KoorLogo />
            <span className="copy-right">
              © Copyright {dayjs().year()}, Koor
            </span>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <div className="footer-menu">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search/jobs">Jobs</Link>
              </li>
              <li>
                <Link to="/search/tenders">Tenders</Link>
              </li>
              <li>
                <Link to="/about-us">About us</Link>
              </li>
            </ul>
          </div>
          <Divider orientation="vertical" flexItem />
          <div style={{ border: "2px solid black" }}>
            <ul className="social-icons">
              <li>
                <a target="_blank" rel="noreferrer" href={SOCIAL_LINKS.twitter}>
                  <XIcon />
                </a>
              </li>
              <li>
                <a target="_blank" rel="noreferrer" href={SOCIAL_LINKS.youtube}>
                  <SVG.YoutubeIcon />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={SOCIAL_LINKS.instagram}
                >
                  <SVG.InstagramIcon />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={SOCIAL_LINKS.linkedin}
                >
                  <SVG.LinkedInIcon />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={SOCIAL_LINKS.facebook}
                >
                  <SVG.FacebookIcon />
                </a>
              </li>
            </ul>
          </div>
        </Stack>
      </Container>
    </div>
  );
}

export default Footer;
