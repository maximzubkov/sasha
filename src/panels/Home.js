import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, Avatar, PanelHeader, HeaderButton, platform, IOS } from '@vkontakte/vkui';
import './Persik.css';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Qr from '@vkontakte/icons/dist/24/qr';

const osname = platform();

class Home extends React.Component {
		constructor(props){
			super(props);
			this.state = {
					qrData: null,
					qrType: null,
			};
		}

		getQrData = () => {
			connect.subscribe((e) => {
				switch (e.detail.type) {
					case 'VKWebAppOpenQRResult':
						this.setState({ qrData: e.detail.data.qr_data });
						break;
					default:
						console.log(e.detail.type);
				}
			});
			connect.send('VKWebAppOpenQR');
		}

		render(){
				const fetchedUser = this.props.fetchedUser;
				const player = this.props.player;
				const id = this.props.id;
				const go = this.props.go;
				return (
				<Panel id={id}>
						<PanelHeader
							left={<HeaderButton onClick={this.getQrData}>
								{osname === IOS ? <Icon24Qr/> : <Icon24Qr/>}
							</HeaderButton>}
						>
							Главная страница
						</PanelHeader>
						{fetchedUser &&
						<Group title="User Data Fetched with VK Connect">
								<ListItem
								before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
								description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
								>
								{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
								</ListItem>
						</Group>}

						<Group title="Navigation Example">
								<Div>
										{this.state.qrData}
								</Div>
						</Group>
						<Div>
							<Button size="xl" level="2" onClick={go} data-to="exhibit">
								Show me the Exhibit, please
							</Button>
						</Div>
						{player}
				</Panel>
				);
		}
}

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
