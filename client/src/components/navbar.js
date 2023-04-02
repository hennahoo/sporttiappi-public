//navigaation rakentaminen
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
                                                                //<Link to="/"> Koti</Link>       luodaan linkit alisivuille
export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);   // React hook,  napataan tieto Cookies tiedostosta,  kirjautumis token tunnus
  const navigate = useNavigate();

  const logout = () => {                                        //uloskirjautuminen , ohjautuu sivulle auth kun painetaan "kirjaudu ulos"
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <div className="navbar">
    {!cookies.access_token ? (
        <Link to="/auth">| Koti |</Link>                           // jos käyttäjä ei ole vielä sisällä, ei päästetä etenemään 
    ) : (
        <Link to="/">| Koti |</Link>                               // jos ok, päästettän reitille /       eli  koti,    home
    )}

    {!cookies.access_token ? (
        <Link to="/auth">| Lisää suoritus |</Link>            // jos käyttäjä ei ole vielä sisällä, ei päästetä etenemään 
    ) : (
        <Link to="/create-tag">| Lisää suoritus |</Link>      // jos ok, päästettän reitille /create-tag
    )}


    {!cookies.access_token ? (
        <Link to="/auth">| Kirjaudu/Rekisteröidy  |  </Link>
    ) : (
       <button onClick={logout}>  Kirjaudu ulos  </button>
      )}
    </div>
  );
};

