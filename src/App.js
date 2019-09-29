// import 'core-js/es6/map';
// import 'core-js/es6/set';
import React from 'react';
import connect from '@vkontakte/vkui-connect';
import '@vkontakte/vkui/dist/vkui.css';
import { ModalRoot, Slider, Progress, HeaderButton, FixedLayout, InfoRow, ModalPage, View, ModalPageHeader, Button, FormLayout, Group, Div,  platform, IOS} from '@vkontakte/vkui';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import songs from './audio/songs';
import Sound from 'react-sound';
import Exhibit from './panels/Exhibit';
import Events from './panels/Events';
import PlayerControls from './panels/music_control/PlayerControls';
import SongSelector from './panels/music_control/SongSelector';
import Home from './panels/Home';
import Map from './panels/Map';

const MODAL_PAGE_MUSIC = 'music';

const osname = platform();
const IS_PLATFORM_ANDROID = osname !== IOS;
const IS_PLATFORM_IOS = osname !== IOS;

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			activeModal: null,
			modalHistory: [],
			currentSong: songs[0],
			position: 0,
			volume: 100,
			playbackRate: 1,
			loop: false,
			playStatus: Sound.status.PAUSED,
		};

		this.modalBack = (e) => {
			this.setActiveModal(this.state.modalHistory[this.state.modalHistory.length - 2]);
		};
	}

	setActiveModal(activeModal) {
		activeModal = activeModal || null;
		let modalHistory = this.state.modalHistory ? [...this.state.modalHistory] : [];

		if (activeModal === null) {
			modalHistory = [];
		} else if (modalHistory.indexOf(activeModal) !== -1) {
			modalHistory = modalHistory.splice(0, modalHistory.indexOf(activeModal) + 1);
		} else {
			modalHistory.push(activeModal);
		}

		this.setState({
			activeModal,
			modalHistory
		});
	};


	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
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

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {

		const { volume, playbackRate, loop } = this.state;

		const modal = (
			<ModalRoot activeModal={this.state.activeModal}>
				<ModalPage
					id={MODAL_PAGE_MUSIC}
					onClose={this.modalBack}
					header={
						<ModalPageHeader
							left={IS_PLATFORM_ANDROID && <HeaderButton onClick={this.modalBack}><Icon24Cancel /></HeaderButton>}
							right={<HeaderButton onClick={this.modalBack}>{IS_PLATFORM_IOS ? 'Готово' : <Icon24Done />}</HeaderButton>}
						>
							Фильтры
						</ModalPageHeader>
					}
				>
				<Group title="Player">
					<Div>
						<SongSelector
							songs={songs}
							selectedSong={this.state.currentSong}
							onSongSelected={this.handleSongSelected}
						/>
						<Div>
							<InfoRow title={this.state.currentSong.title}>
								<Progress value={this.state.position/this.state.currentSong.duration /10} />
							</InfoRow>
						</Div>
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
					</Div>
				</Group>
				</ModalPage>
			</ModalRoot>
		);

		const audioPlayer = (
			<Group>
				<Sound
					url={this.state.currentSong.url}
					playStatus={this.state.playStatus}
					position={this.state.position}
					volume={volume}
					playbackRate={playbackRate}
					loop={loop}
					onPlaying={({ position }) => this.setState({ position })}
					onFinishedPlaying={() => this.setState({ playStatus: Sound.status.STOPPED })}
				/>
				<FixedLayout vertical="bottom">
					<Button size="xl" level="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_MUSIC)}>
							Открыть модальную страницу
					</Button>
				</FixedLayout>
			</Group>
		);

		return (
			<View id="main" activePanel={this.state.activePanel} modal={modal}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} player={audioPlayer}/>
				<Exhibit id="exhibit" go={this.go} player={audioPlayer} exp_id={3666}/>
				<Events id="events" go={this.go} player={audioPlayer}/>
				<Map id="map" go={this.go} player={audioPlayer}/>
			</View>
		);
	}
}

export default App;
