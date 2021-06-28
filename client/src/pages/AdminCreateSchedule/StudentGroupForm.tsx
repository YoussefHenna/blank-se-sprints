import React from 'react'
import {
  FormControl,
  makeStyles,
  Theme,
  TextField,
  InputAdornment,
  Input,
  InputLabel,
  FormHelperText
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import { useStyles } from './AdminCreateScheduleStyles'
//import {StudentGroup} from '../../../../SharedObjects/users'
//import { getStudentGroups } from "./AdminCreateScheduleRequests";
import _ from 'lodash'
import SearchIcon from '@material-ui/icons/Search';
import {ClassNameMap} from '@material-ui/core/styles/withStyles';
interface Props {

}

const groupSearch = (classes : ClassNameMap) => {


  return (
      <FormControl className={classes.margin}>
        <InputLabel>search for student group</InputLabel>
        <Input
          id="admin-schedule-student-group-search"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <FormHelperText>
          .e.g. Computer Science 2019 
        </FormHelperText>
      </FormControl>
  )
}


const StudentGroupForm : React.FC<Props> = () => {


  React.useEffect(()=>{

    const fetchData = async () => {
    }

    fetchData()

  },[])

  const classes = useStyles()
  return (
      <form >
        {groupSearch(classes)}
      </form>
    )
}

export default StudentGroupForm
