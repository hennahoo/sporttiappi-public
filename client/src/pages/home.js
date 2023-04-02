import axios from "axios";                               //   axios,  REST ja json käsittelyyn,  eli jotta voidaan get, post..  tietoa  selaimella -> serverille.
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";     //   importataan,      react hook         useGetUserID
                                                          //  tehdaan tahan                         useGetUserName
import { useGetUserName } from "../hooks/useGetUserName"; //   auth.js:ssä    näiden tiedot tallentuvat  "selaimen local storageen talteen"


export const Home = () => {

  const [tags, settags] = useState([]);
  const [savedtags, setSavedtags] = useState([]);

  console.log("Yritetaan saada,  kayttajan ID ja kayttajan username:")

  const userID = useGetUserID();                      //   tässä,  otetaan se hook useGetUserID  käyttöön,   ->  tieto  userID nimiseen muuttujaan talteen.
                                                      //     vastaava  tähän,      useGetUserName            ->  tieto  userName  nimiseen muuttujaan talteen.
  const userName = useGetUserName();                  //   yritetään  react  hook  avulla,  saada   kirjautuneen käyttäjän  nimi,  talteen muuttujaan
  console.log(userID);
  console.log(userName);
  let kirjautuminen = " ";                            // uusi muuttuja,     kirjautumistieto,     onko meillä validi käyttäjä vai ei ole?

  if (userID == null){
     console.log("Ei saatu käyttäjänimeä, ei olla kirjautuneena sisään käyttäjänä.");
     kirjautuminen = "EI OLE";
     console.log(kirjautuminen);
  }

  if (userID != null){
    console.log("Saatiin käyttäjänimi, ollaan kirjautuneena sisään käyttäjänä.");
    kirjautuminen = "ON";
    console.log(kirjautuminen);
  }


  useEffect(() => {
    const fetchtags = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tags");
        settags(response.data);
      } catch (err) {
        console.log(err);
      }
    };
   
    fetchtags();
  
  }, []);


  //                  TÄSSÄ ON  KOTI  sivun   html...       tämä on nyt sitä reactia;  https://youtu.be/SqcY0GlETPk   tämän kun katsoo,  pääsee hyvin kärryille!
  //                                                        tyylit löytyy;  / client / App.css
  //
  //                                    { muuuttuja }   dynaamista muuttuvaa tietoa, voi kirjoittaa näin, web-sivulle.  aaltosulkujen sisälle, muuttujan nimi. 


if (kirjautuminen == "ON"){                //    JOS KÄYTTÄJÄ ON KIRJAUTUNEENA,  NÄYTETÄÄN TIETOA,   MUUTEN VAIN NAVIGOINTI BAR.

  return (
 
    <div className="kotisivu">
     <div class="row">

          <div class="column">
            <h1> Käyttäjän {userName} suoritukset </h1>                                                                                         
            <ul > 

                                                                  { /* TULOSTETAAN TIETOA SUORITUKSISTA,  tiedot tietokannasta */  }
              {     
                 tags.map((tag) => (                            

                <li key={tag._id}>
                  <div>
                    <h2>{tag.name}</h2>                                        { /* Suorituksen NIMI */  }
                  </div>

                  <p>Kuvaus: {tag.description} </p>                            { /* Kuvausteksti     */  }

                  <p>Suorituksen aika: {tag.sportTime} minuuttia</p>           { /* aika             */  }
                  <p>Kilometrejä:      {tag.sportDistance} km</p>              { /* etaisyys         */  }

                </li>

              ))
              }

            </ul>
          </div>

          <div class="column">
             <h1> Tähän tulee joskus diagrammi             </h1> 
             <h3> - tietoa suorituksista graafisesti       </h3>

                { /*     https://stackoverflow.com/questions/39999367/how-do-i-reference-a-local-image-in-react     */  }
                <img className="img-fluid" 
                    src={`${process.env.PUBLIC_URL}/assets/kissa.jpg`} 
                    alt="logo"/>
          </div>

      </div>     
    </div>

  );
};

}

