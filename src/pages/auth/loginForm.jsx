import { FilledButton } from "src/components/button";
import { LabeledInput } from "src/components/input";
import { useAppDispatch } from "src/redux/hooks";
import { setCurrentUser, setIsLoggedIn } from "src/redux/slice/auth";
import { USER_ROLES } from "src/utils/enum";
import { generateJobSeeker } from "src/utils/fakeData";

function LoginForm({ role }) {
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    dispatch(setIsLoggedIn(true));
    let currentUser = {
      profileImage: "",
      mobileNumber: "",
      email: "",
      name: "",
      jobLetterApplicationNotification: false,
      newsLetterApplicationNotification: false,
    };
    if (role === USER_ROLES.jobSeeker) {
      currentUser = generateJobSeeker();
    }
    dispatch(setCurrentUser(currentUser));
  };
  return (
    <>
      <div className="form-content">
        <form>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Your Email"
              title="Login"
              subtitle="Your mobile phone or email"
            />
          </div>
          <div className="form-group mb-3">
            <LabeledInput
              placeholder="Your Password"
              password
              title="Password"
            />
          </div>
          <div className="text-end forgots">
            <span>Forgot password?</span>
          </div>

          <div className="my-4 text-center">
            <FilledButton
              title="Login"
              isBlueButton={role !== USER_ROLES.jobSeeker}
              onClick={handleLogin}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
