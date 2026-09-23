import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

const images = [
  require("../assets/images/laundry-theme-illustration-people-at-public-launderette.jpg"),
  require("../assets/images/laundry-service-online-on-laptop-screen-laundromat-home-appliance-housekeeping-concept-washing-machines-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg"),
  {
    uri: "https://static.vecteezy.com/system/resources/previews/000/128/923/non_2x/free-laundry-vector.png",
  },
  {
    uri: "https://st2.depositphotos.com/26922084/43809/v/600/depositphotos_438090202-stock-illustration-female-maid-help-man-to.jpg",
  },
  {
    uri: "https://st4.depositphotos.com/2885805/41210/v/450/depositphotos_412105696-stock-illustration-dry-cleaning-service-composition.jpg",
  },
];

export default function Carousel() {
  const { width } = useWindowDimensions();
  const scroll = useRef(null);
  const activeIndex = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    scroll.current?.scrollTo({
      x: activeIndex.current * width,
      animated: false,
    });
    const timer = setInterval(() => {
      const next = (activeIndex.current + 1) % images.length;
      activeIndex.current = next;
      scroll.current?.scrollTo({ x: next * width, animated: true });
      setActive(next);
    }, 3000);
    return () => clearInterval(timer);
  }, [width]);

  return (
    <View>
      <ScrollView
        ref={scroll}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={({ nativeEvent }) => {
          const index = Math.round(nativeEvent.contentOffset.x / width);
          activeIndex.current = index;
          setActive(index);
        }}
      >
        {images.map((source, index) => (
          <View key={index} style={{ width, alignItems: "center" }}>
            <Image
              source={source}
              style={[styles.image, { width: width * 0.94 }]}
              accessibilityLabel={`Laundry service ${index + 1}`}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.dots}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, active === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: { height: 200, borderRadius: 6, resizeMode: "cover" },
  dots: { flexDirection: "row", justifyContent: "center", gap: 6, padding: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#90A4AE" },
  activeDot: { backgroundColor: "#13274F" },
});
