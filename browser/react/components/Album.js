import React, { Component } from 'react';
import Songs from '../components/Songs';

export default class Album extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() { //we have to make Album an actual class, b/c we need to use routeParams (:id) to query the database after it mounts
    const albumId = this.props.routeParams.albumId; //could also say just "this.props.params.albumId". routeParams are from the URL; but params object has other params, too, is more general
    const selectAlbum = this.props.selectAlbum;

    selectAlbum(albumId);
  }

  render() {
    //could also say: const {album, currentSong, isPlaying, toggleOne} = this.props;
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
