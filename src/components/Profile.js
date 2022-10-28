import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import notecontext from "../context/notes/notecontext";
import Navbar from "./Navbar";

export const Profile = (props) => {
    const nav = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'));
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/api/auth/getuserdata`, {
            method: 'POST',
            headers: {
                "content": "application/json",
                'Accept': 'application/json',
                "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMDUwMjc5ZjFlNjQ0YjRkNGMyOTJkIn0sImlhdCI6MTY1NTcyMjAyM30.2NfA1EFeeUSiI1z_IAvUx9bfwSUsMqxPEGc8JFfg3gQ"
            },
        })
            .then((res) => res.json())
            .then((res) => console.log(res))
    }, [])

    useEffect(() => {
        if (!token) {
            nav("/")
        }
    })
    const a = useContext(notecontext);
    let { md, swst, func, tgst } = props;

    return (
        <div>
            {token && <Navbar md={props.md} swst={props.swst} func={props.func} />}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2rem'
                }}>
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center'
                    }}>
                    <span><b>Email: </b></span>{user.email}
                </div>
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center'
                    }}>
                    <span><b>Name: </b></span>{user.name}
                </div>
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center'
                    }}>
                    <span><b>Date: </b></span>{user.date}
                </div>
            </div>
        </div>
    )
}