import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { colors } from '../assets/colors/colors';
import { TabBarProvider, useTabBarVisibility } from '../context/TabBarContext';
import HomeNav from './HomeNav';
import PlayersList from '../screens/PlayersList';
import LoadingScreen from '../screens/LoadingScreen';
import GameNav from './GameNav';

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
        } else if (route.name === 'Players List') {
            icon = <FontAwesome5 name="users" size={24} />;
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

  return (
    <Tab.Navigator tabBar={tabBarVisible ? props => <MyTabBar {...props} /> : () => null}>
       <Tab.Screen 
          name="Home" 
          component={HomeNav} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen 
          name="Game Nav" 
          component={GameNav} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen 
          name="Players List" 
          component={PlayersList}
          options={{ headerShown: false}}
        />
      </Tab.Navigator>
  )
}

export default function BottomNav() {

  setTimeout(() => {
    return <LoadingScreen/>
  }, 3000);

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