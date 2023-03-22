import { IMAGES } from "@assets/images";
import { Box, Container } from "@mui/material";
import React from "react";
import Articles from "./Articles";
import styles from "./resource.module.css";

const Content = () => {
  return (
    <>
      <div className={styles.content_first_div}>
        <Container>
          <div className={styles.content_div}>
            <h1 className={styles.content_heading}>Where ?</h1>
            <p className={styles.content_text_p}>
              Odio convallis nunc odio dui platea sagittis donec non, quis.
              Vitae morbi cum lobortis eget lorem consequat. Quis turpis nulla
              cras rhoncus fermentum, et, porta tristique. Donec mauris sit
              augue felis egestas rutrum at consequat. Amet nisl semper nulla
              interdum at. Scelerisque volutpat urna sed molestie. Sodales
              mauris vestibulum, proin eget orci duis. Ornare scelerisque
              parturient eget nulla mi nunc commodo, vitae. Volutpat tempus, a
              nec vivamus sit volutpat egestas. Facilisis quis mattis ut arcu.
              Odio risus at tristique mauris orci, ipsum tincidunt quisque id.
              Volutpat velit sed auctor nam in ullamcorper adipiscing. Sed nec
              gravida nec tincidunt. Eget luctus quam in mauris nunc. Turpis
              blandit ut pretium ligula.
            </p>
            <Box>
              <img src={IMAGES.ResourceImg} className={styles.content_img} />
            </Box>
            <p className={styles.content_text_p}>
              Odio convallis nunc odio dui platea sagittis donec non, quis.
              Vitae morbi cum lobortis eget lorem consequat. Quis turpis nulla
              cras rhoncus fermentum, et, porta tristique. Donec mauris sit
              augue felis egestas rutrum at consequat. Amet nisl semper nulla
              interdum at. Scelerisque volutpat urna sed molestie. Sodales
              mauris vestibulum, proin eget orci duis. Ornare scelerisque
              parturient eget nulla mi nunc commodo, vitae. Volutpat tempus, a
              nec vivamus sit volutpat egestas. Facilisis quis mattis ut arcu.
              Odio risus at tristique mauris orci, ipsum tincidunt quisque id.
              Volutpat velit sed auctor nam in ullamcorper adipiscing. Sed nec
              gravida nec tincidunt. Eget luctus quam in mauris nunc. Turpis
              blandit ut pretium ligula.
            </p>
            <h2 className={styles.content_sub_head}>What if nothing helps?</h2>
            <span className={styles.content_text_span}>
              Use online job search platforms: Use online job search platforms
              like Indeed, LinkedIn, Glassdoor, and Monster to search for jobs
              that match your skills and experience. Create a profile on these
              sites and upload your resume.
            </span>
            <ul>
              <li className={styles.content_text_span}>
                Network: Networking can be an effective way to find job
                opportunities. Reach out to your friends, family, and former
                colleagues to let them know that you are looking for work.
                Attend career fairs, industry events, and conferences to connect
                with people in your field.
              </li>
              <li className={styles.content_text_span}>
                Apply for jobs: Apply for jobs that match your skills and
                experience. Be persistent and keep applying even if you don't
                get a response.
              </li>
              <li className={styles.content_text_span}>
                Consider temporary work: Consider taking temporary work or
                freelance work while you search for a permanent job. This can
                help you build your skills, gain experience, and make
                connections in your field.
              </li>
              <li className={styles.content_text_span}>
                Follow up: Follow up with the employers you have applied to and
                attend job interviews. Send a thank-you note or email after an
                interview to show your appreciation.
              </li>
            </ul>
            <h4 className={styles.text_content}>
              Remember that finding work takes time and effort. Stay positive,
              be persistent, and keep trying. Good luck!
            </h4>
          </div>
        </Container>
        <Box>
          <Articles />
        </Box>
      </div>
    </>
  );
};

export default Content;
