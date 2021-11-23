import { makeStyles } from "@mui/styles";


export const styles = makeStyles((theme) => ({
  mainNav: {
    [theme.breakpoints.down('md')]:{
      display:"none"
    }
  },
}));
