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
      description: 'Description'
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
    const images = this.state.img_src.map(image =>
  // expression goes here:
    { return <Image src={image} height={ 200} width={ 200} />
    }
    );
    return (
      <Panel id="exhibit">
        <PanelHeader>Выставка</PanelHeader>
        <Div>
          <Group title="Description">
              <Div>
                  {this.state.description};
              </Div>
          </Group>

          <Group title="Custom width">
             <Gallery
               slideWidth="custom"
               style={{ height: 200 }}>
               {images}
             </Gallery>
           </Group>
        </Div>
      </Panel>
    );
  }
}

export default Exhibit;
