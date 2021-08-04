import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './Join.css';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Paper from "@material-ui/core/Paper";
import {courses} from '../courses'

export default function Join() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const uid = uuidv4();

  function customTrim(text) {
    if (text) {
      let res = '', count = 0;
      for (let i = 0; i < text.length; i++) {
        if (text[i] == ' ') {
          count++;
          if (count == 2) break;
        } else {
          res = res + text[i];
        }
      }
      return res;
    }
  }

  const validateCourse = (e) => {
    if (!name || !course || courses.indexOf({name: course}) >= 0) {
      e.preventDefault();
    }
  }

  const handleOnChange = (e) => {
    setCourse(e.target.value);
  }

  const handleClickOutside = (e) => {
    setCourse(e.target.value);
  }

  const handleKeyEnter = (e) => {
    setCourse(e.target.value);
  }

  const filterOptions = createFilterOptions({
    limit: 20
  });

  return (

    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">UTDm</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <Autocomplete
          className="joinCourseInput"
          id="autofill"
          filterOptions={filterOptions}
          options={courses}
          style={{ flex: 1 }}
          PaperComponent={({ children }) => (
            <Paper style={{ background: "orange"}}>{children}</Paper>
          )}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} className="textfield" label="Course Name" autoFocus onChange={handleOnChange} onKeyPress={handleKeyEnter} onClick={handleKeyEnter} onBlur={handleClickOutside} value={course} />}
          renderOption={(option, { selected }) => (
            <Typography fontSize="12px">{option.name}</Typography>
          )}
        />
        <Link onClick={validateCourse} to={`/chatroom?name=${name}&uid=${uid}&course=${customTrim(course)}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}