import React from 'react';
import moment from 'moment';

import style from '../../Articles/articles.module.css';

const formatDate = (date) => {
    return moment(date).format(' DD-MM-YYYY');
}

const postData = (props) => (

    <div className={style.articlePostData}>
        <div>
            Date: 
            <span>{formatDate(props.data.date)}</span>
        </div>
        <div>
            Author:
            <span>{props.data.author}</span>
        </div>
    </div>
)

export default postData;