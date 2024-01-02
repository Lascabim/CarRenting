import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity} from 'react-native';

const menu = require("./assets/icons/menuu.png");
const face = require('./assets/face.png');
const magnifying_glass = require('./assets/icons/magnifying-glass.png');

const image_v_1 = require('./assets/vehicles/v-1.png');
const image_v_2 = require('./assets/vehicles/v-2.png');
const image_v_3 = require('./assets/vehicles/v-3.png');
const image_v_4 = require('./assets/vehicles/v-4.png');

import data from "./dataset/vehicles.json";

const HomeScreen = ({ navigation }) => {
  const [ vehicles, setVehicles] = useState(data.vehicles);
  const [ filteredVehicles, setFilteredVehicles] = useState(data.vehicles);

  const getImage = (id) => {
    if(id == 1) return image_v_1;
    if(id == 2) return image_v_2;
    if(id == 3) return image_v_3;
    if(id == 4) return image_v_4;
  };

  const searchVehicles = (keyword) => {
    const lowercaseKeyword = keyword.toLowerCase();

    const results = vehicles.filter(vehicle => {
      return vehicle.make.toLowerCase().includes(lowercaseKeyword)
    })
    
    setFilteredVehicles(results);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Image source={menu} resizeMode="contain" style={styles.menuIconStyle}/>
          <Image source={face} resizeMode="contain" style={styles.faceIconStyle}/>
        </View>
        
        <View style={styles.titleSection}>
          <Text style={styles.title}>Rent a Car</Text>
        </View>
        
        <View style={styles.searchSection}>
          <View style={styles.searchPallet}>
            <TextInput 
              style={styles.searchInput}
              placeholder='Search a Car'
              onChangeText={(text) => searchVehicles(text)}
            />

            <View style={styles.searchIconArea}>
              <Image 
                source={magnifying_glass} 
                resizeMode='contain'
                style={styles.magnifyingIconStyle}
              />
            </View>
          </View>
        </View>
        
        <View style={styles.typesSection}>
          <Text style={styles.typesTextActive}>All</Text>
          <Text style={styles.typesText}>Suv</Text>
          <Text style={styles.typesText}>Sedans</Text>
          <Text style={styles.typesText}>Mpv</Text>
          <Text style={styles.typesText}>Hatchback</Text>
        </View>
        
        <View style={styles.listSection}>
          <Text style={styles.headText}>Most Rented</Text>

          <ScrollView style={styles.elementPallet}>
            {
              filteredVehicles.map(vehicle => {
                return (
                  <TouchableOpacity 
                    style={styles.element} 
                    key={vehicle.id} 
                    activeOpacity={0.8} 
                    onPress={() => navigation.navigate('Info', { id: vehicle.id })}
                  >
                    <View style={styles.infoArea}>
                      <Text style={styles.infoTitle}>{vehicle.make} {vehicle.model}</Text>
                      <Text style={styles.infoSub}>{vehicle.type}-{vehicle.transmission}</Text>
                      <Text style={styles.infoPrice}>
                        <Text style={styles.infoAmount}>{vehicle.price_per_day}€</Text>/day
                      </Text>
                    </View>
                    
                    <View style={styles.imageArea}>
                      <Image source={getImage(vehicle.id)} resizeMode="contain" style={styles.vehicleImage}/>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea:{
    flex: 1,
    backgroundColor: '#e7e7e7',  
    paddingTop: 25,
  },
  container: {
    flex: 1,
    paddingLeft: 35,
    paddingRight: 35,
  },
  headerSection: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuIconStyle: {
    width: 30,
  },  
  faceIconStyle: {
    width: 40,
  },
  titleSection: {
    marginTop: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  searchSection: {
    marginTop: 15,
    justifyContent: 'center',
  },
  searchPallet: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    borderRadius: 8,
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  searchInput: {
    width: '91%',
    height: 40,
  },
  searchIconArea: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  magnifyingIconStyle: {
    width: 24,
    height: 24,
    marginRight: 0,
  },

  typesSection: {
    marginTop: 15,
    flexDirection: 'row',
  },
  typesTextActive: {
    fontSize: 15,
    marginRight: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  typesText: {
    fontSize: 15,
    marginRight: 33,
    fontWeight: '500',
    color: '#696969',  
  },

  listSection: {
    marginTop: 25,
  },
  headText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  elementPallet: {
    width: '100%',
    height: 435,
  },
  element: {
    height: 100,
    padding: 13,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoArea: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSub: {
    fontSize: 12,
    fontWeight: '600',
    color: '#696969',
  },
  infoPrice: {
    position: 'absolute',
    bottom: 0,
    fontSize: 10,
    color: '#696969',
    fontWeight: 'bold',
  },
  infoAmount: {
    fontSize: 12,
    color: 'black',
    fontWeight: '600',
  },
  imageArea: {
    flex: 1,
  },
  vehicleImage: {
    position: 'absolute',
    top: -5,
    left: -15,
    width: '120%',
    height: '120%', 
  },
})