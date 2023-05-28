import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage, db } from "../../config/firebase";
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';
import { ref, set } from "firebase/database";




function Form3(props) {

  let [gender, setgender] = useState("")
  let [skill, setskill] = useState()

  const handlegender = (e) => {
    setgender(e.target.value)

  }

  const handleupload = (e) => {
    console.log(e.target.files[0]);

    const storageref = sRef(storage, `files/${e.target.files[0].name}`)

    uploadBytes(storageref, e.target.files[0]).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url)
      })
        .catch((e) => {

        })
    }).catch((e) => {

    })
  };




  const handlesubmit = async () => {
    if (skill == "" || gender == "") {
      alert("enter value ");
    } else {
      let name = localStorage.getItem("Name");
      let lastname = localStorage.getItem("LastName");
      let email = localStorage.getItem("Email");
      let password = localStorage.getItem("Password");
      let education = localStorage.getItem("Education");
      let g_cgp = localStorage.getItem("g_cgp");

      console.log(name, email, password, education, lastname, g_cgp);

      try {
        let user = await createUserWithEmailAndPassword(auth, email, password)
        console.log(user.user.uid)

        let obj = {
          name,
          lastname,
          email,
          password,
          education,
          g_cgp,
          uid: user.user.uid,
        };

        let dbref = ref(db,`user/${user.user.uid}`) // ref path
        await set (dbref,obj)
        alert("User Added")

      }
      catch (e) {
        alert(e)

      }

    }
  };



  return (
    <div style={{ width: 400, margin: "auto" }}>
      <h1>General details</h1>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel onChange={(e) => handlegender(e)} value="female" control={<Radio />} label="Female" />
          <FormControlLabel onChange={(e) => handlegender(e)} value="male" control={<Radio />} label="Male" />
          <FormControlLabel onChange={(e) => handlegender(e)} value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>

      <br />

      <br />

      <input
        style={{ width: "190px" }}
        type="text"
        value={skill}
        onChange={(e) => setskill(e.target.value)}
        placeholder="enter skills"
      />

      <br />
      <input
        style={{ width: "190px" }}
        type="file"

        onChange={(e) => handleupload(e)}
        placeholder="enter skills"
        accept="image/*"
      />
      <br />

      <button>Back</button>

      <button onClick={() => handlesubmit()}>Submit</button>
    </div>
  );
}

export default Form3;
