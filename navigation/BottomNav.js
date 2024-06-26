import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { colors } from '../assets/colors/colors';
import { TabBarProvider, useTabBarVisibility } from '../context/TabBarContext';
import HomeNav from './HomeNav';
import GameNav from './GameNav';
import MatchNav from './MatchNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../screens/LoadingScreen';

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarWrapper}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let icon;

        if (route.name === 'Home') {
            icon = <MaterialIcons name="leaderboard" size={24} />;
        } else if (route.name === 'Game Nav') {
            icon = <AntDesign name="plus" size={24} />;
        } else if (route.name === 'Match Nav') {
            icon = <Entypo name="list" size={24} />;
        }
        return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabBtnStyles]}
            >
              <View style={[{backgroundColor: isFocused ? colors.bgColorSec: null}, styles.tabItemWrapper]}>
                  <Text style={[{color: isFocused ? colors.textColorSec : colors.textColorPri}]}>{icon} </Text>
              </View>
            </TouchableOpacity>
          );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

const TabNav = () => {
  
  const { tabBarVisible } = useTabBarVisibility();

  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)

  const getUserData = async () => {
    try {
      let res = await AsyncStorage.getItem('userdata');
      let userdata = JSON.parse(res);
      setUserData(userdata);
    } catch (error) {
      console.error('error at BottomNav.js -> getUserData: ', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    getUserData();
  }, [])

  if(loading){
    return <LoadingScreen/>
  }

  return (
    <Tab.Navigator tabBar={tabBarVisible ? props => <MyTabBar {...props} /> : () => null}>
       <Tab.Screen 
          name="Home" 
          component={HomeNav} 
          options={{ headerShown: false }} 
        />
        {userData.usertype !== 'guest' && (
        <Tab.Screen 
          name="Game Nav" 
          component={GameNav} 
          options={{ headerShown: false }} 
        />
        ) }
        <Tab.Screen 
          name="Match Nav" 
          component={MatchNav}
          options={{ headerShown: false}}
        />
      </Tab.Navigator>
  )
}

export default function BottomNav() {
  return (
    <TabBarProvider>
      <TabNav/>
    </TabBarProvider>
  );
}

const styles = StyleSheet.create({
    tabBarWrapper: { 
        flexDirection: 'row', 
        backgroundColor: colors.bgColorTer, 
    },
    tabItemWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
    },
    tabItemText: {
        textTransform: 'capitalize',
        fontSize: 10,
    }, 
    tabBtnStyles: { 
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
        height: 60, 
    },
      
})