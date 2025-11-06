import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// --- Telas de Login ---
import LoginScreen from '../app/componentsLogin/LoginScreen';
import ChangePasswordScreen from '../app/componentsLogin/changePasswordScreen';

// --- Telas do Aluno ---
import HomeScreenAluno from '../app/screensAluno/HomeScreen';
import ScannerScreen from '../app/screensAluno/ScannerScreen';
import DisciplinesScreen from '../app/screensAluno/DisciplinesScreen';
import DisciplineDetailScreen from '../app/screensAluno/DisciplineDetailScreen';
import NotificationsScreenAluno from '../app/screensAluno/NotificationsScreen';
import ProfileScreenAluno from '../app/screensAluno/ProfileScreen';

// --- Telas do Professor ---
import HomeTeacherScreen from '../app/screensProfessor/HomeScreen';
import NotificationsScreenProf from '../app/screensProfessor/NotificationsScreen';
import CalendarScreen from '../app/screensProfessor/CalendarScreen';
import ProfileScreenProf from '../app/screensProfessor/ProfileScreen';
import ClassesScreen from '../app/screensProfessor/ClassesScreen';
import QRCodeScreen from '../app/screensProfessor/QRCodeScreen';
import EndCallScreen from '../app/screensProfessor/EndCallScreen';
import EditCallScreen from '../app/screensProfessor/EditCallScreen';

// --- Navegadores ---
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* ===========================
   NAVEGAÇÃO ALUNO
=========================== */
function TabsAluno() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarIcon: ({ focused }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            AlunoHome: focused ? 'home' : 'home-outline',
            AlunoNotifications: focused ? 'notifications' : 'notifications-outline',
            AlunoScanner: focused ? 'qr-code' : 'qr-code-outline',
            AlunoDisciplines: focused ? 'pulse' : 'pulse-outline',
          };

          const iconName = icons[route.name] || 'help-circle-outline';

          return (
            <Ionicons
              name={iconName}
              size={27}
              color={focused ? '#A78BFA' : '#B8B8B8'}
            />
          );
        },
      })}
    >
      <Tab.Screen name="AlunoHome" component={HomeScreenAluno} />
      <Tab.Screen name="AlunoNotifications" component={NotificationsScreenAluno} />
      <Tab.Screen name="AlunoScanner" component={ScannerScreen} />
      <Tab.Screen name="AlunoDisciplines" component={DisciplinesScreen} />
    </Tab.Navigator>
  );
}

/* ===========================
   NAVEGAÇÃO PROFESSOR
=========================== */
function TabsProfessor() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarIcon: ({ focused }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            ProfHome: focused ? 'home' : 'home-outline',
            ProfNotifications: focused ? 'notifications' : 'notifications-outline',
            ProfCalendar: focused ? 'calendar' : 'calendar-outline',
          };

          const iconName = icons[route.name] || 'help-circle-outline';

          return (
            <Ionicons
              name={iconName}
              size={27}
              color={focused ? '#A78BFA' : '#B8B8B8'}
            />
          );
        },
      })}
    >
      <Tab.Screen name="ProfHome" component={HomeTeacherScreen} />
      <Tab.Screen name="ProfNotifications" component={NotificationsScreenProf} />
      <Tab.Screen name="ProfCalendar" component={CalendarScreen} />
    </Tab.Navigator>
  );
}

/* ===========================
   APP PRINCIPAL
=========================== */
export default function App() {
  return (
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* Login */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />

        {/* Aluno */}
        <Stack.Screen name="AlunoTabs" component={TabsAluno} />
        <Stack.Screen name="ProfileAluno" component={ProfileScreenAluno} />
        <Stack.Screen name="DisciplineDetail" component={DisciplineDetailScreen} />

        {/* Professor */}
        <Stack.Screen name="ProfessorTabs" component={TabsProfessor} />
        <Stack.Screen name="ProfileProf" component={ProfileScreenProf} />
        <Stack.Screen name="Classes" component={ClassesScreen} />
        <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} />
        <Stack.Screen name="EndCallScreen" component={EndCallScreen} />
        <Stack.Screen name="EditCallScreen" component={EditCallScreen} />
      </Stack.Navigator>
  );
}
