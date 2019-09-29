import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, FormLayout, Select, FormLayoutGroup, Radio, Avatar, PanelHeader, HeaderButton, platform, IOS } from '@vkontakte/vkui';
import './Persik.css';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Qr from '@vkontakte/icons/dist/24/qr';
import SocialLinks from './SocialLinks';
import questions from '../test/test.json'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

class Test extends React.Component {
		constructor(props){
			super(props);
			this.state = {
					form1: '',
					form2: '',
					form3: '',
					form4: '',
					form5: '',
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


		render(){
				const id = this.props.id;
				const go = this.props.go;
        const player = this.props.player;
				return (
				<Panel id={id}>
						<PanelHeader
							left={<HeaderButton onClick={go} data-to="home">
								{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
							</HeaderButton>}
						>
							Тест
						</PanelHeader>

						<Group title="Navigation Example">
								<Div>
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
						{player}
						<SocialLinks/>
				</Panel>
				);
		}
}

export default Test;
