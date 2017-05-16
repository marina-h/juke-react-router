import React, { Component } from 'react';

export default class Artist extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const artistId = this.props.routeParams.artistId;
        const selectArtist = this.props.selectArtist;

        selectArtist(artistId);

        console.log('artist id: ', artistId);
    }

    render() {

        console.log('in Artist.js, this is this.props:', this.props);

        return (
            <div>
                <h3>{this.props.selectedArtist.name}</h3>
                <h4>ALBUMS</h4>
                <h4>SONGS</h4>
            </div>

        )

    }

}