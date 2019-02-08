import React from 'react';
import { connect } from 'react-redux';
import { HomeStyle } from './home.style';
import * as fishMethods from '../../redux/action-creators/fish';
import fishActions from '../../redux/actions/fish';
import Card from '../../shared-components/card';

export class Home extends React.Component {
  componentDidMount() {
    this.props.fetchReports();
  }

  render() {
    const { type, reports } = this.props;
    return (
      <HomeStyle>
        <div className="header">
          <div className="title">Reports</div>
          <nav className="breadcrumb">
            <span className="breadcrumb-span">Home</span>
          </nav>
        </div>
        <div className="home-content xs-12">
          {
          type === fishActions.GET_FISHES_SUCCESSFUL
          && Object.keys(reports).map((val, ind) => (
            <div key={ind} className="col xs-12 sm-6 md-4 ">
              <Card {...reports[val]} />
            </div>
          ))
        }
        </div>
      </HomeStyle>
    );
  }
}

const mapStatesToProps = states => ({
  type: states.fish.action,
  reports: states.fish.fishes,
});
const mapDispatchToProps = dispatch => ({
  fetchReports: () => {
    dispatch(fishMethods.fetchFishes());
  },
});

export default connect(mapStatesToProps,
  mapDispatchToProps)(Home);
