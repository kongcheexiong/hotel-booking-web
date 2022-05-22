//btn style
import { font } from "./constants";
export const btnStyle = {
  "&.MuiButton-root": {
    fontFamily: "Noto Sans Lao",
    
  },
  "&.MuiButton-text": {
    color: ``,
  },
  "&.MuiButton-contained": {
    color: ``,
  },
  "&.MuiButton-outlined": {
    color: ``,
  },
};

//text
export const textStyle = {
  width: "200px",

  "& .MuiInputBase-root": {
    fontFamily: "Noto Sans Lao",
    height: 35,
    fontSize: '14px'
  },
  "& label.Mui-focused": {
    color: "",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "",
    },
    "&:hover fieldset": {
      borderColor: "",
    },
    "&.Mui-focused fieldset": {
      borderColor: "",
    },
  },
};
export const datagridSx = {
  //borderRadius: 2,
  fontFamily: `${font.LAO_FONT}`,
  "& .MuiDataGrid-cell": {
    backgroundColor: "",
    padding: "5px 8px",
    fontSize: '14px',
    ///fontWeight: '300',

    borderWidth: 1,
    borderColor: "#F8F9FA",
    borderStyle: "solid",
  },

  "& .MuiDataGrid-main": {
    // borderRadius: 2
  },
  "& .MuiDataGrid-virtualScrollerRenderZone": {
    "& .MuiDataGrid-row": {
      "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235, .2)" },
    },
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#1565C0",
    color: "white",
    fontSize: '14px'
  },
};
