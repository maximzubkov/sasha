import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Footer, List, Cell, Button, Avatar, HorizontalScroll, Group, Div, Link, PanelHeader, HeaderButton, platform, IOS } from '@vkontakte/vkui';
import './Persik.css';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24LogoInstagram from '@vkontakte/icons/dist/24/logo_instagram';
import Icon24LogoFacebook from '@vkontakte/icons/dist/24/logo_facebook';
import Icon24LogoTwitter from '@vkontakte/icons/dist/24/logo_twitter';
import Icon24User from '@vkontakte/icons/dist/24/user';

const osname = platform();

const itemStyle = {
    flexShrink: 0,
    width: 80,
    height: 94,
    display: 'flex',
    flexDirection:
    'column',
    alignItems: 'center',
    fontSize: 12
  };

const SocialLinks = () => (
		<Footer>
      <HorizontalScroll>
          <div style={{ display: 'flex' }}>
            <div style={itemStyle}>
              <Avatar size={48} style={{ marginBottom: 8 }}><Link href="https://twitter.com/TheArtsmuseum" target="_blank"><Icon24LogoTwitter fill="var(--white)"/></Link></Avatar>
                  <Link href="https://twitter.com/TheArtsmuseum" target="_blank">Twitter</Link>
            </div>
            <div style={itemStyle}>
              <Avatar size={48} style={{ marginBottom: 8 }}><Link href="https://www.instagram.com/theartsmuseum/" target="_blank"><Icon24LogoInstagram fill="var(--white)"/></Link></Avatar>
                  <Link href="https://www.instagram.com/theartsmuseum/" target="_blank">Instagram</Link>
            </div>
            <div style={{ ...itemStyle, paddingRight: 4 }}>
              <Avatar size={48} style={{ marginBottom: 8 }}><Link href="https://www.facebook.com/theartsmuseum/" target="_blank"><Icon24LogoFacebook fill="var(--white)"/></Link></Avatar>
                  <Link href="https://www.facebook.com/theartsmuseum/" target="_blank">Facebook</Link>
            </div>
          </div>
          <img src="https://pushkinmuseum.art/images/svg/logo_gmii_footer.svg"/>
        </HorizontalScroll>
    </Footer>
)

export default SocialLinks;
