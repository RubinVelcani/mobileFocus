import React from 'react';

import style from '../videosList.module.css';
import VideosListTemplate from '../videosListTemplate';


const videosRelated = (props) => (
    <div className={style.related_wrapper}>
        <VideosListTemplate
            data={props.data}
            teams={props.teams}
        />
    </div>

)

export default videosRelated;