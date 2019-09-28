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

class Exhibit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img_src: [
        'https://pushkinmuseum.art/data/fonds/ancient_east/1_1_a/1_1_a_4679/3666_foto_1_01.jpg',
        'https://pushkinmuseum.art/data/fonds/ancient_east/1_1_a/1_1_a_4679/3666_foto_1_02.jpg',
        'https://pushkinmuseum.art/data/fonds/ancient_east/1_1_a/1_1_a_4679/3666_foto_1_03.jpg'
      ],
      description: 'Каменный голубь',
      name: 'Голубь'
    };
  }

  handleSize(image) {
    console.log(image.offsetWidth, image.offsetHeight)
  }

  getMeta = (url) => {
      var w; var h;
      var img = new Image();
      img.src = url;
      img.onload = () => {
        w = this.width; h = this.height;
      };
      return {w:w, h:h}
    }

    resizeImg = (img, height, width) => {
      img.height = height;
      img.width = width;
      console.log("resized");
      return img;
    }

    handleImageLoaded = () => {
      console.log('image loaded');
    }

  render() {
    var HtmlToReactParser = require('html-to-react').Parser;
    var htmlToReactParser = new HtmlToReactParser();


    const obj = objects[this.props.exp_id];
    console.log(obj);
    this.state.img_src = Object.values(obj['gallery'][1]).map(image_part =>
      {
        return 'http://pushkinmuseum.art' + image_part
      }
    );
    this.state.name = obj['name'];
    this.state.description = obj['text'];
    this.state.period_text = obj['period_text'];
    var reactElement = htmlToReactParser.parse(this.state.description);
    //this.state.description = this.state.description.replace(/(<([^>]+)>)/ig,"");
    const images = this.state.img_src.map(image =>
  // expression goes here:
    { return <Image src={image} height={ 200} width={ 200} />
    }
    );
    return (
      <Panel id="exhibit">
      <PanelHeader
         left={<HeaderButton onClick={this.props.go} data-to="home">
          {osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
         </HeaderButton>}
        >
        Описание
      </PanelHeader>
        <Div>
          <Group title="Экспонат">
          <Div>
            {this.state.name + ', ' + this.state.period_text}
          </Div>
          </Group>

          <Group title="Галерея">
          <Div>
             <Gallery
               align="right"
               slideWidth="custom"
               style={{ height: 200 }}>
               {images}
             </Gallery>
           </Div>
           </Group>
           <Group title="Описание">
               <Div>
                   {reactElement}
               </Div>
           </Group>
        </Div>
        <SocialLinks/>
      </Panel>
    );
  }
}

export default Exhibit;
