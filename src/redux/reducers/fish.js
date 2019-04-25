import fishActions from '../actions/fish';

const init = {
  action: '',
  message: '',
  fishes: [],
};
export default (state = init, payload) => {
  switch (payload.type) {
    case fishActions.GET_FISHES_REQUEST:
      return {
        ...state,
        action: fishActions.GET_FISHES_REQUEST,
      };

    case fishActions.GET_FISHES_FAILED:
      return {
        ...state,
        action: fishActions.GET_FISHES_FAILED,
        message: payload.message,
      };
    case fishActions.GET_FISHES_SUCCESSFUL:
      return {
        ...state,
        action: fishActions.GET_FISHES_SUCCESSFUL,
        fishes: payload.fishes,
      };


    case fishActions.MARK_AS_SEEN_REQUEST:
      return {
        ...state,
        action: fishActions.MARK_AS_SEEN_REQUEST,
      };

    case fishActions.MARK_AS_SEEN_FAILED:
      return {
        ...state,
        action: fishActions.MARK_AS_SEEN_FAILED,
        message: payload.message,
      };
    case fishActions.MARK_AS_SEEN_SUCCESSFUL:
      return {
        ...state,
        action: fishActions.MARK_AS_SEEN_SUCCESSFUL,
      };

    default:
      return state;
  }
};
