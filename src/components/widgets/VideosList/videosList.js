import React, {Component} from 'react';
import Button from '../Buttons/buttons';
import {firebaseTeams, firebaseVideos, firebaseLooper} from '../../../Firebase';

import style from './videosList.module.css';
import VideosListTemplate from './videosListTemplate';

class VideosList extends Component{

    state = {
        teams: [],
        videos: [],
        start: this.props.start,
        end: this.props.start + this.props.ammount,
        ammount: this.props.ammount
    }

    renderTitle = () => {
        return this.props.title ?
            <h3><strong>NBA </strong>Videos</h3> 
        : null
    }

    componentDidMount(){
        this.request(this.state.start, this.state.end)
    }

    request = (start, end) => {
        if(this.state.teams.length < 1){
            firebaseTeams.once('value')
            .then((snapshot) => {
                const teams = firebaseLooper(snapshot);
                this.setState({
                    teams
                })
            })
        }

        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
        .then((snapshot) => {
            const videos = firebaseLooper(snapshot);
            this.setState({
                videos:[...this.state.videos, ...videos],
                 start,
                 end
            })
        })
        .catch(e => {
            console.log(e);
        })
    }

    renderVideos = () => {
        let template = null;

        switch(this.props.type){
            case('card'):
                template = <VideosListTemplate data={this.state.videos} teams={this.state.teams}/>
                break;
            default:
                template= null;
        }
        return template;
    }

    loadMore = () => {
        let end = this.state.end + this.state.ammount;
        this.request(this.state.end + 1, end)
        
    }

    renderButton = () => {
        return this.props.loadMore 
        ? <Button
            type="loadMore"
            loadMore={()=> this.loadMore()}
            cta="Load More Videos"
        />
        : <Button type="linkTo" cta="More videos" linkTo="/videos"/>
    }

    render(){
        return(
            <div className={style.videoList_wrapper}>
                {this.renderTitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        )
    }

}


export default VideosList;