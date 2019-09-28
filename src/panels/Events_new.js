import React from 'react';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import {Panel, Group,Cell, PanelHeader, HeaderButton,
  ListItem, Tabs, TabsItem, HorizontalScroll, Div,
  Counter, platform, IOS, Gallery} from '@vkontakte/vkui';
import './Persik.css';
import persik from '../img/persik.png';
import Image from 'react-image-resizer';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import ResizeImage from 'react-resize-image';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import PropTypes from 'prop-types';
import SocialLinks from './SocialLinks';
import objects from '../data/parsed/objects_rus.json';
import Parser from 'html-to-react';
import './Exhibit.css';
const osname = platform();

class Events_new extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      akl:32
    };
  }
  render() {
    return (
      <Panel id="events_new">
      <PanelHeader
         left={<HeaderButton onClick={this.props.go} data-to="home">
          {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
         </HeaderButton>}
        >
        Описание
      </PanelHeader>
      <Group>
        <Div>
        Нуы
        </Div>
      </Group>
      <SocialLinks/>
      </Panel>
    );
  }
}

export default Events_new;
