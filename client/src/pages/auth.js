import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);           // KÄYTTÄJÄN ID  tallennetaan    localStorage:een talteen
      window.localStorage.setItem("userName", username);                   // KÄYTTÄJÄN ID  tallennetaan    localStorage:een talteen     

      navigate("/");                                                       // kun käyttäjä on lokannut sisään,  ohjataan hänet  /  root reitille,  eli "Koti"  sivulle.


    } catch (error) {
      console.error(error);
      alert("Käyttäjänimi tai salasana väärin!");                          //  käyttäjälle ilmoitus väärästä tunnuksesta tai salasanasta.
      return error.response;
    }
  };



  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Kirjaudu</h2>
        <div className="form-group">
          <label htmlFor="username">Käyttäjätunnus:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Salasana:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" >Kirjaudu</button>
      </form>
    </div>
  );
};
   //uuden käyttäjän rekisteröinti
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Rekisteröityminen valmis. Käytä Kirjautumista, jatkaaksesi.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Rekisteröidy</h2>
        <div className="form-group">
          <label htmlFor="username">Käyttäjätunnus:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Salasana:</label>
          <input
            type="password"
            id="password"
            value={password}                //password valuena piilottaa kenttään kirjoitettavan salasanan
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" >Rekisteröi</button>     
      </form>
    </div>
  );
};
