import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

const d = new Date().toISOString().split('T')[0];

class NEOPage extends React.Component {    
    render() {
        console.log(this.props.neo)
        console.log(this.props.neo.near_earth_objects)
        console.log(d)
        console.log('made it')

       
        const NEOPreload =  this.props.neo.near_earth_objects
        console.log(NEOPreload) 
        const NEOList = (props) => {
          return (
              <Fragment>
                {props.items.d.map(item => (
                  // , idx
                  <Fragment key={item.id}>
                      <div className="NEO">
                          <h1>Asteroid ID: { item.Componentid } </h1>
                          <h2>Name: { item.name } </h2>
                          {/* <p>Hazardous Asteroid: { 
                              { item.is_potentially_hazardous_asteroid } ? "Yes" : "No" } </p> */}
                          <h2>This asteroid orbits { item.orbiting_body } </h2>
                          <p><Link className="navLeft" to={ item.nasa_jpl_url }>NASA url</Link></p>
                      </div>
                  </Fragment>
              ))}
              </Fragment>
          )
          }
        // const { id, name, nasa_jpl_url, is_potentially_hazardous_asteroid, orbiting_body }  = this.props.neo.near_earth_objects
        return ( 
            
            <div>
                { this.props.neo ?
                    <NEOList items={ NEOPreload }/> :
                    <h1>Loading...</h1>
                }
            </div>
        )

    }
}

export default NEOPage; 