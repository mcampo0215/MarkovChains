import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
export default function thirdPage() {
    return (
    <View
    style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Text>This is the page C</Text>

        <Link style = {{color: "blue"}} href = "/FirstPage">Go to the page A</Link>
        <Pressable onPress = {() => router.navigate('/FirstPage')}></Pressable>
    </View>
    )
}