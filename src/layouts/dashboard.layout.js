import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { TiHomeOutline } from 'react-icons/ti';
import { connect } from 'react-redux';
import NavbarPage from '../shared-components/navbar';
import Footer from '../shared-components/footer';
import { HomeStyle } from '../shared-components/dashboard/index.style';
import toggle_actions from '../redux/actions/toggle';

import ModalLayout from './modal.layout';
// import SearchBar from "../shared-components/search-bar";
export class DashboardLayout extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = this.navigate.bind(this);
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  navigate(url) {
    this.props.history.push(url);
  }

  render() {
    const { component: Component, path, ...rest } = this.props;
    const { canSearch, type, status } = rest;
    return (
      <Route
        {...rest}
        render={matchProps => (
          <div className="DefaultLayout">
            <ModalLayout />
            <NavbarPage canSearch={canSearch} />
            <HomeStyle>
              <div className="side-bar">
                <div onClick={() => this.navigate('/')} className={path === '/' ? 'fa-home menu active' : 'fa-home menu'}>
                  <span className="home-icon" onClick={this.onToggleClick}>
                    <TiHomeOutline size={20} />
                  </span>
                  {
                          type === toggle_actions.TOGGLE && status === true
                          && <span className="home-text" style={{ display: 'none' }}>Dashboard</span>
                        }
                  {
                          type === toggle_actions.TOGGLE && status === false
                          && <span className="home-text">Dashboard</span>
                        }

                </div>
              </div>
              <div className="content">
                <Component {...matchProps} />
              </div>
            </HomeStyle>
            <Footer />
          </div>
        )}
      />
    );
  }
}


const mapStateToProps = state => ({
  type: state.toggle.type,
  status: state.toggle.show,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardLayout));
