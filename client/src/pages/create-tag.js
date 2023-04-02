import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Createtag = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [tag, settag] = useState({
    name: "",
    description: "",
    sportTime: 0,
    sportDistance: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    settag({ ...tag, [name]: value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/tags",
        { ...tag },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("tag Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-tag">
      <h2>Lisää uusi suoritus</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Suorituksen nimi</label>
        <input
          type="text"
          id="name"
          name="name"
          value={tag.name}
          onChange={handleChange}
        />

        <label htmlFor="description">Suorituksen kuvaus</label>
        <textarea
          id="description"
          name="description"
          value={tag.description}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="sportTime">Suorituksen aika (minuuttia)</label>
        <input
          type="number"
          id="sportTime"
          name="sportTime"
          value={tag.sportTime}
          onChange={handleChange}
        />

        <label htmlFor="sportTime">Suorituksen mitta (kilometriä)</label>
        <input
          type="number"
          id="sportDistance"
          name="sportDistance"
          value={tag.sportDistance}
          onChange={handleChange}
        />

        <button type="submit">Tallenna Suoritus</button>
      </form>
    </div>
  );
};
