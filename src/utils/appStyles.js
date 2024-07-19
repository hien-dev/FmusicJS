import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  full: {
    height: '100%',
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  halfWidth: {
    minWidth: '60%',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  rotated: {
    transform: [{rotate: '270deg'}],
  },
  wrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  responsiveImageBallStrike: {
    height: undefined,
    aspectRatio: 16 / 9,
    width: '100%',
  },
  responsiveImageBallShape: {
    height: undefined,
    aspectRatio: 301 / 251,
    width: '100%',
  },
  responsiveImageSquare: {
    height: undefined,
    aspectRatio: 1,
    width: '100%',
  },

  // Positioning
  hCenter: {
    alignItems: 'center',
  },
  vCenter: {
    justifyContent: 'center',
  },
  vBottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textLeft: {
    textAlign: 'left',
  },
  spaceEnd: {
    justifyContent: 'flex-end',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  alignBetween: {
    alignContent: 'space-between',
  },
  alignEnd: {
    alignSelf: 'flex-end',
  },
  alignCenter: {
    alignSelf: 'center',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
  },
  bottomLeft: {
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  bottomRight: {
    position: 'absolute',
    right: 5,
    bottom: 0,
  },
  topLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  topRight: {
    position: 'absolute',
    right: 20,
    top: 20,
  },

  // Button

  fullButton: {
    width: '100%',
  },
  button: {
    minWidth: 300,
  },
  buttonWMd: {
    minWidth: '25%',
  },
  buttonContentStyle: {
    padding: 5,
  },
  buttonLabel: {
    color: '#fff',
  },
  secondaryButton: {
    backgroundColor: '#4a4a4a',
  },

  // Modal

  modal: {
    width: '100%',
    height: '95%',
    backgroundColor: 'white',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  indicator: {
    width: wp('8%'),
    height: hp('0.3%'),
    backgroundColor: 'white',
    borderRadius: 20,
  },

  // Font Type

  white: {
    color: '#fff',
  },
  black: {
    color: '#000',
  },
  bold: {
    fontWeight: 'bold',
  },
  semiBold: {
    fontWeight: '600',
  },
  italic: {
    fontStyle: 'italic',
  },
  underlined: {
    textDecorationLine: 'underline',
  },
  uppercase: {
    textTransform: 'uppercase',
  },

  // Font Size
  xxs: {
    fontSize: hp('1.2%'),
  },
  xs: {
    fontSize: hp('1.5%'),
  },
  sm: {
    fontSize: hp('1.9%'),
  },
  md: {
    fontSize: hp('2.9%'),
  },
  lg: {
    fontSize: hp('3.9%'),
  },
  xl: {
    fontSize: hp('4.9%'),
  },
  xxl: {
    fontSize: hp('5.9%'),
  },
  xxxl: {
    fontSize: hp('8.6%'),
  },
  xxxxl: {
    fontSize: hp('10.7%'),
  },
  xxxxxl: {
    fontSize: hp('15.4%'),
  },
  // Margin
  mHXs: {
    marginHorizontal: '2%',
  },
  mHSm: {
    marginHorizontal: 14,
  },
  mHMd: {
    marginHorizontal: '8%',
  },
  mTXxs: {
    marginTop: '1%',
  },
  mTXs: {
    marginTop: 7,
  },
  mTSm: {
    marginTop: 14,
  },
  mTMd: {
    marginTop: 28,
  },
  mTLg: {
    marginTop: '16%',
  },
  mTXl: {
    marginTop: '32%',
  },
  mTAuto: {
    marginTop: 'auto',
  },
  mHAuto: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  noMt: {
    marginTop: 0,
  },
  noMb: {
    marginBottom: 0,
  },
  mBXxs: {
    marginBottom: '1%',
  },
  mBXs: {
    marginBottom: 7,
  },
  mBSm: {
    marginBottom: 14,
  },
  mBMd: {
    marginBottom: 28,
  },
  mBLg: {
    marginBottom: 56,
  },
  mBXl: {
    marginBottom: '32%',
  },
  mRXs: {
    marginRight: 7,
  },
  mRXxs: {
    marginRight: '1%',
  },
  mRSm: {
    marginRight: 14,
  },
  mRMd: {
    marginRight: '8%',
  },
  mRLg: {
    marginRight: '16%',
  },
  mRAuto: {
    marginRight: 'auto',
  },
  mLAuto: {
    marginLeft: 'auto',
  },
  mLXxs: {
    marginLeft: 3.5,
  },
  mLXs: {
    marginLeft: 7,
  },
  mLSm: {
    marginLeft: '4%',
  },
  mLMd: {
    marginLeft: 28,
  },
  mLLg: {
    marginLeft: '16%',
  },
  mVXs: {
    marginVertical: 7,
  },
  mVSm: {
    marginVertical: 14,
  },
  mVMd: {
    marginVertical: 28,
  },
  mVLg: {
    marginVertical: '16%',
  },
  mVXl: {
    marginVertical: '32%',
  },
  mXs: {
    margin: '2%',
  },
  mSm: {
    margin: '4%',
  },
  mMd: {
    margin: '8%',
  },

  // Padding

  pLXs: {
    paddingLeft: '2%',
  },
  pLSm: {
    paddingLeft: '4%',
  },
  pLMd: {
    paddingLeft: '8%',
  },
  pLLg: {
    paddingLeft: '16%',
  },
  pRXs: {
    paddingRight: '2%',
  },
  pRSm: {
    paddingRight: 14,
  },
  pRMd: {
    paddingRight: '8%',
  },
  pTXs: {
    paddingTop: '2%',
  },
  pTSm: {
    paddingTop: 14,
  },
  pTMd: {
    paddingTop: 28,
  },
  pTLg: {
    paddingTop: '16%',
  },
  pTXl: {
    paddingTop: '32%',
  },
  pBXs: {
    paddingBottom: '2%',
  },
  pBSm: {
    paddingBottom: 14,
  },
  pBMd: {
    paddingBottom: '8%',
  },
  pBLg: {
    paddingBottom: '16%',
  },
  pHXs: {
    paddingHorizontal: 7,
  },
  pHSm: {
    paddingHorizontal: 14,
  },
  pHMd: {
    paddingHorizontal: 28,
  },
  pHLg: {
    paddingHorizontal: 56,
  },
  pHXL: {
    paddingHorizontal: 65,
  },
  pVXs: {
    paddingVertical: 7,
  },
  pVSm: {
    paddingVertical: 14,
  },
  pVMd: {
    paddingVertical: 28,
  },
  pVLg: {
    paddingVertical: 56,
  },
  pXxs: {
    padding: '1%',
  },
  pXs: {
    padding: '2%',
  },
  pSm: {
    padding: 14,
  },
  pMd: {
    padding: 28,
  },
  pLg: {
    padding: 56,
  },

  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Ball Strike Circle
  circle: {
    position: 'absolute',
    width: wp('14%'),
    height: wp('14%'),
  },
  circleRightPure: {
    bottom: '5%',
    right: '45%',
  },
  circleRightToe: {
    bottom: '7%',
    right: '63%',
  },
  circleRightShank: {
    bottom: '5%',
    right: '24%',
  },
  circleRightHeel: {
    bottom: '3%',
    right: '30%',
  },
  circleRightFat: {
    bottom: '17%',
    left: '36%',
  },
  circleRightThin: {
    bottom: '-8%',
    left: '36%',
  },
  circleLeftPure: {
    bottom: '5%',
    left: '46%',
  },
  circleLeftShank: {
    bottom: '5%',
    left: '24%',
  },
  circleLeftToe: {
    bottom: '7%',
    left: '63%',
  },
  circleLeftHeel: {
    bottom: '3%',
    left: '30%',
  },
  circleLeftFat: {
    bottom: '17%',
    left: '48%',
  },
  circleLeftThin: {
    bottom: '-8%',
    left: '50%',
  },
});
