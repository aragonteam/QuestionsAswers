import {RkTheme} from 'react-native-ui-kitten';

export let bootstrap = () => {

RkTheme.setColor('lightGray', RkTheme.current.colors.grey300);
RkTheme.setColor('gray', RkTheme.current.colors.grey500);
RkTheme.setColor('darkGray', RkTheme.current.colors.grey700);
RkTheme.setColor('primary', RkTheme.current.colors.blue500);

RkTheme.setColor('blurText', 'rgba(255,255,255,0.7)');
RkTheme.setColor('blurTextStrong', 'rgba(255,255,255,0.9)');
RkTheme.setColor('blurBg', 'rgba(0,0,0,0.1)');
RkTheme.setColor('blurBgWhite', 'rgba(255,255,255,0.1)');
RkTheme.setColor('blurBg', 'rgba(11,18,38,0.3)');
RkTheme.setColor('blurBgLight', 'rgba(11,18,38,0.1)');
RkTheme.setColor('blurBgStrong', 'rgba(11,18,38,0.5)');
RkTheme.setColor('blurPrimary', '#00e5bf');
RkTheme.setColor('blurDark', '#15213b');
RkTheme.setColor('blurExtraDark', '#0b162a');
RkTheme.setColor('materialGray', '#ECECEC');
RkTheme.setColor('materialWarning', '#FFC65E');
RkTheme.setColor('materialBg', '#009688');

RkTheme.setType('text', 'blurText', {
  color: RkTheme.current.colors.blurTextStrong
});
RkTheme.setType('text', 'primary', {
  color: RkTheme.current.colors.primary
});
RkTheme.setType('text', 'cyan', {
  color: RkTheme.current.colors.materialBg
});
RkTheme.setType('text', 'montserrat', {
  fontFamily: 'Montserrat-Regular'
});
RkTheme.setType('text', 'roboto', {
  fontFamily: 'roboto'
});
RkTheme.setType('text', 'transparentBg', {
  backgroundColor: 'transparent'
});

RkTheme.setType('separator', 'blur', {
  backgroundColor: RkTheme.current.colors.blurBgStrong,
  height: 0.5
});
RkTheme.setType('button', 'iconButton', {
  container: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  inner: {
    fontSize: 26
  },
});

RkTheme.setType('input', 'classic', {
  input: {
    fontSize: 20,
    color: RkTheme.current.colors.primary
  },
  container: {
    borderBottomColor: RkTheme.current.colors.darkGray,
    marginTop: 40
  },
  label: {
    paddingBottom: 15
  }
});


RkTheme.setType('card', 'classic', {
  container: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginTop: 0,
    marginBottom: 15,
    borderWidth: 0,
    backgroundColor: RkTheme.current.colors.white,
  },
  content: {
    padding: 0,
    backgroundColor: RkTheme.current.colors.white
  },
  title: {
    fontSize: 16,
    color: RkTheme.current.colors.primary
  },
  subTitle: {
    fontSize: 12,
    color: RkTheme.current.colors.gray
  },
  avatarSmall: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  header: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: RkTheme.current.colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  footer: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: RkTheme.current.colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  friendItem: {
    marginHorizontal: 0,
    marginBottom: 0,
    borderRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    shadowOpacity: 0,
  },
  online: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 10,
    alignSelf: 'center',
    backgroundColor: RkTheme.current.colors.primary
  },
  icon: {
    fontSize: 27,
    color: RkTheme.current.colors.primary
  }
});

RkTheme.setType('card', 'blur', {
  container: {
    borderRadius: 0,
    marginHorizontal: 0,
    backgroundColor: RkTheme.current.colors.blurBg,
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  content: {
    backgroundColor: RkTheme.current.colors.blurBg
  },
  title: {
    marginBottom: 3,
    color: RkTheme.current.colors.blurTextStrong
  },
  subTitle: {
    color: RkTheme.current.colors.blurText
  },
  header: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: RkTheme.current.colors.blurBg,
  },
  footer: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: RkTheme.current.colors.blurBg,
  },
  icon: {
    color: 'white'
  },
  sideColor: {
    width: 5,
    marginRight: 10,
    alignSelf: 'stretch',
    borderRadius: 2,
  },
  friendItem: {
    paddingLeft: 0,
  },
  online: {
    backgroundColor: RkTheme.current.colors.blurPrimary,
    shadowColor: RkTheme.current.colors.blurPrimary,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0
    }
  }
});

RkTheme.setType('card', 'materialCard', {
  content: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  container: {
    borderRadius: 5,
    borderWidth: 0
  },
  title: {
    color: RkTheme.current.colors.materialBg
  },
  subTitle: {
    color: RkTheme.current.colors.materialBg
  },
  icon: {
    color: RkTheme.current.colors.materialBg,
  },
  header: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 0,
  },
  footer: {
    borderTopColor: RkTheme.current.colors.materialGray,
    borderTopWidth: 0.5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  online: {
    backgroundColor: RkTheme.current.colors.materialBg
  }
});

RkTheme.setType('button', 'materialButton', {
  container: {
    backgroundColor: RkTheme.current.colors.materialBg
  },
  inner: {
    color: RkTheme.current.colors.white
  }
});

RkTheme.setTheme('blur', {
  text: {
    defaultType: 'montserrat transparentBg blurText'
  },
  card: {
    defaultType: 'classic blur',
  },
  separator: {
    defaultType: 'blur'
  }
});

// RkTheme.setTheme('classic', {
//   text: {
//     defaultType: 'transparentBg primary'
//   },
//   card: {
//     defaultType: 'classic',
//   }
// });

// RkTheme.setTheme('material', {
//   text: {
//     defaultType: 'transparentBg warning roboto cyan'
//   },
//   card: {
//     defaultType: 'classic material materialCard',
//   },
//   button: {
//     defaultType: 'material materialButton'
//   }
// });


// RkTheme.setStyle('backgroundImage', {
//   flex: 1,
//   width: null,
//   height: null,
//   resizeMode: 'cover',
//   justifyContent: 'center',
//   alignItems: 'stretch'
// });

};

// export default {}
