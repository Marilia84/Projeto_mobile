import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-web";

const Detalhes = ({ route, navigation }) => {
  const { anime } = route.params;
  const [favorites, setFavorites] = useState([]);

  
  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    };
    loadFavorites();
  }, []);

  
  const isFavorite = favorites.some((fav) => fav.id === anime.id);

  const handleFavoriteToggle = async () => {
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.id !== anime.id);
    } else {
      updatedFavorites = [...favorites, anime];
    }

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 , color: "#9E835C", textAlign: 'center'}}>
              Detalhes</Text>
      <Image
        source={{ uri: anime.attributes.posterImage.large }}
        style={{ width: 200, height: 300, alignSelf: "center", marginBottom: 20 }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", width: "60%",height: "60%", textAlign: "center", color: "#9E835C" }}>
        {anime.attributes.titles.en || anime.attributes.titles.ja_jp}
      </Text>
      <Text style={{ marginVertical: 10 }}>
        {anime.attributes.synopsis || "Sem sinopse disponível."}
      </Text>

      
      <TouchableOpacity onPress={handleFavoriteToggle}>
        <Icon
          name={isFavorite ? "heart" : "heart"}
          size={30}
          color={isFavorite ? "red" : "gray"}
        />
      </TouchableOpacity>
    </View>

  );
};

export default Detalhes;
