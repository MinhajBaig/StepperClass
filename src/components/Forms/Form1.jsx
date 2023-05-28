import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../config/firebase";
import { get, ref } from "firebase/database"



function Form1(props) {

    let [name, setName] = useState("")
    let [lastname, setLastName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")


    useEffect(() => {

        let name = localStorage.getItem("Name")
        let lastname = localStorage.getItem("Last Name")
        let email = localStorage.getItem("Email")
        let password = localStorage.getItem("Password")

        setName(name)
        setLastName(lastname)
        setEmail(email)
        setPassword(password)
    }, [])




    const submit = async () => {
        if (name == "" || lastname == "" || email == "" || password == "") {
            alert("Please Enter All Value")

        } else {
            let dbref = ref(db, "user")
            get(dbref)
                .then((snapshot) => {
                    console.log(snapshot.val())
                    let data = Object.values(snapshot.val())
                    console.log(data)
                    let check = false
                    data.map((v, i) => {
                        if (v.email == email) {
                            check = true
                        }

                    });



                    if (check == true) {
                        alert("Already Registered")
                    }
                    else {
                        localStorage.setItem("Name", name)
                        localStorage.setItem("LastName", lastname)
                        localStorage.setItem("Email", email)
                        localStorage.setItem("Password", password)

                        props.handlechg()
                    }

                })
                .catch((e) => {
                    alert(e);
                });

        }

    }

    // console.log(props)


    return (
        <>
            <div style={{ textAlign: "center", }}>

                <h1>Personal Info</h1>
                <TextField id="outlined-basic" label="First Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                <br /> <br />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastname} onChange={(e) => setLastName(e.target.value)} />
                <br /> <br />
                <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br /> <br />
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br /> <br />
                <Button variant="outlined" color="success" onClick={() => submit()}>Next</Button>

            </div>
        </>
    )
}

export default Form1