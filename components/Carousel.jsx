import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

export default function Carousel() {
  const images = [
    require("../assets/images/laundry-theme-illustration-people-at-public-launderette.jpg"),
    require("../assets/images/laundry-service-online-on-laptop-screen-laundromat-home-appliance-housekeeping-concept-washing-machines-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg"),
    "https://static.vecteezy.com/system/resources/previews/000/128/923/non_2x/free-laundry-vector.png",
    "https://st2.depositphotos.com/26922084/43809/v/600/depositphotos_438090202-stock-illustration-female-maid-help-man-to.jpg",
    "https://st4.depositphotos.com/2885805/41210/v/450/depositphotos_412105696-stock-illustration-dry-cleaning-service-composition.jpg",
  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        autoplayInterval={3000}
        dotColor={"#13274F"}
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
          borderRadius: 6,
          width: "94%",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
