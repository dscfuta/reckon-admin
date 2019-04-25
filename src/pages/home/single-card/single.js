import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import qs from 'query-string';
import { FaArrowCircleLeft } from 'react-icons/fa';
import fishActions from '../../../redux/actions/fish';
import * as fishActionsCreator from '../../../redux/action-creators/fish';
import { SingleCardStyle } from './single.style';
import Loader from '../../../assets/flickr-loader.svg';

export class SingleCardPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { qs: null, report: null };
    this.markAsSeen = this.markAsSeen.bind(this);
  }

  markAsSeen(report) {
    this.props.markFishAsSeen(report);
  }

  componentDidMount() {
    const parsedUrl = qs.parse(this.props.location.search) || {};
    if (!parsedUrl || !('id' in parsedUrl)) {
      this.props.history.push('/');
    }
    this.setState({ qs: parsedUrl });
    this.props.getFish(parsedUrl.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type && this.props.type === fishActions.GET_REPORT_SUCCESSFUL) {
      const { report } = this.props;
      const { qs } = this.state;
      this.setState({ report: report || null });

      if (report) {
        report.id = qs.id;
        this.markAsSeen(report);
      }
    }
  }

  render() {
    const { report, qs } = this.state;
    const { type } = this.props;
    console.log(report);
    return (
      <SingleCardStyle>
        { this.props.type === fishActions.GET_REPORT_REQUEST
            && <p><img src={Loader} alt="loader" /></p>
        }
      </SingleCardStyle>
    );
  }
}


const mapStatesWithProps = states => ({
  fish: states.fish.fishes,
  type: states.fish.type,
});
const mapDispatchWithStates = dispatch => ({
  getFish: (id) => {
    dispatch(fishActionsCreator.fetchFish(id));
  },
  markFishAsSeen: fish => dispatch(fishActionsCreator.markAsSeen(fish)),
});
export default connect(mapStatesWithProps, mapDispatchWithStates)(withRouter(SingleCardPage));
