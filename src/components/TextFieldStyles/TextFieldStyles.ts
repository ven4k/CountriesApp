export const TextfieldStyles = {
    width: { sm: 250, md: 350 },
    color: "white",
    "& .MuiOutlinedInput-root:hover": {
        "& > fieldset": {
            borderColor: "red",

        }
    },
    "& .MuiOutlinedInput-root": {
        "& > fieldset": {
            borderColor: "white",
        }
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
        "& > fieldset": {
            borderColor: "white",
        }
    },
    "& .MuiFormLabel-root": {
        color: 'white !important'
    },
    "& .MuiInputBase-root": {
        "& input": {
            color: "white"
        }
    }
}

