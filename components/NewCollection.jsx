import React, { useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { TextInput } from "react-native-paper";
import DatePicker from "react-native-datepicker";
import { StatusBar } from "expo-status-bar";
import { SelectList } from "react-native-dropdown-select-list";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

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
export default function SettingsScreen() {
  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [selected, setSelected] = React.useState("");
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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
  const getDateOfBirth = () => {
    let newDate = new Date(date).toLocaleDateString();

    return date !== "" ? newDate : "";
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  return (
    <View
      style={{
        flexDirection: "row",
        height: 100,
        padding: 20,
        marginTop: 30,
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
            <Text>
              {date == ""
                ? "Select Date of Birth"
                : "Date Collected : " + getDateOfBirth()}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <TextInput placeholder="Date collected" keyboardType="numeric" />
        <TextInput placeholder="Collection" keyboardType="numeric" />
        <View
          style={{
            width: "100%",
          }}
        >
          <View >
            <Text style={[styles.label, isFocus && { color: "blue" }]}>
              Rent per day
            </Text>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select rental rate" : "..."}
              searchPlaceholder="Search..."
              value={value}
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
              // renderLeftIcon={() => (
              //   <AntDesign
              //     style={styles.icon}
              //     color={isFocus ? "blue" : "black"}
              //     name="Safety"
              //     size={20}
              //   />
              // )}
            />
          </View>
        </View>
        <TextInput placeholder="Shop share" keyboardType="numeric" />
        <TextInput placeholder="Expenses" keyboardType="numeric" />
        <TextInput placeholder="Comment" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
