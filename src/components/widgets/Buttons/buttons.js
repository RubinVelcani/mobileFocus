import React from 'react-router-dom';
import {Link} from 'react-router-dom';

import style from './buttons.module.css';

const Buttons = (props) => {
    let template = null;

    switch(props.type){
        case('loadMore'):
            template = (
                <div className={style.blueButton}
                    onClick={props.loadMore}
                >
                        {props.cta}
                </div>
            );
            break;
        case('linkTo'):
            template = (
                <Link to={props.linkTo}
                    className={style.blueButton}>
                        {props.cta}
                    </Link>
            );
            break;
        default:
            template = null;

    }
    return template;
    
}

export default Buttons;