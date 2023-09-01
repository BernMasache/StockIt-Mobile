import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
  ToastAndroid,
} from "react-native";
import UseCollectionStore from "../services/store/collection.store";
import { DataTable } from "react-native-paper";
const collectionsStore = new UseCollectionStore();

export default function HomeScreen(props) {
  const [collections, setCollections] = useState([]);

  const loadCollections = () => {
    collectionsStore
      .getCollections()
      .then((res) => {
        setCollections(res?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    loadCollections();
  }, []);

  const deleteCollection = (data) => {
    {
      Alert.alert(
        (title = "Delete"),
        (message = `Remove K${data?.collection} collected on ${data.dateCollected}`),
        [
          {
            text: "No",
            onPress: () => ToastAndroid.show("Cancelled", ToastAndroid.LONG),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () =>
              ToastAndroid.show(
                `Removed K${data?.collection} which was collected on ${data.dateCollected}`,
                ToastAndroid.LONG
              ),
          },
        ]
      );
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        height: 100,
        padding: 5,
        justifyContent: "center",
        marginTop: 50,
      }}
    >
      {collections[0]?.collections?.length > 0 ? (
        <DataTable>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title>
              <Text style={styles.text}>Date</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.text}>Amount</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.text}>Days</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.text}>Rent/Day</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={styles.text}>Total Rent</Text>
            </DataTable.Title>
          </DataTable.Header>
          {collections[0]?.collections?.map((collection, key) => {
            return key % 2 == 0 ? (
              <TouchableOpacity
                key={key}
                onLongPress={() => deleteCollection(collection)}
                style={{ marginBottom: 10, marginTop: 10 }}
              >
                <DataTable.Row>
                  <DataTable.Cell>
                    {collection?.dateCollected?.split("/")[0]}-
                    {collection?.dateCollected?.split("/")[1]}-
                    {collection?.dateCollected?.split("/")[2]?.slice(2, 4)}
                  </DataTable.Cell>
                  <DataTable.Cell>MK{collection?.collection}</DataTable.Cell>
                  <DataTable.Cell>{collection?.numberOfDays}</DataTable.Cell>
                  <DataTable.Cell>{collection?.rentPerDay}</DataTable.Cell>
                  <DataTable.Cell>{collection?.rent}</DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={key}
                onLongPress={() => deleteCollection(collection)}
              >
                <DataTable.Row style={styles.container}>
                  <DataTable.Cell>
                    {collection?.dateCollected?.split("/")[0]}-
                    {collection?.dateCollected?.split("/")[1]}-
                    {collection?.dateCollected?.split("/")[2]?.slice(2, 4)}
                  </DataTable.Cell>
                  <DataTable.Cell>MK{collection?.collection}</DataTable.Cell>
                  <DataTable.Cell>{collection?.numberOfDays}</DataTable.Cell>
                  <DataTable.Cell>{collection?.rentPerDay}</DataTable.Cell>
                  <DataTable.Cell>{collection?.rent}</DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            );
          })}
        </DataTable>
      ) : (
        <Text style={styles.textColor}>No collections made yet.</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d8e3ec",
  },

  tableHeader: {
    backgroundColor: "#5579c6",
    padding: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#f0edf6",
  },
  textColor: {
    color: "#5579c6",
  },
});
