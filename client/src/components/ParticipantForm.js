import { Button, Card, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import { API } from "../Global";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const participantId = localStorage.getItem("Auth")

const participantValidationSchema = yup.object({
  name: yup.string().required().min(3),
  age: yup.string().required(),
  email: yup.string().required().email(),

})
export function CreateParticipant() {

  const { id } = useParams();
  // const movie = movieList[id];
  const [data, setData] = useState([]);
  const [tournamentId, setTournamentId] = useState(undefined);

  useEffect(() => {
    fetch(`${API}/tournamentlist/${id}`, { method: "GET" })
      .then((data) => data.json())
      .then((responseData) => {
        setData(responseData);
        setTournamentId(responseData._id); // Set the tournamentId here
      });
  }, [id]);

  // console.log(tournamentId);
  const { handleBlur, handleSubmit, values, handleChange, touched, errors } = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
      participantId: participantId,
      eventID: tournamentId,
    },
    validationSchema: participantValidationSchema,
    onSubmit: (newParticipant) => {
      newParticipant.eventID = tournamentId;
      addParticipant(newParticipant);
      // console.log(newParticipant);
    }
  });

  const navigate = useNavigate();

  const addParticipant = (newParticipant) => {
    fetch(`${API}/participant`, {
      method: "POST",
      body: JSON.stringify(newParticipant),
      headers: { "Content-type": "application/json" },
    }).then(() => navigate('/mytournaments'))
  };

  return (
    <div className="join">
      <Card className="participant-card">
      <h2>{data.name} Participant Form</h2>
      {tournamentId && (
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
          Join Tournament
        </Button>
      </form>
      )}
      </Card>
    </div>
  );
}
