/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  Text,
  useColorScheme,
  View,
  Modal,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Country from './components/Country';
import { fetchCountries } from './slices/countriesSlice';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleCountryPress = async (country) => {
    setSelectedCountry(country);
    setIsModalVisible(true);
    // try {
    //   await AsyncStorage.setItem('selectedCountry', JSON.stringify(country));
    // } catch (error) {
    //   // Error saving data
    //   console.error('AsyncStorage error: ', error.message);
    // }
  };

  // const state = useSelector((state) => state);
  const c = useSelector((state) => state.countries);
  useEffect(async () => {
    setIsLoading(true);
    await dispatch(fetchCountries());
    setIsLoading(false);
    // const getSelectedCountry = async () => {
    //   try {
    //     const savedCountry = await AsyncStorage.getItem('selectedCountry');
    //     if (savedCountry !== null) {
    //       setSelectedCountry(JSON.parse(savedCountry));
    //     }
    //   } catch (error) {
    //     // Error retrieving data
    //     console.error('AsyncStorage error: ', error.message);
    //   }
    // };
    // getSelectedCountry();
  }, []);


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <SafeAreaView style={backgroundStyle}>
      {isLoading ? (
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      ) : (
        <><StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor} /><ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            <Header />
            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => setIsModalVisible(false)}
            >
              <View style={styles.modalView}>
                <Image
                  source={{ uri: selectedCountry?.flag }}
                  style={styles.flagImage}
                  resizeMode="contain" />
                <Text style={styles.modalText}>Country: {selectedCountry?.name}</Text>
                <Text style={styles.modalText}>Code: {selectedCountry?.code}</Text>
                <Text style={styles.modalText}>Capital: {selectedCountry?.capital}</Text>
                <Text style={styles.modalText}>Population: {selectedCountry?.population}</Text>
                <Text style={styles.modalText}>Region: {selectedCountry?.region}</Text>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
              <Section title="Step One">
                Edit <Text style={styles.highlight}>App.tsx</Text> to change this
                screen and then come back to see your edits.
              </Section>
              <Section title="Countries Information">
                <FlatList
                  data={c.countries}
                  keyExtractor={item => item.code}
                  renderItem={({ item }) => <Country item={item} onPress={handleCountryPress} />} />
              </Section>
              <Section title="See Your Changes">
                <ReloadInstructions />
              </Section>
              <Section title="Debug">
                <DebugInstructions />
              </Section>
              <Section title="Learn More">
                Read the docs to discover what to do next:
              </Section>
              <LearnMoreLinks />
            </View>
          </ScrollView></>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  flagImage: {
    width: 300,
    height: 200,
    marginBottom: 20,
    marginHorizontal: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "50%",
  },
  modalView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "white",
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    marginHorizontal: 40,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 40,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
