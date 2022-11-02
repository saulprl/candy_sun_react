import { Check } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";

const LoadingButton = (props) => {
  if (props.status === "loading") {
    return (
      <Button {...props}>
        <CircularProgress />
      </Button>
    );
  } else if (props.status === "done") {
    return (
      <Button {...props}>
        <Check />
      </Button>
    );
  } else {
    return <Button {...props}>{props.children}</Button>;
  }
};

export default LoadingButton;
