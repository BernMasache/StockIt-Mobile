import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Button,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { TextInput } from "react-native-paper";
import DatePicker from "react-native-datepicker";
import { StatusBar } from "expo-status-bar";
import { SelectList } from "react-native-dropdown-select-list";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import UseCollectionStore from "../services/store/collection.store";
import UseDataCalculation from "../services/utilities/formula";
import UseValidation from "../services/utilities/validation";
const collectionsStore = new UseCollectionStore();
const dataCalculation = new UseDataCalculation();
const validations = new UseValidation();
const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

export default function SettingsScreen(props) {
  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selected, setSelected] = useState("");
  const [configurations, setConfigurations] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [collection, setCollection] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [shopShare, setShopShare] = useState("");
  const [expenses, setExpenses] = useState("");
  const [comment, setComment] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    return (
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    );
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };
  const getDateCollected = () => {
    let newDate = new Date(date).toLocaleDateString();

    return date !== "" ? newDate : "";
  };
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

  const getConfigurations = () => {
    collectionsStore
      .getCollectionConfigurations()
      .then((result) => {
        if (result?.data?.length > 0) {
          let configData = [];
          result?.data?.map((config) => {
            configData?.push({
              label: config?.rent?.toString(),
              value: config?.rent?.toString(),
            });
          });

          setConfigurations(configData);
        }
      })
      .catch((e) => {
        return e;
      });
  };

  const collect = () => {
    let inputV = validations.areInputsValid([
      collection,
      shopShare,
      value,
      numberOfDays,
      getDateCollected(),
    ]);
    if (inputV) {
      let payload = {
        grytonShare: dataCalculation.share(
          parseInt(collection),
          parseInt(shopShare),
          dataCalculation.totalRent(parseInt(value), parseInt(numberOfDays)),
          validations.isExpense(expenses) ? parseInt(expenses) : 0
        ),
        expenses: validations.isExpense(expenses) ? parseInt(expenses) : 0,
        dateCollected: getDateCollected(),
        collection: parseInt(collection),
        shopShare: parseInt(shopShare),
        numberOfDays: parseInt(numberOfDays),
        rentPerDay: value,
        rent: dataCalculation.totalRent(
          parseInt(value),
          parseInt(numberOfDays)
        ),
        comment,
      };

      collectionsStore
        .create({ payload, collections })
        .then((res) => {
          console.log(res);
          if (res?.status == 201) {
            Alert.alert("Created successfully");
            setCollection("");
            setShopShare("");
            setNumberOfDays("");
            setExpenses("");
            setValue(null);
            setComment("");
          } else if (res?.status == 200) {
            Alert.alert("Created successfully");
          } else {
            Alert.alert("Failed to submit the collection");
          }

          // console.log(Object.keys(res));
        })
        .catch((e) => {
          // return Alert.alert("Error occured");
        });
    }
  };

  useEffect(() => {
    getConfigurations();
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        height: 100,
        padding: 20,
        marginTop: 50,
        justifyContent: "center",
      }}
    >
      <View style={{ width: "100%", gap: 15 }}>
        <View style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <Text style={styles.text}>Birth Date :</Text> */}
          <TouchableOpacity
            onPress={showDatePicker}
            style={styles.buttonContainer}
            activeOpacity={0.8}
          >
            <Text style={{ color: "white" }}>
              {date == ""
                ? "Select Date Collected here..."
                : "Date Collected : " + getDateCollected()}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <TextInput
          onChangeText={(v) => setCollection(v)}
          value={collection}
          placeholder="Collection"
          keyboardType="numeric"
        />
        <TextInput
          onChangeText={(v) => setNumberOfDays(v)}
          value={numberOfDays}
          name="numberOfDays"
          placeholder="Number of days"
          keyboardType="numeric"
        />

        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#dbf0f9",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ width: "30%" }}>Rent per day :</Text>
          <TouchableOpacity style={{ width: "70%" }}>
            <Dropdown
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={configurations}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select rental rate" : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          onChangeText={(v) => setShopShare(v)}
          value={shopShare}
          placeholder="Shop share"
          keyboardType="numeric"
        />
        <TextInput
          onChangeText={(v) => setExpenses(v)}
          value={expenses}
          name="expenses"
          placeholder="Expenses"
          keyboardType="numeric"
        />
        <TextInput
          onChangeText={(v) => setComment(v)}
          value={comment}
          placeholder="Comment"
        />

        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "end",
            justifyContent: "space-between",
          }}
        >
          <View />
          <Button title="Collect" onPress={collect} color="#5579c6" />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#5579c6",
    padding: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1,

    padding: 10,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#A8E9CA",
  },

  title: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },

  datePickerStyle: {
    width: 230,
  },

  text: {
    textAlign: "left",

    width: 230,

    fontSize: 16,

    color: "#000",
  },
});
