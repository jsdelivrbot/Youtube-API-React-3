import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetails from './components/video_details';

const API_KEY = 'AIzaSyBhfQLXadM4YEpDEE99u5od5lzYqygnIY0';

// Create a new component. This component should produce some html

class App extends Component {
constructor(props) {
  super(props);

  this.state = {
     videos: [], 
     selectedVideo: null
    };
    this.videoSearch('surfboards');
}

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, (videos) => {
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300);

    return (
      <div>
          <SearchBar onSearchTermChange = { term => this.videoSearch(term) }/>
          <VideoDetails video={this.state.selectedVideo} />
          <VideoList
            onVideoSelect = { selectedVideo => this.setState({ selectedVideo }) }
            videos={ this.state.videos} />
      </div>
    );
  }
}

// Take this component's generated HTML and put it on the page
ReactDOM.render(<App />, document.querySelector('.container'));

