import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import UseCollectionStore from "../services/store/collection.store";
import { DataTable } from "react-native-paper";
const collectionsStore = new UseCollectionStore();

export default function HomeScreen(props) {
  const [collections, setCollections] = useState([]);
  const loadCollections = () => {
    collectionsStore
      .getCollections()
      .then((res) => {
        // console.log(res.data);
        setCollections(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    loadCollections();
  }, [props]);
  const changeBackground = (event) => {
    console.log(event?.selfBaseDuration);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        height: 100,
        padding: 20,
        justifyContent: "center",
        marginTop: 50,
      }}
    >
      <DataTable>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={styles.text}>Date</DataTable.Title>
          <DataTable.Title style={styles.text}>Amount</DataTable.Title>
          <DataTable.Title style={styles.text}>Days</DataTable.Title>
          <DataTable.Title style={styles.text}>Rent/Day</DataTable.Title>
          <DataTable.Title style={styles.text}>Total Rent</DataTable.Title>
        </DataTable.Header>
        {collections?.map((collection, key) => {
          return key % 2 == 0 ? (
            <DataTable.Row key={collection?.id} onPress={changeBackground}>
              <DataTable.Cell>
                {JSON.parse(collection?.dateCollected)?.split("-")[2]}/
                {JSON.parse(collection?.dateCollected)?.split("-")[1]}/
                {JSON.parse(collection?.dateCollected)
                  ?.split("-")[0]
                  ?.slice(2, 4)}
              </DataTable.Cell>
              <DataTable.Cell>{collection?.collection}</DataTable.Cell>
              <DataTable.Cell>{collection?.numberOfDays}</DataTable.Cell>
              <DataTable.Cell>{collection?.rentPerDay}</DataTable.Cell>
              <DataTable.Cell>{collection?.rent}</DataTable.Cell>
            </DataTable.Row>
          ) : (
            <DataTable.Row
              style={styles.container}
              key={collection?.id}
              onPress={changeBackground}
            >
              <DataTable.Cell>
                {JSON.parse(collection?.dateCollected)?.split("-")[2]}/
                {JSON.parse(collection?.dateCollected)?.split("-")[1]}/
                {JSON.parse(collection?.dateCollected)
                  ?.split("-")[0]
                  ?.slice(2, 4)}
              </DataTable.Cell>
              <DataTable.Cell>{collection?.collection}</DataTable.Cell>
              <DataTable.Cell>{collection?.numberOfDays}</DataTable.Cell>
              <DataTable.Cell>{collection?.rentPerDay}</DataTable.Cell>
              <DataTable.Cell>{collection?.rent}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#f0e9f0",
  },
  tableHeader: {
    backgroundColor: "#DCDCDC",
    padding: 5,
  },
  text: {
    fontWeight: "bold",
  },
});
