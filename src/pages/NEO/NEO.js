import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

const d = new Date().toISOString().split('T')[0];

class NEOPage extends React.Component {  
      
    render() {
        const NEOPreload =  this.props.neo.near_earth_objects
        const NEOList = (props) => {
          return (
              <Fragment>
                {props.items[d].map(item => (
                  // , idx
                  <Fragment key={item.id}>
                      <div className="NEO">
                          <h1>Asteroid ID: { item.id } </h1>
                          <h2>Name: { item.name } </h2>
                          <p>Hazardous Asteroid:  
                              {`{ item.is_potentially_hazardous_asteroid }` === true ? " Yes." : " No."  }</p>
                          <h2>This asteroid orbits { item.close_approach_data[0].orbiting_body } </h2>
                          <p><Link className="navLeft" to={ item.nasa_jpl_url }>NASA url</Link></p>
                      </div>
                  </Fragment>
              ))}
              </Fragment>
          )
          }

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