import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Svg, { Circle, Line, Text as SvgText, Defs, Marker, Path } from "react-native-svg";

export default function Data() {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/pageRank")
      .then((res) => res.json())
      .then((data) => {
        setRanks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ranks:", err);
        setLoading(false);
      });
  }, []);

  const ranked = [...ranks]
    .sort((a, b) => b.rank - a.rank)
    .map((item, index) => ({
      ...item,
      position: index + 1,
    }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Page Rank Visual</Text>

      {/* SVG Node Graph */}
      <Svg height="300" width="300" style={styles.graphSvg}>
        <Defs>
          <Marker
            id="arrow"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <Path d="M0,0 L0,6 L6,3 Z" fill="black" />
          </Marker>
        </Defs>

        {/* Arrows with markerEnd */}
        <Line x1="150" y1="40" x2="60" y2="200" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" /> {/* A to B */}
        <Line x1="150" y1="40" x2="240" y2="200" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" /> {/* A to C */}
        <Line x1="60" y1="200" x2="240" y2="200" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" /> {/* B to C */}
        <Line x1="60" y1="200" x2="150" y2="40" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" /> {/* B to A */}
        <Line x1="240" y1="200" x2="150" y2="40" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" /> {/* C to A */}

        {/* Nodes */}
        <Circle cx="150" cy="45" r="40" fill="#717378" />
        <SvgText x="150" y="45" fontSize="14" fill="white" textAnchor="middle">A</SvgText>

        <Circle cx="60" cy="200" r="40" fill="#717378" />
        <SvgText x="60" y="205" fontSize="14" fill="white" textAnchor="middle">B</SvgText>

        <Circle cx="240" cy="200" r="40" fill="#717378" />
        <SvgText x="240" y="205" fontSize="14" fill="white" textAnchor="middle">C</SvgText>
      </Svg>

      {/* Rank Table */}
      <Text style={styles.title}>Page Ranks</Text>
      <View style={[styles.row, styles.header]}>
        <Text style={styles.cell}>Page</Text>
        <Text style={styles.cell}>Rank</Text>
        <Text style={styles.cell}>Visibility</Text>
      </View>

      {ranks.map((item, index) => {
        const match = ranked.find((r) => r.page === item.page);
        return (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{item.page}</Text>
            <Text style={styles.cell}>{item.rank.toFixed(4)}</Text>
            <Text style={styles.cell}>{match?.position}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    width: 600,
  },
  header: {
    backgroundColor: "#f0f0f0",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 30,
  },
  graphSvg: {
    marginBottom: 30,
  },
});
