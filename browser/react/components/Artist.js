import React, { Component } from 'react';
import Albums from './Albums';
import Songs from './Songs';
import { Link } from 'react-router';

            // <div>
            //     <h3>{selectedArtist.name}</h3>
            //     <Albums albums={this.props.albums} />
            //     <h4>Songs</h4>
            //     <Songs
            //       songs={this.props.currentSongList}
            //       currentSong={this.props.currentSong}
            //       isPlaying={this.props.isPlaying}
            //       toggleOne={this.props.toggle}
            //     />
            // </div>


export default class Artist extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const artistId = this.props.routeParams.artistId;
        const selectArtist = this.props.selectArtist;

        selectArtist(artistId);
    }

    render() {
        console.log('in Artist.js, this is this.props:', this.props);
        const artistId = this.props.routeParams.artistId;
        const selectedArtist = this.props.selectedArtist;
        const children = this.props.children;
        const propsToPassToChildren = {
          albums: this.props.albums,
          songs: this.props.currentSongList,
          currentSong: this.props.currentSong,
          isPlaying: this.props.isPlaying,
          toggleOne: this.props.toggleOne,
          toggle: this.props.toggle
        };

        const divToShow = (<div>
            <h3>{ selectedArtist.name }</h3>
              <ul className="nav nav-tabs">
              <li><Link to={`/artists/${artistId}/albums`}>ALBUMS</Link></li>
              <li><Link to={`/artists/${artistId}/songs`}>SONGS</Link></li>
            </ul>
            { children && React.cloneElement(children, propsToPassToChildren) }
            </div>)

        return (

           selectedArtist ? divToShow : "Not found!" 

        )
    }
}
