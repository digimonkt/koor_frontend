import { SVG } from "@assets/svg";
import NotificationContent from "@components/notification";
import { Menu, MenuItem } from "@mui/material";
import React, { useEffect, useRef } from "react";
import styles from "./notificationPopup.module.css";

function NotificationPopup() {
  const wrapperRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setAnchorEl(null);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Unbind the event listener on clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div>
      <SVG.NotificationIcon onClick={handleClick} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        className="drop_menu"
      >
        <div ref={wrapperRef} id="notificationPopup">
          <MenuItem>
            <div className={styles.notification_heading_div}>
              <div>
                <h3 className={styles.notification_heading}>Notifications</h3>
              </div>
              <div>
                <SVG.CrossCircle onClick={handleClose} />
              </div>
            </div>
          </MenuItem>
          <MenuItem className="w-100">
            <NotificationContent footer />
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
}

export default NotificationPopup;
