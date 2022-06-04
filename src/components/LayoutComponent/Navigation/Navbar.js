import React, { Component } from 'react';
import RightMenu from './RightMenu'
import 'antd/dist/antd.css';
class Navbar extends Component {
  state = {
    current: 'mail',
    visible: false
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
onClose = () => {
    this.setState({
      visible: false,
    });
  };
render() {
    return (
        <nav className="menuBar">
          <div className="menuCon">
            <div className="rightMenu">
                <RightMenu />
            </div>
          </div>
        </nav>
    );
  }
}
export default Navbar;