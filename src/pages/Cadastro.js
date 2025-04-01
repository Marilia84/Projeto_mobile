import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
export default class Cadastro extends Component {
  state = {
    email: "",
    password: "",
  };

  handleCadastro = async () => {
    const { email, password } = this.state;
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }
    const user = {
      email,
      password,
    };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    alert("Usuário cadastrado com sucesso!");
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#9E835C" }}
                >Cadastro</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#9E835C",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "80%",
    backgroundColor: "#F5EFE8",
    color: "#9E835C",
  },
  button: {
    backgroundColor: "#3498db",
    borderRadius: 20,
    padding: 10,
    width: "25%",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});