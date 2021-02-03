import React, {Component} from 'react';
import {firebase, firebaseDb, firebaseLooper, firebaseTeams} from '../../../../Firebase';
import style from '../../articles.module.css';
import Header from './header';

class NewsArticles extends Component {

    state = {
        article: [],
        team: [],
        imageURL: ''
    }

    componentDidMount(){

        firebaseDb.ref(`articles/${this.props.match.params.id}`).once('value')
        .then((snapshot) => {
            let article = snapshot.val();

            firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
            .then((snapshot) => {
                const team = firebaseLooper(snapshot);
                this.setState({
                    article,
                    team
                })
                this.getImageURL(article.image)
            })
        })

        // axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
        // .then(response => {
        //     let article = response.data[0];

        //     axios.get(`${URL}/teams/?id=${article.team}`)
        //     .then(response => {
        //         this.setState({
        //             article,
        //             team: response.data
        //         })
        //     })
        // })
    }

    getImageURL = (fileName) => {
        firebase.storage().ref('images')
        .child(fileName).getDownloadURL()
        .then(url => {
            this.setState({
                imageURL: url
            })
        })
    }

    render(){
        const article = this.state.article;
        const team = this.state.team;

        return(
            <div className={style.article_wrapper}>
                <Header 
                    teamData={team[0]}
                    date={article.date}
                    author={article.author}
                />
                <div className={style.articleBody}>
                    <h1>{article.title}</h1>
                    <div className={style.articleImage}
                        style={{
                            background: `url('${this.state.imageURL}')`
                        }}
                    >
                    </div>
                    <div className={style.articleText}
                        dangerouslySetInnerHTML={{
                            __html: article.body
                        }}
                    >
                    </div>
                </div>
            </div>
        )
    }
}


export default NewsArticles;