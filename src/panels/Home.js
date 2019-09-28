import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, FormLayout, Select, FormLayoutGroup, Radio, Avatar, PanelHeader, HeaderButton, platform, IOS } from '@vkontakte/vkui';
import './Persik.css';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Qr from '@vkontakte/icons/dist/24/qr';
import SocialLinks from './SocialLinks';
import questions from '../test/test.json'
const osname = platform();

class Home extends React.Component {
		constructor(props){
			super(props);
			this.state = {
					form1: '',
					form2: '',
					form3: '',
					form4: '',
					form5: '',
					qrData: null,
					qrType: null,
					submit: false,
					win: null,
			};

			this.handleInputChange = this.handleInputChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
		}

		handleInputChange(e) {
	    const { name, value } = e.currentTarget;
	    this.setState({ [name]: value });
	  }

		handleSubmit(event) {
			console.log(this.state);
			var score = 0;
			var iterator = 1;
			questions.forEach((q) => {
				if (this.state["form" + iterator] === q.author)
					score++
				iterator++;
			})
			if (score > 2){
				this.setState({submit : true, win : true})
			} else {
				this.setState({submit : true, win : false})
			}
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
										{!this.state.submit &&
											<FormLayout>
												{questions.map((q) => (
														<FormLayout>
																<img className="Persik" src={q.imag} alt="Persik The Cat"/>
																<Select name={q.name} onChange={this.handleInputChange} placeholder="Выберите автора картины">
																		{q.variants.map((v) =>
																			<option value={v}>{v}</option>
																		)}
																</Select>
														</FormLayout>
													)
												)}
											<FormLayout>
												<Button size="xl" onClick={this.handleSubmit}>Отправить ответы</Button>
											</FormLayout>
											</FormLayout>}
											{(this.state.win == true) &&
												<Div>
													Ура
												</Div>
											}
											{(this.state.win == false) &&
												<Div>
													Не Ура
												</Div>
											}
								</Div>
						</Group>
						<Div>
							<Button size="xl" level="2" onClick={go} data-to="exhibit">
								Show me the Exhibit, please
							</Button>
						</Div>
						<Div>
							<Button size="xl" level="2" onClick={go} data-to="events">
								Show me Events, please
							</Button>
						</Div>
						<Div>
							<Button size="xl" level="2" onClick={go} data-to="events_new">
								Show me Events_new, please
							</Button>
						</Div>
						<Div>
							<Button size="xl" level="2" onClick={go} data-to="map">
								Show me Map, please
							</Button>
						</Div>
						{player}
						<SocialLinks/>
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
