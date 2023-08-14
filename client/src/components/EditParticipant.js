import React from 'react';
import { Button, Card, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import { API } from "../Global";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const participantValidationSchema = yup.object({
  name: yup.string().required().min(3),
  age: yup.string().required(),
  email: yup.string().required().email(),

})

export function EditParticipant() {

  const { id } = useParams();

  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch(`${API}/participant/${id}`, { method: "GET" })
      .then((data) => data.json())
      .then((responseData) => setData(responseData));
  }, []);

  console.log(data);
  return <div className="edit-loading">
  {data ? <EditParticipantForm data={data} /> : "Loading"}
</div>
}
function EditParticipantForm({data}) {
  const { handleBlur, handleSubmit, values, handleChange, touched, errors } = useFormik({
    initialValues: {
      name: data.name,
      age: data.age,
      email: data.email,
    },
    validationSchema: participantValidationSchema,
    onSubmit: (updateParticipant) => {
      addParticipant(updateParticipant);
    }
  });

  const navigate = useNavigate();

  const addParticipant = (updateParticipant) => {
    fetch(`${API}/participant/${data._id}`, {
      method: "PUT",
      body: JSON.stringify(updateParticipant),
      headers: { "Content-type": "application/json" },
    }).then(() => navigate('/mygames'))
  };

  return (
    <div className="join">
      <Card className="participant-card">
      <h2>Participant Form</h2>
      <form className="join-form" onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Participant Name"
          variant="standard"
          onChange={handleChange}
          value={values.name}
          onBlur={handleBlur}
        />
        {touched.name && errors.name ? errors.name : null}
        <TextField
          name="age"
          label="Age"
          variant="standard"
          onChange={handleChange}
          value={values.age}
          onBlur={handleBlur}
        />
        {touched.age && errors.age ? errors.age : null}
        <TextField
          name="email"
          variant="standard"
          label="Email"
          onChange={handleChange}
          value={values.email}
          onBlur={handleBlur}
        />
        {touched.email && errors.email ? errors.email : null}
        <Button
          variant="contained"
          color="error"
          type="submit"
        >
          Update
        </Button>
      </form>
      </Card>
    </div>
  );
}

