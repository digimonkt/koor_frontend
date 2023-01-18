import { Card, CardTypeMap } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";

interface ICard extends DefaultComponentProps<CardTypeMap> {
  children: React.ReactNode | React.ReactNode[];
}
function CardComponent({ children, ...rest }: ICard) {
  return (
    <Card
      className="CardWidth"
      sx={{
        boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.05)",
        borderRadius: "20px",
      }}
      {...rest}
    >
      {children}
    </Card>
  );
}

export default CardComponent;
