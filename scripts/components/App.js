import React, {Component} from 'react';
import Santa from './Santa';
import Riiid from './Riiid';
import Present from './Present';
import Hat from './Hat';

export default class App extends Component {
  render() {
    return (
      <div>
        <Santa />
        <Riiid maxCubeSize={15}/>
        <Present maxCubeSize={16}/>
        <Hat />
      </div>
    );
  }
}
