import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"]


export default function Header({currentTime, setCurrentTime, setTime, defaultTimes}) {

    function handlePress(index){
        setCurrentTime(index);
        setTime(defaultTimes[index] * 60);
    }

    return(
        <View style={{flexDirection: 'row'}}>
            {options.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.itemStyle, currentTime != index && { borderColor: 'transparent'}]}
                    onPress={()=> handlePress(index)}
                >
                    <Text style={{fontWeight: 'bold' }}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    itemStyle: {
        width: '33%',
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        padding: 5,
        marginVertical: 20,
    }
})