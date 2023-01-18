import { Card, CardContent } from "@mui/material";
import React from "react";
import { SVG } from "../../../../assets/svg";
import ModalView from "../../updateProfile/modal";
import UpdateInfo from "../../updateProfile/modal/update-info";
import { Cbutton } from "../../../../components/button";
import CardList from "../education/cardlist";

const Languages = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const langugesList = [
    {
      title: "English",
      subtitle: (
        <>
          Spoken: <strong>Fluent</strong>
          <br />
          Written: <strong>Fluent</strong>
        </>
      ),
    },
    {
      title: "German",
      subtitle: (
        <>
          Spoken: <strong>Conversational</strong>
          <br />
          Written: <strong>Conversational</strong>
        </>
      ),
    },
    {
      title: "Spanish",
      subtitle: (
        <>
          Spoken: <strong>Basic</strong>
          <br />
          Written: <strong>Conversational</strong>
        </>
      ),
    },
  ];
  return (
    <>
      <Card
        sx={{
          "&.MuiCard-root": {
            boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
          },
        }}
      >
        <CardContent
          sx={{
            "&.MuiCardContent-root": {
              padding: "25px",
            },
          }}
        >
          <div className="add-content">
            <h2 className="mb-4">Languages</h2>
            <ul className="listitems">
              {langugesList.map((item, index) => (
                <li key={index}>
                  <CardList {...item} />
                </li>
              ))}
            </ul>

            <div className="text-center mt-4">
              <Cbutton
                onClick={handleClickOpen}
                variant="outlined"
                sx={{
                  "&.MuiButton-outlined": {
                    borderRadius: "73px",
                    border: "1px solid #EEA23D",
                    color: "#EEA23D",
                    fontWeight: "500",
                    fontSize: "16px",
                    fontFamily: "Bahnschrift",
                    padding: "6px 30px",

                    "&:hover": { background: "#eea23d14" },
                    "@media (max-width: 992px)": {
                      padding: "10px 16px",
                      fontSize: "14px",
                    },
                  },
                }}
              >
                <span className="me-2 d-inline-flex">
                  <SVG.PlushIcon />
                </span>
                Add language
              </Cbutton>
            </div>
          </div>
        </CardContent>
      </Card>
      <ModalView
        open={open}
        handleClose={handleClose}
        content={
          <UpdateInfo
            title="Languages"
            color="#EEA23D"
            bgcolor="#FEEFD3"
            icon={<SVG.LanguageIcon />}
            description={[
              <>
                <p>
                  Add languages that your can speak or write. This will be
                  helpfull in multi-cultural or tourist regions.
                </p>
              </>,
            ]}
            buttonHover="#eea23d14"
            handleClose={handleClose}
            buttontext={
              <>
                <span className="me-3 d-inline-flex">
                  <SVG.PlushIcon />
                </span>
                Add Language
              </>
            }
          />
        }
      />
    </>
  );
};
export default Languages;
