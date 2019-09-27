import React from 'react';
import { Select } from '@vkontakte/vkui';

export default class SongSelector extends React.Component {
  render() {
    return (
      <Select placeholder="Select a song" value={this.props.songs.indexOf(this.props.selectedSong)} onChange={this.handleSongChange.bind(this)}>
          {this.renderSongOptions()}
      </Select>
    );
  }

  renderSongOptions() {
    return this.props.songs.map((song, index) => {
      return (
        <option key={index} value={index}>
          {song.title}
        </option>
      );
    });
  }

  handleSongChange(ev) {
    this.props.onSongSelected(this.props.songs[ev.target.value]);
  }
}
