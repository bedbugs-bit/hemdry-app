import React, { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { format, isSameDay } from "date-fns";
import { getPickupDates } from "../pickupDates";

export default function PickupDatePicker({ selectedDate, onSelect }) {
  const today = format(new Date(), "yyyy-MM-dd");
  const dates = useMemo(
    () => getPickupDates(new Date(`${today}T00:00:00`)),
    [today],
  );

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {dates.map((date) => {
        const selected = Boolean(selectedDate && isSameDay(date, selectedDate));
        return (
          <Pressable
            key={date.toISOString()}
            accessibilityRole="button"
            accessibilityLabel={format(date, "EEEE, d MMMM yyyy")}
            accessibilityState={{ selected }}
            onPress={() => onSelect(date)}
            style={[styles.date, selected && styles.selected]}
          >
            <Text style={selected && styles.selectedText}>
              {format(date, "EEE")}
            </Text>
            <Text style={selected && styles.selectedText}>
              {format(date, "dd MMM")}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  date: {
    margin: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    alignItems: "center",
  },
  selected: { backgroundColor: "#222831" },
  selectedText: { color: "white" },
});
