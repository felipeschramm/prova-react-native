import React from "react";
import { Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const Header:React.FC<{navigation:any}> = ({navigation}) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View>
        <Text
          style={{
            fontSize: 30,
            color: "#707070",
            fontWeight: "bold",
            marginLeft: 4,
          }}
        >
          TGL
        </Text>
        <View
          style={{
            width: 75,
            height: 6,
            backgroundColor: "#B5C401",
            borderRadius: 6,
            marginBottom: 40,
          }}
        />
      </View>
      <Entypo
        name="log-out"
        size={30}
        color="#C1C1C1"
        style={{ marginTop: 4 }}
        onPress={() => {
          navigation.replace("Auth");
        }}
      />
    </View>
  );
};

export default Header;
