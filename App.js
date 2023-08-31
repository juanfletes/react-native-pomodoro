import { Platform, Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from 'expo-av';

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];
const defaultTimes = [25, 5, 15];

export default function App() {
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);
  
  useEffect(()=>{
    let interval = null;
    
    if(isActive){
      interval = setInterval(()=> {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if(time===0){
      setIsActive(false);
      setTime(defaultTimes[currentTime] * 60)
    }

    return () => clearInterval(interval);
    
  }, [isActive, time]);

  function handleStartStop(){
    playSound();
    setIsActive(!isActive);
  }

  async function playSound(){
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/click.wav')
    )
    await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors[currentTime] }]}>
      <View style={{ flex: 1,
                     paddingHorizontal:15,
                     paddingTop: Platform.OS == 'android' && 30
                  }}>
        <Text style={styles.text} >Pomodoro</Text>
        <Header 
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
          defaultTimes={defaultTimes}/>
        <Timer time={time}/>
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{ color: 'white', fontWeight: 'bold' }} >
            { isActive ? 'STOP' : 'START' }
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 32
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
});
