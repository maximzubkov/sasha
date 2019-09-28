import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, Button, Group, Div, FormLayout, Select, FormLayoutGroup, Radio, Avatar, PanelHeader, HeaderButton, platform, IOS } from '@vkontakte/vkui';
import './Persik.css';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Qr from '@vkontakte/icons/dist/24/qr';
import SocialLinks from './SocialLinks';
import questions from '../test/test.json'
import { ReactComponent as MapSVG } from '../map_navigate/maps/main_1floor.svg';

const osname = platform();

class Map extends React.Component {
		constructor(props){
			super(props);
			this.state = {
        hrefProps: ""
			};

		}

		render(){
				const fetchedUser = this.props.fetchedUser;
				const player = this.props.player;
				const id = this.props.id;
				const go = this.props.go;
        this.hrefProps = ["vk.com/apps1111", "10&20&&30&40"]
        const path = this.hrefProps[1].split("&&").map((data) => data.replace("&", ",") + " ");
        const way = [[1780.1, 1690.3], [1720.0, 1587.0], [1632.3, 1477.7], [1785.1, 1407.7], [1969.8, 1597.4], [2103.9, 1541.4], [2282.0, 1418.6]].map(([x, y]) => x + "," + y + " ")
        console.log(way)
        var polyline = "";
        way.forEach((elem) => {
          polyline += elem;
        })
        console.log(polyline)
				return (
				<Panel id={id}>
						<PanelHeader
							left={<HeaderButton onClick={go}>
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
              <MapSVG polyline={{points: {polyline}, stroke: "red", strokeWidth:"3", fill:"none"}}/>

						{player}
					  <SocialLinks/>
				</Panel>
				);
		}
}


export default Map;
