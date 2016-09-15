import { webFrame } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import App from './components/app';

webFrame.setZoomLevelLimits(1, 1);
render(<App/>, document.getElementById('app'));
