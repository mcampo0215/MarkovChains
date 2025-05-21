import { Link } from "expo-router";
import {Links} from "./Links"
import { Pressable, Text, View, Button} from "react-native";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function FirstPage() {
   const router = useRouter();
    return(
        <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Text>This is the page A</Text>
            <Link style = {{color: "blue"}} href = "/secondPage">Go to page B</Link>
            <Link style = {{color: "blue"}} href = "/thirdPage">Go to page C</Link>
            {/*<Link style = {{color: "blue"}} href = "/Data">Go to page rank</Link>*/}
            <Pressable style = {styles.button}title = "Go to page rank" onPress = {() => router.navigate("/customPageRank")}>
                <Text style = {styles.text}>Go to page rank</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#333",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderColor: "#000",
        borderWidth: 1,
        marginTop: 60
    },
    text: {
        color: "white",
        fontWeight: "bold",
    },
})