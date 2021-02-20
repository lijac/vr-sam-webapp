import React, { useState, useEffect } from "react";
import { Grid, Row, Column } from "carbon-components-react";
import axios from "axios";
import ToDo from "./ToDo";

import "./App.scss";
import logo from "./aws.png";

import config from "./config";

function App() {
    const [toDos, setToDos] = useState([]);

    useEffect(() => {
        getAllTodos();
    });

    axios.interceptors.response.use(
        (response) => {
            console.log("Response was received");
            return response;
        },
        (error) => {
            window.location.href = config.redirect_url;
            return Promise.reject(error);
        }
    );

    const clearCredentials = () => {
        window.location.href = config.redirect_url;
    };

    const getAllTodos = async () => {
        const result = await axios({
            url: `${config.api_base_url}/item/`,
            headers: {
                Authorization: "idToken",
            },
        }).catch((error) => {
            console.log(error);
        });

        console.log(result);

        if (result && result.status === 401) {
            clearCredentials();
        } else if (result && result.status === 200) {
            console.log(result.data.Items);
            setToDos(result.data.Items);
        }
    };

    const addToDo = async (event) => {
        const newToDoInput = document.getElementById("newToDo");
        const item = newToDoInput.value;
        console.log(item);
        if (!item || item === "") return;

        const newToDo = {
            item: item,
            completed: false,
        };

        const result = await axios({
            method: "POST",
            url: `${config.api_base_url}/item/`,
            headers: {
                Authorization: "idToken",
            },
            data: newToDo,
        });

        if (result && result.status === 401) {
            clearCredentials();
        } else if (result && result.status === 200) {
            getAllTodos();
            newToDoInput.value = "";
        }
    };

    return (
        <div className="App">
            <Grid className="jumbotron">
                <Row>
                    <Column md={4} className="logo">
                        <h1>Serverless App</h1>
                        <p>This is a demo that showcases AWS serverless.</p>
                        <p>
                            The application is built using the SAM CLI
                            toolchain, and uses AWS Lambda, Amazon DynamoDB, and
                            Amazon API Gateway for API services and Amazon
                            Cognito for identity.
                        </p>

                        <img src={logo} alt="Logo" />
                    </Column>
                    <Column md={4}>
                        <ToDo toDos={toDos} addToDo={addToDo} />
                    </Column>
                </Row>
            </Grid>
        </div>
    );
}

export default App;
