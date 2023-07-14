import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";

const Carousel: React.FC = () => {
  const images = [
    'https://media.istockphoto.com/id/853749314/vector/laundry-room-interior-with-washing-machine.jpg?s=612x612&w=0&k=20&c=niKXh3SB942z3miB0MQEwLWz5AelyuAVD7InHb68Jr0=',
    'https://static.vecteezy.com/system/resources/previews/000/128/923/non_2x/free-laundry-vector.png',
    'https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT44-nASXu5yRfjJSiYGupipV4z-hwnxy1rMnKPGf-Q5b0n7J6e8j6ffwBDqGnz12JcdkQ',
  ];

  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor="#13274F"
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
          borderRadius: 6,
          width: '94%',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Carousel;