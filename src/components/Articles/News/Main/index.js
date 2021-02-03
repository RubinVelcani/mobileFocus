import React from 'react';

import NewsSlider from '../../../widgets/NewsSlider/slider';
import NewsList from '../../../widgets/NewsList/newsList';

const NewsMain = () => (
    <div>
        <NewsSlider
            type="featured"
            settings={{dots:false}}
            start={0}
            ammount={3}
        />
        <NewsList
            type="cardMain"
            loadMore={true}
            start={3}
            ammount={3}
        />
    </div>
)



export default NewsMain;