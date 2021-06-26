import { makeStyles } from "@material-ui/core/styles";

/**
 * Add styles here instead of css file
 * https://material-ui.com/styles/basics/ for more info
 * This allows for type safety of style names as well as using theme colors in styles
 * Check AdminCourseEditStyle.ts for an example of usage
 *
 * Same as css names but use camelCase (ex: font-weight -> fontWeight)
 */

export const useStyles = makeStyles((theme) => ({
    formBox: {
        backgroundColor: '#FFFFFF',
        height: '65%',
        width: '75%',
        margin: '0',
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '5px',
    },

    flexContainer: {
        display: 'flex',
        border: '1px #ccc solid',
        height: '100%',
        margin: '0',
    },
    redBox: {
        backgroundColor: '#DB3B38',
        width: '40%',
    },
    greyBox: {
        backgroundColor: '#F3F3F3',
        width: '60%',
    },
    img: {
        width:"500px",
        height:"100%",   
    },
    logIn: {
        display: "flex",
        width: "100%",
        marginTop: "20px",
        fontWeight: "bold",
        fontSize: "30px",
        justifyContent: "center"
    },
    buttonStyle: {
       color: "#B6B6B6",
       borderColor: "#B6B6B6",
        '&:hover': { 
       color: "#E65F62",
       borderColor: "#E65F62"
       },
    },
    center: {
        display: "block",
        width: "100%",
        marginLeft: "85px",
        marginBottom: "265px",
        
    },
    username: {
        placeHolder: "Username"
    },
    buttonPassword: {
        color: "#E65F62",
        borderColor: "#E65F62",
        marginTop: "18px"
    },
    buttonHold: {
        color: "#E65F62",
       borderColor: "#E65F62",
    },
}));
