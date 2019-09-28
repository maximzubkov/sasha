import React from 'react';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import {Panel, Group,Cell, PanelHeader, Button, HeaderButton,
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
      exhibition_pairs: undefined,
      activeEvent: undefined,
      event_photos: undefined,
    };
  }

  render() {



    var HtmlToReactParser = require('html-to-react').Parser;
    var htmlToReactParser = new HtmlToReactParser();

    this.state.exhibition_names =Object.values(exhibitions).map(exhibition_item =>
      {
        return exhibition_item['name']
      }
    );
    this.state.exhibition_pairs = Object.values(exhibitions).map(exhibition_item =>
      {
        var key1 = Object.values(exhibition_item['within'])['0']['mainfoto'];
        var key2 = key1['id01'];
        console.log('key2');
        console.log(key2);
        return [exhibition_item['name'], 'http://pushkinmuseum.art' + key2];
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
    console.log(this.state.exhibition_pairs)

    const images_events = this.state.exhibition_pairs.map(([name, image]) => {
      return (
        <Button level="tertiary" height={ 200} width={ 200} onClick={() => this.setState({activeEvent: name})} >
          <Image src={image} height={ 200} width={ 200} />
        </Button>
      )
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
        <Group title="Выставки">
        <Div>
           <Gallery
             align="right"
             slideWidth="custom"
             style={{ height: 200 }}>
             <img onClick={() => this.setState({activeEvent: 'wtf1'})} src='https://pushkinmuseum.art/data/fonds/ancient_east/1_1_a/1_1_a_4679/3666_foto_1_01.jpg'/>
             <img onClick={() => this.setState({activeEvent: 'wtf2'})} src='https://pushkinmuseum.art/data/fonds/ancient_east/1_1_a/1_1_a_4679/3666_foto_1_02.jpg'/>
             <img onClick={() => this.setState({activeEvent: 'wtf3'})} src='https://pushkinmuseum.art/data/fonds/ancient_east/1_1_a/1_1_a_4679/3666_foto_1_03.jpg'/>
           </Gallery>
         </Div>
         </Group>
         {this.state.activeEvent &&
           <Group>
               <Div>
               {this.state.activeEvent}
               </Div>
           </Group>}
        <SocialLinks/>
      </Panel>
    );
  }
}

export default Events;
