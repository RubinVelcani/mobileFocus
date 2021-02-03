import React from 'react';

import NewsSlider from '../widgets/NewsSlider/slider';
import NewsList from '../widgets/NewsList/newsList';
import VideosList from '../widgets/VideosList/videosList';
import style from './home.module.css';

const Home = () => {
    return(
        <div>
            <NewsSlider
                type="featured"
                start={0}
                ammount={3}
                settings={{
                    dots: false
                }}
                />
             <NewsList
                type="card"
                loadMore={true}
                start={3}
                ammount={3}
                />
            <VideosList
                type="card"
                title={true}
                loadMore={true}
                start={0}
                ammount={3}
            />
        </div>
    )
}

export default Home;