import {
  StyleSheet,
} from 'react-native';

const BlurStyle = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'stretch'    
  },
});

const BlurColor = {
  blurPrimary: '#00e5bf',
  lightGray: '#e0e0e0',
  blurBgWhite: 'rgba(255,255,255,0.1)',
  blue500: '#2196f3',
  blurTextStrong: 'rgba(255,255,255,0.9)'
}

export {
  BlurStyle,
  BlurColor
}
