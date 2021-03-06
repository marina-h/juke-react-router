import React, { Component } from 'react';
import axios from 'axios';

import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

import { convertAlbum, convertAlbums, convertSong, convertSongs, skip } from '../utils';

export default class AppContainer extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.deselectAlbum = this.deselectAlbum.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
  }

  componentDidMount() {
    //axios request to get all albums
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(album => this.onLoad(convertAlbums(album)));

    //axios request to get artists
    axios.get('/api/artists/')
      .then(res => res.data)
      .then(artists => this.onLoadArtists(artists));

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  onLoad(albums) {
    this.setState({
      albums: albums
    });
  }

  onLoadArtists(artists) {
    this.setState({
      artists: artists
    });
  }

  play() {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load(currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
  }

  startSong(song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne(selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle() {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next() {
    this.startSong(...skip(1, this.state));
  }

  prev() {
    this.startSong(...skip(-1, this.state));
  }

  setProgress(progress) {
    this.setState({ progress: progress });
  }

  selectAlbum(albumId) {                //selectAlbum's 'this' is bound to the state of AppContainer, so it'll always be going off of that state
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: convertAlbum(album)
      }));
  }

  selectArtist(artistId) {
    //request to get the artist's name
    axios.get(`/api/artists/${artistId}`) //could have used Promise.all to do all 3 of these axios requests at once
      .then(res => res.data)
      .then(artist => this.setState({
        selectedArtist: artist
      }))
      .catch(noArtist => this.setState({
        selectedArtist: null
      }));
    //request to get the artist's albums
    axios.get(`/api/artists/${artistId}/albums`)
      .then(res => res.data)
      .then(albums => this.setState({
        albums: convertAlbums(albums)
      }));
    //request to get the artist's songs
    axios.get(`/api/artists/${artistId}/songs`)
      .then(res => res.data)
      .then(songs => this.setState({
        currentSongList: convertSongs(songs)
      }));

  }

  deselectAlbum() {
    this.setState({ selectedAlbum: {} });
  }

  render() {
    console.log('this.props.children', this.props.children)
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar deselectAlbum={this.deselectAlbum} />
        </div>

        {/*Picture Frame*/}
        <div className="col-xs-10">
          {
            this.props.children ? //if there are any (direct) children of this (AppContainer), put all of AppContainer's props into it
              React.cloneElement(this.props.children, //could also do: (this.props.children && React.cloneElement(this.props.children, Object.assign({}, this.state, {toggle: this.toggleOne}));
                {
                  currentSong: this.state.currentSong,
                  currentSongList: this.state.currentSongList,
                  isPlaying: this.state.isPlaying,
                  toggleOne: this.toggleOne,
                  toggle: this.toggle,

                  artists: this.state.artists,
                  selectedArtist: this.state.selectedArtist,
                  selectArtist: this.selectArtist,

                  albums: this.state.albums,
                  album: this.state.selectedAlbum,
                  selectAlbum: this.selectAlbum
                })
              : null
          }
        </div>

        {/*<div className="col-xs-10">
        {
          this.state.selectedAlbum.id ?
          <Album
            album={this.state.selectedAlbum}
            currentSong={this.state.currentSong}
            isPlaying={this.state.isPlaying}
            toggleOne={this.toggleOne}
          /> :
          <Albums
            albums={this.state.albums}
            selectAlbum={this.selectAlbum}
          />
        }
        </div>*/}

        <Player
          currentSong={this.state.currentSong}
          currentSongList={this.state.currentSongList}
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}
