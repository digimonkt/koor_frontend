import { SVG } from "@assets/svg";
import { LabeledInput } from "@components/input";
import React, { useState } from "react";
import styles from "./shareTenders.module.css";
import { FilledButton } from "@components/button";
import { useDispatch } from "react-redux";
import { setSuccessToast } from "@redux/slice/toast";
import { generateFacebookShareUrl, generateLinkedinShareUrl, generateMailtoUrl, generateTelegramShareUrl, generateWhatsappShareUrl } from "../urlGenerator";
function ShareTender() {
    const dispatch = useDispatch();
    const [shareUrl, setShareUrl] = useState("");
    const [shareMessage, setShareMessage] = useState("");
    useState(() => {
        setShareUrl(window.location.href);
        setShareMessage("I wanted to bring your attention to this tender opportunity");
    }, []);
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
                        onChange={() => { }}
                    />
                    <FilledButton
                        title="Copy"
                        onClick={() => {
                            dispatch(setSuccessToast("Copied to clipboard"));
                            navigator.clipboard.writeText(shareUrl);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ShareTender;
