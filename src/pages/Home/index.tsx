import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./styles.scss";
import News from "../../components/News";

const Home = () => {
  const { isAuthenticated, user } = useAuth0<{
    name: string;
  }>();



  return (
    <section className="home">
      <div className="top-section">
        <h1>
          Hello
          {isAuthenticated ? (
            <span>
              <br /> {user?.name}!
            </span>
          ) : (
            "!"
          )}
        </h1>
        <h2>
          {isAuthenticated ? 'Please click Advanced Filters to save your search filter preference and advanced filter functionalities!' : 'Please click Advanced Filters for advanced filter functionalities! Login your Auth0 account to preserve your changes!'}
          
        </h2>
      </div>
      <div className="news-section">
        <News/>
      </div>
    </section>
  );
}

export default Home;
