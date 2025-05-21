import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { StyleSheet } from "react-native";
export default function Data() {
    const[ranks, setRanks] = useState([]);
    const[loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch("http://localhost:8080/api/pageRank") //ip address
            .then((res) => res.json())
            .then((data) => {
                setRanks(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("error loading data: ", err);
                setLoading(false);
            });
        }, []);
        if(loading) {
            return <ActivityIndicator style = {{marginTop: 100}}/>
        }
        return(
            <View style = {styles.container}>
                <Text style = {styles.title}>Page Ranks</Text>

                {/*styles for header*/}
                <View style = {[styles.row, styles.header]}>
                    <Text style = {styles.cell}>Page</Text>
                    <Text style = {styles.cell}>Rank</Text>
                </View>

                {/*Styles for Rows*/}
                {ranks.map((item, index) => (
                    <View key = {index} style = {styles.row}>
                        <Text style = {styles.cell}>{item.page}</Text>
                        <Text style = {styles.cell}>{item.rank.toFixed(3)}</Text> 
                    </View>
                ))}
            </View>
        );
    }

    //styles for table that contains rank data
    const styles = StyleSheet.create({
        container: {
            padding: 20,
        },
        title: {
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 16,
            textAlign: "center",
        },
        row: {
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: "#ccc",
            paddingVertical: 8,
        },
        header: {
            backgroundColor: "#f0f0f0",
        },
        cell: {
            flex: 1,
            textAlign: "center",
            fontSize: 16,
        },
    })