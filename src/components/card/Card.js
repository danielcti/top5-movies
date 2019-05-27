import React, {Component} from 'react'
import './card.css'
const imdb = require('imdb-api')
const imdbKey = require('../../content/credentials.json').imdbKey

class Card extends Component{
    constructor(props){
        super()
        this.state = {
            openInputForm: false,
            input: '',
            searchMovies : [],
            searchWorked: false,
            movieChosen: {},
            isMovieChosen: false
        }
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleButtonClick(){
        if(this.state.isMovieChosen){ // caso ele aperte no x
            this.restartData()
            this.props.handleUpdate(this.state.movieChosen, false)
        }
        console.log('??')
        const actualBoolValue = this.state.openInputForm
        this.setState({openInputForm: !actualBoolValue})
    }

    restartData(){
        this.setState({
            openInputForm: false,
            input: '',
            searchMovies : [],
            searchWorked: false,
            movieChosen: {},
            isMovieChosen: false})
    }

    handleCheck(e){
        const id = e.target.id
        const movie = this.state.searchMovies.filter((movie) => {
            if(id === movie.imdbid)
                return movie
        })
        this.setState({movieChosen:movie, isMovieChosen: true, openInputForm: false, searchWorked: false})
        this.props.handleUpdate(movie,true)
    }

    async handleInputChange(e){
        await this.setState({input:e.target.value})
        const name = this.state.input
        await imdb.search({
            name: name
          }, {
            apiKey: imdbKey
          }).then(async (res) => {
            const movies = res.results
            await this.setState({searchMovies: movies})
            await this.setState({searchWorked:true})
          })
          .catch(() => {
              this.setState({searchWorked: false})
          });
    }

    render (){
        return (
            <div className='container'>
            <div className="card">
                <h3 className='rank-number'>{this.props.index}</h3>
                {this.state.isMovieChosen && 
                <img src={this.state.movieChosen[0].poster} className="card-img-top poster" alt="poster" />
                }
                <div className="card-body">
                    {this.state.isMovieChosen &&
                    <p className="card-text movie-name">
                    {this.state.movieChosen[0].name}
                    ({this.state.movieChosen[0].year})
                    </p>
                    }
                </div>
                <button type="button" className="btn btn-danger add" onClick={this.handleButtonClick}>
                {this.state.isMovieChosen ? 'x' : '+'}
                </button>
                
                {this.state.openInputForm &&
                <input type='text' placeholder="write movie's name" className='input'
                onChange={this.handleInputChange} value={this.state.input}/>
                }
                { this.state.searchWorked && this.state.openInputForm &&
                    <ul className="list-group">
                        {this.state.searchMovies.map((movie) => {
                            return (
                                <>
                                {<li id={movie.imdbid} className="list-group-item" onClick={this.handleCheck.bind(this)}>
                                {movie.name}
                                </li>}
                                </>
                            )
                        })}
                    </ul>                   
                }
            </div>
        </div>            
        )
    }
    
}

export default Card