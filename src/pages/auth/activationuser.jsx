import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FilledButton } from "../../components/button";
import { ResentActivation, VerifyAcountAPI } from "../../api/user";
import { setUserVerificationToken, updateCurrentUser } from "@redux/slice/user";
import { setErrorToast, setSuccessToast } from "@redux/slice/toast";
import Loader from "@components/loader";
import { Box } from "@mui/material";

function ActivatioinUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, userVerificationToken } = useSelector(state => state.auth);
  const [sendingOTP, setSendingOTP] = useState(false);
  const handleResendOTP = async () => {
    setSendingOTP(true);

    const payload = {
      email: currentUser?.email
    };
    const res = await ResentActivation(payload);
    if (res.remote === "success") {
      setSendingOTP(false);
      dispatch(setSuccessToast("Mail send successfully"));
    } else {
      dispatch(setErrorToast("Network Error! Try again"));
    }
  };

  const handleActivationToken = async () => {
    const res = await VerifyAcountAPI(userVerificationToken);
    if (res.remote === "success") {
      dispatch(
        updateCurrentUser({
          profile: {
            isVerified: true,
          },
        })
      );
      dispatch(setUserVerificationToken(null));
      dispatch(setSuccessToast("Account Verified Successfully"));
      navigate("/");
    } else if (res.remote === "failure") {
      dispatch(setUserVerificationToken(null));
      setSendingOTP(false);
      dispatch(setErrorToast("Invalid Link or Expired"));
    } else {
      dispatch(setErrorToast("Network Error! Try again"));
    }
  };
  useEffect(() => {
    navigate("/");
  }, [!currentUser.id]);

  useEffect(() => {
    if (userVerificationToken) {
      setSendingOTP(true);
      const delay = 3000;
      const timeoutId = setTimeout(() => {
        handleActivationToken();
      }, delay);
      // Cleanup function to clear the timeout in case the component unmounts before the delay is completed
      return () => clearTimeout(timeoutId);
    }
  }, [userVerificationToken]);
  return (
    <div className="form-group mb-3 enterotp_input">
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <FilledButton
          type="button"
          onClick={handleResendOTP}
          title={
            sendingOTP ? <Loader loading={sendingOTP} /> : "Resend Mail"
          }
        />
      </Box>
    </div>
  );
}

export default ActivatioinUser;
