import { SVG } from "../../assets/svg";
import NotificationContent from "../../components/notification";
import { Badge, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useRef } from "react";
import styles from "./notificationPopup.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllNotificationToReadAPI,
  updateNotificationReadAPI,
} from "../../api/user";
import { updateNotificationCount } from "../../redux/slice/user";
import { useNavigate } from "react-router-dom";

function NotificationPopup() {
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ auth }) => auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [count, setCount] = React.useState(currentUser.notificationCount);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSeen = async (id, navigateUrl) => {
    const res = await updateNotificationReadAPI(id);
    if (res.remote === "success") {
      dispatch(updateNotificationCount(res.data.notification_count));
      setCount(res.data.notification_count);
      if (navigateUrl) {
        navigate(navigateUrl);
      }
    }
  };
  const setAllNotificationToRead = async () => {
    const res = await setAllNotificationToReadAPI();
    if (res.remote === "success") {
      dispatch(updateNotificationCount(0));
      setCount(0);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const notificationSettings = document.getElementById(
        "notification-settings"
      );
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        (!notificationSettings ||
          !wrapperRef.current.contains(notificationSettings))
      ) {
        setAnchorEl(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div>
      <Badge badgeContent={count} color="error">
        <SVG.NotificationIcon onClick={handleClick} />
      </Badge>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: "14px",
          },
        }}
        className="drop_menu"
      >
        <div ref={wrapperRef} id="notificationPopup">
          <MenuItem sx={{ padding: "20px 15px", cursor: "default" }}>
            <div className={styles.notification_heading_div}>
              <div>
                <h3 className={styles.notification_heading}>Notifications</h3>
              </div>
              <div>
                <SVG.CrossCircle
                  style={{ width: "23px", height: "23px", cursor: "pointer" }}
                  onClick={handleClose}
                />
              </div>
            </div>
          </MenuItem>
          <MenuItem
            className="w-100"
            sx={{ padding: "0px", cursor: "default" }}
          >
            <NotificationContent
              footer
              handleSeen={handleSeen}
              handleClose={handleClose}
              setAllNotificationToRead={setAllNotificationToRead}
            />
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
}

export default NotificationPopup;
