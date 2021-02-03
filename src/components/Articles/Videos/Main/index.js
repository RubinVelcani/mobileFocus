import React from 'react';

import VideosList from '../../../widgets/VideosList/videosList';

const VideosMain = () => (
    <VideosList
        type="card"
        title={false}
        loadMore={true}
        start={0}
        ammount={10}
    />
)

export default VideosMain; 