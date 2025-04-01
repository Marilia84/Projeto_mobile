import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchAnime } from '../service/api';
import  AsyncStorage from '@react-native-async-storage/async-storage';


const Main = ({ }) => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [favoritos, setFavoritos] = useState([]); 
    const navigation = useNavigation();

    const handleSearch = async () => {
        if (search.trim() !== '') {
            const data = await fetchAnime(search);
            setResults(data);
        } else {
            setResults([]); 
        }
    };
    useEffect(() => {
        handleSearch();
    }, [search]);
    useEffect(() => {
        const loadFavorites = async () => {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites) {
                setFavoritos(JSON.parse(storedFavorites));
            }
        };
        loadFavorites();
    }, []);

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: 'center', color: "#9E835C"}}>
                    Buscar Anime</Text>
            <TextInput 
                placeholder="Buscar anime..."
                value={search}
                onChangeText={setSearch}
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 , backgroundColor:  '#F5EFE8', borderRadius: 10, color: "#9E835C"}}
            />
            
                <Button title="Ver Favoritos" onPress={() => navigation.navigate("Favoritos", { favoritos })} />

            <FlatList 
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate("Detalhes", { anime: item })}
                        style={{ flexDirection: 'row', marginVertical: 10 }}
                    >
                        <Image source={{ uri: item.attributes.posterImage.small }} style={{ width: 50, height: 70, marginRight: 10 }} />
                        <Text>{item.attributes.titles.en || item.attributes.titles.ja_jp}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default Main;