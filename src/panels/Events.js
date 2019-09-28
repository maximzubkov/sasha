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
import exhibitions from '../data/parsed/events_exhibition.json';
import lections from '../data/parsed/events_lections.json';
import concerts from '../data/parsed/events_concert.json';
import Parser from 'html-to-react';
const osname = platform();

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      exhibition_names: undefined,
      lection_names: undefined,
      concert_names: undefined,
      other_names: undefined,

      event_photos: undefined,
      lection_photos: undefined,
      concert_photos: undefined,
      other_photos: undefined
    };
  }

  render() {



    var HtmlToReactParser = require('html-to-react').Parser;
    var htmlToReactParser = new HtmlToReactParser();

    this.state.exhibition_names = Object.values(exhibitions).map(exhibition_item =>
      {
        return exhibition_item['name']
      }
    );
    this.state.lection_names = Object.values(lections).map(lection_item =>
      {
        return lection_item['name']
      }
    );
    this.state.corcert_names = Object.values(concerts).map(concert_item =>
      {
        return concert_item['name']
      }
    );

    this.state.event_photos = Object.values(exhibitions).map(exhibition_item =>
      {
        var key1 = Object.values(exhibition_item['within'])['0']['mainfoto'];
        var key2 = key1['id01'];
        console.log('key2');
        console.log(key2);
        return 'http://pushkinmuseum.art' + key2;
      }
    );

    const images_events = this.state.event_photos.map(image =>
    { return <Image src={image} height={ 200} width={ 200} />
    }
    );


    return (
      <Panel id="events">
      <PanelHeader
         left={<HeaderButton onClick={this.props.go} data-to="home">
          {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
         </HeaderButton>}
        >
        События
      </PanelHeader>
        <Div>
        <Group title="Выставки">
        <Div>
           <Gallery
             align="right"
             slideWidth="custom"
             style={{ height: 200 }}>
             {images_events}
           </Gallery>
         </Div>
         </Group>
        </Div>
        <SocialLinks/>
      </Panel>
    );
  }
}

export default Events;
