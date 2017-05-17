import React, { Component } from 'react';
import Songs from '../components/Songs';

export default class Album extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const albumId = this.props.routeParams.albumId;
    const selectAlbum = this.props.selectAlbum;

    selectAlbum(albumId);
  }

  render() {
    console.log('this.props for email line: ', this.props.location.pathname)
    const album = this.props.album;
    const currentSong = this.props.currentSong;
    const isPlaying = this.props.isPlaying;
    const toggleOne = this.props.toggleOne;
    const urlForEmailLink = `mailto:someone@example.com?Subject=${album.name}&body=Check this album out!${window.location.href}`
    return (
      <div className="album">
        <div>
          <h3>{ album.name } <a className="btn btn-default" href={urlForEmailLink}><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span></a></h3>
          <img src={ album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs
          songs={album.songs}
          currentSong={currentSong}
          isPlaying={isPlaying}
          toggleOne={toggleOne} />
      </div>
    )
  }
}
