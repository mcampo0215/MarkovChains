import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
export default function secondPage() {
    return (
        <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
            <Text>This is the page B</Text>

            <Link style = {{color: "blue"}} href = "/thirdPage">Go to page C</Link>
            <Link style = {{color: "blue"}} href = "/firstPage">Go to page A</Link>
            <Pressable onPress = {() => router.navigate('/thirdPage')}></Pressable>
        </View>
    )
}