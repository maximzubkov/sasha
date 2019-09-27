import React from 'react';
import Sound from 'react-sound';
import getMP3Duration from 'get-mp3-duration';
import PlayerControls from './PlayerControls';
import SongSelector from './SongSelector';
import songs from '../audio/songs';
import PropTypes from 'prop-types';
import {Panel, PanelHeader, HeaderButton, Group, Button, Progress, InfoRow, Checkbox, FormLayout, Slider, Div, platform, IOS} from '@vkontakte/vkui';
import persik from '../img/persik.png';
import { ReactMic } from '@cleandersonlobo/react-mic';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSong: songs[0],
      position: 0,
      volume: 100,
      playbackRate: 1,
      loop: false,
      playStatus: Sound.status.PLAYING,
    };
  }

  getStatusText() {
    switch (this.state.playStatus) {
      case Sound.status.PLAYING:
        return 'playing';
      case Sound.status.PAUSED:
        return 'paused';
      case Sound.status.STOPPED:
        return 'stopped';
      default:
        return '(unknown)';
    }
  }

  handleSongSelected = (song) => {
    this.setState({ currentSong: song, position: 0});
  }

  renderCurrentSong() {
    return (
      <p>
        Current song {this.state.currentSong.title}. Song is {this.getStatusText()}
      </p>
    );
  }

  render() {
    const { volume, playbackRate, loop } = this.state;

    return (
        <Group title="Player">
          <Div>
            <SongSelector
              songs={songs}
              selectedSong={this.state.currentSong}
              onSongSelected={this.handleSongSelected}
            />
            <Div>
              <InfoRow title={this.state.currentSong.title}>
                <Progress value={this.state.position/this.state.currentSong.duration * 100} />
              </InfoRow>
            </Div>
            <FormLayout>
              <Slider
                min={0}
                max={100}
                value={Number(this.state.volume)}
                onChange={value => this.setState({volume: value})}
                top="Volume"
              />
            </FormLayout>
            <FormLayout>
              <Slider
                min={0}
                max={5}
                value={Number(this.state.playbackRate)}
                onChange={value => this.setState({playbackRate: value})}
                top="Playback Rate"
              />
            </FormLayout>
            <PlayerControls
              playStatus={this.state.playStatus}
              loop={loop}
              onPlay={() => this.setState({ playStatus: Sound.status.PLAYING })}
              onPause={() => this.setState({ playStatus: Sound.status.PAUSED })}
              onResume={() => this.setState({ playStatus: Sound.status.PLAYING })}
              onStop={() => this.setState({ playStatus: Sound.status.STOPPED, position: 0 })}
              onSeek={position => this.setState({ position })}
              onToggleLoop={e => this.setState({ loop: e.target.checked })}
              duration={this.state.currentSong ? this.state.currentSong.duration : 0}
              position={this.state.position}
              playbackRate={playbackRate}
            />
            {this.state.currentSong &&
              <Sound
                url={this.state.currentSong.url}
                playStatus={this.state.playStatus}
                position={this.state.position}
                volume={volume}
                playbackRate={playbackRate}
                loop={loop}
                onLoading={({ bytesLoaded, bytesTotal }) => console.log(`${bytesLoaded / bytesTotal * 100}% loaded`)}
                onLoad={() => console.log('Loaded')}
                onPlaying={({ position }) => this.setState({ position })}
                onFinishedPlaying={() => this.setState({ playStatus: Sound.status.STOPPED })}
              />
            }
          </Div>
        </Group>
    );
  }
}


Player.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Player;
