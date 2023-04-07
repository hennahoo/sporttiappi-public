import axios from "axios";                               //   axios,  REST ja json käsittelyyn,  eli jotta voidaan get, post..  tietoa  selaimella -> serverille.
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";     //   importataan,      react hook         useGetUserID
                                                          //  tehdaan tahan                         useGetUserName
import { useGetUserName } from "../hooks/useGetUserName"; //   auth.js:ssä    näiden tiedot tallentuvat  "selaimen local storageen talteen"

                                                          //   jotta voidaan piirtää  graafisia esityksia,  importataan  chart mukaan
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';



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






  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [500, -300, 100, 700, -200, 900, 0],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [-400, 200, -600, 800, -100, 300, -900],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  





  //                  TÄSSÄ ON  KOTI  sivun   html...       tämä on nyt sitä reactia;  https://youtu.be/SqcY0GlETPk   tämän kun katsoo,  pääsee hyvin kärryille!
  //                                                        tyylit löytyy;  / client / App.css
  //
  //                                    { muuuttuja }   dynaamista muuttuvaa tietoa, voi kirjoittaa näin, web-sivulle.  aaltosulkujen sisälle, muuttujan nimi. 

  function getMessage() {


    if (kirjautuminen === "ON") {                //    JOS KÄYTTÄJÄ ON KIRJAUTUNEENA,  NÄYTETÄÄN TIETOA,   MUUTEN VAIN NAVIGOINTI BAR.   
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
                        
                        
                        { /*  https://codesandbox.io/s/reactchartjs-react-chartjs-2-default-1695r?file=/App.tsx   
                               pitaa asentaa  nailla komennoilla   chart  kirjastot  node js  ymparistoon
                              npm install react-chartjs-2 chart.js                            
                        */  }
                        <>  
                           <Line options={options} data={data} />
                        </>
                        
              </div>
          </div>     
        </div>
      );
    };


    if (kirjautuminen === "EI OLE") {                //    JOS KÄYTTÄJÄ ON KIRJAUTUNEENA,  NÄYTETÄÄN TIETOA,   MUUTEN VAIN NAVIGOINTI BAR.   
      return (
                <div>
                <h1>  Et ole kirjautunut sisään!                   </h1>
                <h2>   - paina kirjaudu/rekisteröidy jatkaaksesi...   </h2>
                 
                                
                                    <img className="img-fluid" 
                        src={`${process.env.PUBLIC_URL}/assets/katti_painoilla.jpg`} 
                        alt="logo"/>
                
                </div>

      );
}
}




//////////////////////////////////////////////////////////////////////////////////////////
// Tämä palauttaa sivun home.   mutta koska ei voi tehdä if-lauseita returnin sisään, kutsutaan fnktiota
//////////////////////////////////////////////////////////////////////////////////////////
return (
    <>                              {/* talla tehdaan uusi elementti sivulle*/}
    {getMessage()}                  {/* javascriptia, kutsutaan fnktiota jotta voidaan tehda if-lause*/}    
    </>
);


};

