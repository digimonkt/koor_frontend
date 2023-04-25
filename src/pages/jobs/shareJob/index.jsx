import { SVG } from "@assets/svg";
import { LabeledInput } from "@components/input";
import React, { useState } from "react";
import styles from "./shareJobs.module.css";
import { FilledButton } from "@components/button";
import {
  generateFacebookShareUrl,
  generateLinkedinShareUrl,
  generateMailtoUrl,
  generateTelegramShareUrl,
  generateWhatsappShareUrl,
} from "./urlGenerator";
import { useDispatch } from "react-redux";
import { setSuccessToast } from "@redux/slice/toast";
import { updateJobShareCountAPI } from "@api/job";
import { SHARE_PLATFORM } from "@utils/enum";
import { useParams } from "react-router-dom";
function ShareJob() {
  const dispatch = useDispatch();
  const params = useParams();
  const [shareUrl, setShareUrl] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  useState(() => {
    setShareUrl(window.location.href);
    setShareMessage("I wanted to bring your attention to this job opportunity");
  }, []);
  const updateShareCount = ({ platform }) => {
    updateJobShareCountAPI({ jobId: params.jobId, platform });
  };
  return (
    <div>
      <h1>Share</h1>
      <div>
        <h3>Share this link via: </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a
            href={generateWhatsappShareUrl(shareMessage, shareUrl)}
            className={styles.icons}
            onClick={() =>
              updateShareCount({ platform: SHARE_PLATFORM.whatsapp })
            }
            style={{
              border: "solid #25d366 1px",
            }}
            target="_blank"
            rel="noreferrer"
          >
            <SVG.WhatsappIcon />
          </a>
          <a
            href={generateFacebookShareUrl(shareUrl)}
            onClick={() =>
              updateShareCount({ platform: SHARE_PLATFORM.facebook })
            }
            className={styles.icons}
            style={{
              border: "solid #4267B2 1px",
            }}
            target="_blank"
            rel="noreferrer"
          >
            <SVG.Facebook />
          </a>
          <a
            href={generateTelegramShareUrl(shareMessage, shareUrl)}
            className={styles.icons}
            onClick={() =>
              updateShareCount({ platform: SHARE_PLATFORM.telegram })
            }
            style={{
              border: "solid #0088cc 1px",
            }}
            target="_blank"
            rel="noreferrer"
          >
            <SVG.TelegramIcon />
          </a>
          <a
            href={generateLinkedinShareUrl(shareMessage, shareUrl)}
            className={styles.icons}
            onClick={() =>
              updateShareCount({ platform: SHARE_PLATFORM.linkedin })
            }
            style={{
              border: "solid #0288d1 1px",
            }}
            target="_blank"
            rel="noreferrer"
          >
            <SVG.LinkedIn />
          </a>
          <a
            href={generateMailtoUrl({ subject: shareMessage, body: shareUrl })}
            className={styles.icons}
            onClick={() => updateShareCount({ platform: SHARE_PLATFORM.mail })}
            style={{
              border: "solid #000000 1px",
            }}
            target="_blank"
            rel="noreferrer"
          >
            <SVG.MailIcon width="50px" />
          </a>
        </div>
      </div>
      <div>
        <h3>Or copy link: </h3>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <LabeledInput
            value={shareUrl}
            width="100%"
            style={{
              background: "#f0f0f0",
            }}
            onChange={() => {}}
          />
          <FilledButton
            title="Copy"
            onClick={() => {
              dispatch(setSuccessToast("Copied to clipboard"));
              navigator.clipboard.writeText(shareUrl);
              updateShareCount({ platform: SHARE_PLATFORM.directLink });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ShareJob;
