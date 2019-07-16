import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

class APODPage extends React.Component {
    render() {
        const { title, date, explanation, media_type, url }  = this.props.apod
        return (
            <div className="APOD">
                <h1>Title: { title } </h1>
                <h1>Date: { date } </h1>
                <p>Description: { explanation }</p>
                { { media_type } == "video" ?
                        <p><iframe width="560" height="315" 
                        src={ url } 
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe></p>       
                        :
                    <img src={ url } alt="Nasa Astronomy Picture of the Day" />
                }
            </div>
        )

    }
}

export default APODPage; 