import { Card } from "@mui/material";

function CardComponent({ children, ...rest }) {
  return (
    <Card
      className="CardWidth"
      sx={{
        boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
        borderRadius: "20px",
        "@media(max-width:992px)": {
          borderRadius: "20px 20px 0px 0px !important",
        },
      }}
      {...rest}
    >
      {children}
    </Card>
  );
}

export default CardComponent;
