import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  props: {
    MuiTextField: {
      variant: "outlined",
      margin: "normal",
      fullWidth: true,
    },
  },
});

export default theme;
