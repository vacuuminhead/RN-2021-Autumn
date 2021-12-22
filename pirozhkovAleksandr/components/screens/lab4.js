import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {favItem} from '../../store/album';
import {styles} from '../styles/lab4Styles';

const Lab4 = () => {
  const [firstEl, setFirst] = useState(0);
  const [lastEl, setLast] = useState(5);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const ref = React.useRef(null);
  const data = useSelector(state => state.data.value);
  const selectedItems = data?.filter(item => item.favorite);
  const photo = useSelector(state => state.photo.value);

  const pageControl = () => {
    return (
      <View style={styles.bottomContainer}>
        {!!page && (
          <TouchableOpacity
            onPress={() => {
              setFirst(firstEl - 5);
              setLast(lastEl - 5);
              setPage(page - 1);
              ref.current.scrollTo({x: 0, y: 0, animated: true});
            }}>
            <Neomorph
              lightShadowColor="#1E2126"
              darkShadowColor="#576178"
              style={styles.buttonShadow}>
              <Text style={styles.buttonText}>PREV</Text>
            </Neomorph>
          </TouchableOpacity>
        )}
        <Neomorph
          lightShadowColor="#1E2126"
          darkShadowColor="#576178"
          inner
          style={styles.curPage}>
          <Text style={styles.pageText}>{page + 1}</Text>
        </Neomorph>
        {!!(selectedItems.length / 5 - page - 1 > 0 ? 1 : 0) && (
          <TouchableOpacity
            onPress={() => {
              setFirst(firstEl + 5);
              setLast(lastEl + 5);
              setPage(page + 1);
              ref.current.scrollTo({x: 0, y: 0, animated: true});
            }}>
            <Neomorph
              lightShadowColor="#1E2126"
              darkShadowColor="#576178"
              style={styles.buttonShadow}>
              <Text style={styles.buttonText}>NEXT</Text>
            </Neomorph>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const content = () => {
    return (
      <View style={styles.topContainer}>
        <ScrollView ref={ref}>
          <View style={styles.back}>
            <View style={styles.scrollTop} />
            <LinearGradient
              colors={['#FF008A', '#9E00FF']}
              start={{x: 0.5, y: 0.0}}
              end={{x: 0.5, y: 1.0}}
              style={styles.box}>
              <Neomorph
                inner
                lightShadowColor="#1E2126"
                darkShadowColor="#576178"
                style={styles.boxShadow}>
                <Image
                  style={styles.image2}
                  source={{
                    uri: photo,
                  }}
                />
              </Neomorph>
            </LinearGradient>
            {selectedItems.slice(firstEl, lastEl).map(item => {
              return (
                <LinearGradient
                  key={item.id}
                  colors={['#FF008A', '#9E00FF']}
                  start={{x: 0.5, y: 0.0}}
                  end={{x: 0.5, y: 1.0}}
                  style={styles.box}>
                  <Neomorph
                    inner
                    lightShadowColor="#1E2126"
                    darkShadowColor="#576178"
                    key={item.id}
                    style={styles.boxShadow}>
                    <Text style={styles.title}>
                      {item.author + item.favIcon}
                    </Text>
                    <TouchableOpacity
                      key={'image' + item.id}
                      onPress={() => {
                        dispatch(favItem(item.id));
                      }}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: item.download_url,
                        }}
                      />
                    </TouchableOpacity>
                  </Neomorph>
                </LinearGradient>
              );
            })}

            <View style={styles.scrollBottom} />
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {data ? content() : <ActivityIndicator color={'red'} />}
      {pageControl()}
    </View>
  );
};

export default Lab4;
