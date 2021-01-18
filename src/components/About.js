import React from "react"
import { Link, useRouteMatch, Route } from "react-router-dom"
import AboutPage from "../pages/AboutPage"

const About = () => {
  const {url, path} = useRouteMatch()
  const style={
    info:{
      position:"fixed",
      width:"100%",
      top:"20%"
    }
  }
  return (
    <div className="row" style={style.info}>
      <div className="col s1 m2 l3"></div>
      <div className="col s10 m8 l6">
        <div className="card">
          <div className="row card-content">
            <div className="col s6 center">
              <Link to={`${url}/about-app`}>About App</Link>
            </div>
            <div className="col s6 center">
              <Link to={`${url}/about-author`}>About Author</Link>
            </div>
          </div>
          <div className="row card-content center">
            <Route path={`${path}/:slug`}>
              <AboutPage />
            </Route>
          </div>
        </div>
      </div>
    </div>
    
  )
}
export default About