import React from 'react'
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Theme,
  TextField
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import { useStyles } from './AdminCreateScheduleStyles'
import {StudentGroup} from '../../../../SharedObjects/users'
import { getStudentGroups } from "./AdminCreateScheduleRequests";
import _ from 'lodash'
interface Props {

}


const StudentGroupForm : React.FC<Props> = () => {

  const [studentGroups, setStudentGroups] = React.useState<StudentGroup[]>([]);
  const [admissionYear, setAdmissionYear] = React.useState<number>(0);
  const [semester, setSemester] = React.useState<number>(0);
  const [facultyId, setFacultyId] = React.useState<string>("");
  const [selectedStudentGroupId, setSelectedStudentGroupId] = React.useState<string>("");

  React.useEffect(()=>{

    const fetchData = async () => {
      setStudentGroups(await getStudentGroups())
    }

    fetchData()

  },[])

  const classes = useStyles()
  return (
      <form >
    <Autocomplete
      className={classes.formComponent}
      options={_.uniq(studentGroups.map(s=>s.admissionYear.toString()))}
      getOptionLabel={(option: any) => option}
      renderInput={(params) => (
        <TextField required {...params} label="Select admission year" variant="outlined" />
      )}
    />
    <Autocomplete
      className={classes.formComponent}
      options={_.uniq(studentGroups.map(s=>s.semester.toString()))}
      getOptionLabel={(option: any) => option}
      renderInput={(params) => (
        <TextField required {...params} label="Select semester" variant="outlined" />
      )}
    />
    <Autocomplete
      className={classes.formComponent}
      options={_.uniq(studentGroups.map(s=>s.facultyName))}
      getOptionLabel={(option: any) => option}
      renderInput={(params) => (
        <TextField required {...params} label="Select faculty" variant="outlined" />
      )}
    />
      </form>
    )
}

export default StudentGroupForm
