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
import axios from 'axios';
import './styles.css'
const osname = platform();

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      exhibition_names: undefined,
      lection_names: undefined,
      exhibition_pairs: undefined,
      activeEvent: undefined,
      activeLection: undefined,
      event_photos: undefined,
      slideIndex: 0,
      posts:[]
    };
  }

  componentDidMount() {
    axios.get('http://95.213.38.144:5001/get_places?user_id=34')
      .then(response => {
        console.log(response)
        this.setState({posts:response.data})
      })

      .catch(error => {
        console.log(error)
      })
  }

  render() {

    var HtmlToReactParser = require('html-to-react').Parser;
    var htmlToReactParser = new HtmlToReactParser();

    this.state.exhibition_names =Object.values(exhibitions).map(exhibition_item =>
      {
        return exhibition_item['name']
      }
    );
    this.state.lection_pairs =Object.values(lections).map(lection_item =>
      {
        var desc = lection_item['text']
        var desc_react = htmlToReactParser.parse(desc.replace("[", "").replace("]<p>", ""))
        return [lection_item['name'], desc_react]
      }
    );
    this.state.exhibition_pairs = Object.values(exhibitions).map(exhibition_item =>
      {
        var key1 = Object.values(exhibition_item['within'])['0']['mainfoto'];
        var key2 = key1['id01'];
        console.log('key2');
        console.log(key2);
        return [[exhibition_item['name'], exhibition_item['text']], 'http://pushkinmuseum.art' + key2];
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

    const images_events = this.state.exhibition_pairs.map(([[name, desc], image]) => {
      var desc_react = htmlToReactParser.parse(desc.replace("[", "").replace("]<p>", ""))
      console.log(desc);
      return (
        <img onClick={() => this.setState({activeEvent: [name, desc_react]})} className='b' src={image}/>
      )
    }
    );

    const buttons_lectures = this.state.lection_pairs.map(([name, desc]) => {
      return (
        <Button size="xl" level="2" onClick={() => this.setState({activeLection: [name, desc]})}>
          <b>
          {name}
          </b>
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
              slideWidth="custom"
              align="right"
              style={{ height: 200 }}
              slideIndex={this.state.slideIndex}
              onChange={slideIndex => this.setState({slideIndex})}
             >
            {images_events}
           </Gallery>
           <Div>
                <Button onClick={() => this.setState({slideIndex: this.state.slideIndex === 2 ? 0 : this.state.slideIndex + 1 })}>Next slide</Button>
            </Div>
         </Div>
         </Group>
         {this.state.activeEvent &&
           <Div>
           <Group title="Выставка">
               <Div>
               {this.state.activeEvent[0]}
               </Div>
           </Group>
           <Group title="Описание">
               <Div>
               {this.state.activeEvent[1]}
               </Div>
           </Group>
           </Div>

         }
         <Group title="Лекции">
         <Div>
            <Gallery
               align="right"
               style={{ height: 200 }}
               slideIndex={this.state.slideIndex}
               onChange={slideIndex => this.setState({slideIndex})}
              >
             {buttons_lectures}
            </Gallery>
            <Div>
                 <Button onClick={() => this.setState({slideIndex: this.state.slideIndex === 2 ? 0 : this.state.slideIndex + 1 })}>Next slide</Button>
             </Div>
          </Div>
          </Group>
          {this.state.activeLection &&
            <Div>
            <Group title="Лекция">
                <Div>
                {this.state.activeLection[0]}
                </Div>
            </Group>
            <Group title="Описание">
                <Div>
                {this.state.activeLection[1]}
                </Div>
            </Group>
            </Div>

          }
        <SocialLinks/>
      </Panel>
    );
  }
}

export default Events;
