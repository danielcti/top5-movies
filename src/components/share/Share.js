import React from 'react'
import './Share.css'

import {
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon
  } from 'react-share';

const Share = (props) => {

    function setPost(){
      let content = 'My top5 movies are: \n'
      props.movies.map((movie, index) => {
        content += 'Top' + (index+1).toString() + ': ' + movie.title + '\n'
      })
      content += '#top5-movies'
      window.window.scrollTo({
        top: 0,
        behavior: 'smooth',
      }) // go to top of page
      return content
    }

    const shareUrl = 'https://www.github.com/danielcti/top5-movies';
    return (
        <div className='share'>
          <FacebookShareButton
            url={shareUrl}
            quote={setPost()}
            className="Demo__some-network__share-button">
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>
          <div className="Demo__some-network">

          <TwitterShareButton
            url={shareUrl}
            title={setPost()}
            className="Demo__some-network__share-button">
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>
        </div>
        </div>
    )
}

export default Share;