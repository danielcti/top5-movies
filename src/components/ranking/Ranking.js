import React, {Component} from 'react'
import Card from '../card/Card'
import Share from '../share/Share'

var share = require('social-share');

class Ranking extends Component{
    constructor(props){
        super(props)
        this.state = {
            movies: []
        }
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleShare = this.handleShare.bind(this)
    }

    handleShare(){
        let content = ''
        this.state.movies.map((movie, i) => {
            content += `Top ${i+1}: ${movie.title} \n`
        })

        var Turl = share('twitter', {
            title: content
        });
        var Furl = share('facebook', {
            title: content
        });
        console.log(Turl, Furl)        

    }

    handleUpdate(movie, push){
        if(push){
            this.setState({
                movies: [...this.state.movies, movie[0]]
            })    
        }else{
            const newMoviesArray = this.state.movies.filter((m) => {
                if(movie[0] === m){
                    return false
                }else{
                    return true
                }
            })
            this.setState({movies:newMoviesArray})
        }
        console.log(this.state.movies)
    }

    render(){
        return (
            <div>
                {this.state.movies.length === 5 ?<Share handleShare={this.handleShare} movies={this.state.movies}/>: ''}
                <Card handleUpdate={this.handleUpdate} index={1}/>
                {
                    this.state.movies.map((movie, i) => {
                        if(i<4){ // nao renderiza se ja tem 5
                            return(
                                <Card handleUpdate={this.handleUpdate} index={i+2}/> // pois contaremos a partir do 2                            
                            )
                        }
                    })
                }
            </div>
        )
    }
}

export default Ranking