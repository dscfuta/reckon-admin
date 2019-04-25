import fishes from '../actions/fish';
import { PoultryRef } from '../../config/firebase';

export const fetchFishes = count => async (dispatch) => {
  dispatch({
    type: fishes.GET_FISHES_REQUEST,
  });
  PoultryRef.get().then((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    dispatch({
      type: fishes.GET_FISHES_SUCCESSFUL,
      fishes: data,
    });
  })
    .catch((err) => {
      dispatch({
        type: fishes.GET_FISHES_FAILED,
        fishes: err,
      });
    });
};


export const fetchFish = id => (dispatch) => {
  dispatch({
    type: fishes.GET_FISH_REQUEST,
  });
  PoultryRef.get({ id }).then((doc) => {
    dispatch({
      type: fishes.GET_FISH_SUCCESSFUL,
      reports: doc.data(),
    });
  })
    .catch((err) => {
      dispatch({
        type: fishes.GET_FISH_FAILED,
        reports: err,
      });
    });
};


export const addFish = obj => (dispatch) => {
  dispatch({
    type: fishes.ADD_FISH_FAILED,
  });
  PoultryRef.add(obj).then((doc) => {
    dispatch({
      type: fishes.ADD_FISH_SUCCESSFUL,
      reports: doc,
    });
  })
    .catch((err) => {
      dispatch({
        type: fishes.ADD_FISH_FAILED,
        reports: err,
      });
    });
};


export const markAsSeen = fish => async (dispatch) => {
  dispatch({
    type: fishes.MARK_AS_SEEN_REQUEST,
  });
  fish.seen = true;
  PoultryRef.child(fish.id).update(fish).then(() => {
    dispatch({
      type: fishes.MARK_AS_SEEN_SUCCESSFUL,
    });
  })
    .catch((err) => {
      dispatch({
        type: fishes.MARK_AS_SEEN_FAILED,
        message: err.messsage,
      });
    });
};
