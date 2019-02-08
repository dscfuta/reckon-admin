import { firestore, initializeApp } from 'firebase/app';
import { FirebaseConfig } from './key';
// Add additional services that you want to use
// require('firebase/auth');
// require('firebase/database');
require('firebase/firestore');
// require('firebase/messaging');
// require('firebase/functions');

initializeApp(FirebaseConfig);

const db = firestore();
export const PoultryRef = db.collection('Poultry');
export const AquaticRef = db.collection('Aquatic');
export const PriceDcpRef = db.collection('PriceAndDCPValues');
