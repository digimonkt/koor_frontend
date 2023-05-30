import { Container, Divider, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { SVG } from "@assets/svg";
import dayjs from "dayjs";

function Footer() {
  return (
    <div className="footer">
      <Container>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          alignItems="center"
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
          <div>
            <ul className="social-icons">
              <li>
                <Link to="/">
                  <SVG.TwitterIcon />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <SVG.YoutubeIcon />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <SVG.InstagramIcon />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <SVG.LinkedInIcon />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <SVG.FacebookIcon />
                </Link>
              </li>
            </ul>
          </div>
        </Stack>
      </Container>
    </div>
  );
}

export default Footer;
