import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome5'; 

const Favoritos = ({ navigation }) => {
  const [favoritos, setFavoritos] = useState([]);

  // Carregar favoritos salvos no AsyncStorage
  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavoritos(JSON.parse(storedFavorites));
      }
    };
    loadFavorites();
  }, []);

  // Função para remover um favorito
  const handleRemoveFavorite = async (id) => {
    const updatedFavorites = favoritos.filter((item) => item.id !== id);
    setFavoritos(updatedFavorites);  // Atualiza o estado da lista
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));  // Atualiza o AsyncStorage
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#9E835C" }}>
        Meus Favoritos
      </Text>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", marginVertical: 10, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Detalhes", { anime: item })}
              style={{ flexDirection: "row", alignItems: 'center' }}
            >
              <Image
                source={{ uri: item.attributes.posterImage.small }}
                style={{ width: 50, height: 70, marginRight: 10 }}
              />
              <Text>{item.attributes.titles.en || item.attributes.titles.ja_jp}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleRemoveFavorite(item.id)}
              style={{ marginLeft: 'auto', padding: 5 }}
            >
              {/* Ícone de remover */}
              <Icon name="times" size={20} color="#F1774A" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Favoritos;
