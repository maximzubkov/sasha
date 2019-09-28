import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Footer, List, Cell, Radio, FormLayoutGroup, Button, Avatar, HorizontalScroll, Group, Div, Link, PanelHeader, HeaderButton, platform, IOS } from '@vkontakte/vkui';
import './Persik.css';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';

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

const Test = ({id, imag, author, variants, onChange}) => (
  <FormLayoutGroup id={id} onChange={this.handleChange} top="Выберите автора картины">
      <img className="Persik" src={imag} alt="Persik The Cat"/>
      {variants.map((v) =>
        <Radio name="type">{v}</Radio>
      )}
  </FormLayoutGroup>
)

export default Test;
