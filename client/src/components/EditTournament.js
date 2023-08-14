import { Button, Card, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import { API } from "../Global";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const tournamentValidationSchema = yup.object({
    name: yup.string().required().min(3)
        .test('is-uppercase', 'must be in uppercase', value => value === value.toUpperCase()),
    startdate: yup.date().required(),
    enddate: yup.date().required(),
    price: yup.number().required(),
})
export function EditTournament() {

    const { id } = useParams();

    const [data, setData] = useState(null);


    useEffect(() => {
        fetch(`${API}/tournamentlist/${id}`, {
            method: "GET",
        })
            .then((data) => data.json())
            .then((BD) => setData(BD));
    }, []);

    return <div className="edit-loading">
        {data ? <EditTournamentForm data={data} /> : "Loading"}
    </div>
}
function EditTournamentForm({ data }) {
    const { handleBlur, handleSubmit, values, handleChange, touched, errors } = useFormik({
        initialValues: {
            name: data.name,
            startdate: data.startdate,
            enddate: data.enddate,
            price: data.price,
        },
        validationSchema: tournamentValidationSchema,
        onSubmit: (newTournament) => {
            addTournament(newTournament);
        }
    });

    const navigate = useNavigate();

    const addTournament = (updateTournament) => {
        fetch(`${API}/tournamentlist/${data._id}`, {
            method: "PUT",
            body: JSON.stringify(updateTournament),
            headers: { "Content-type": "application/json" },
        }).then(() => navigate('/mytournaments'))
    };

    return (
        <div className="form">
            <Card className="tournamentpage">
                <h2 className="title">Create Tournament</h2>
                <form className="create-tournament" onSubmit={handleSubmit}>
                    <TextField
                        name="name"
                        label="Tournament Name"
                        variant="standard"
                        className="textfield"
                        onChange={handleChange}
                        value={values.name}
                        onBlur={handleBlur}
                    />
                    {touched.name && errors.name ? errors.name : null}
                    <TextField
                        name="startdate"
                        className="textfield"
                        label="Start Date (dd/mm/yyyy)"
                        variant="standard"
                        onChange={handleChange}
                        value={values.startdate}
                        onBlur={handleBlur}
                    />
                    {touched.startdate && errors.startdate ? errors.startdate : null}
                    <TextField
                        name="enddate"
                        variant="standard"
                        className="textfield"
                        label="End Date (dd/mm/yyyy)"
                        onChange={handleChange}
                        value={values.enddate}
                        onBlur={handleBlur}
                    />
                    {touched.enddate && errors.enddate ? errors.enddate : null}
                    <TextField
                        name="price"
                        variant="standard"
                        className="textfield"
                        label="Price"
                        onChange={handleChange}
                        value={values.price}
                        onBlur={handleBlur}
                    />
                    {touched.price && errors.price ? errors.price : null}
                    <Button
                        variant="contained"
                        className="textfield"
                        color="error"
                        type="submit"
                    >
                        Update Tournament
                    </Button>
                </form>
            </Card>
        </div>
    );
}
