import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';
import GradientInput from '../components/GradientInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';

const Register = ({ navigation }) => {
  // Estados
  const [user, setUser ] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [location, setLocation] = useState('');
  const [theme, setTheme] = useState('YellowTheme');
  const [currentScreen, setCurrentScreen] = useState('first'); 
  const [profilePicture, setProfilePicture] = useState(null); // State para a foto de perfil

  // Cores dos temas
  const themeColors = {
    YellowTheme: '#BDB150',
    BlueTheme: '#40AEBD',
    PinkTheme: '#CF4A8E',
  };

  const darkThemeColors = {
    YellowTheme: '#807523',
    BlueTheme: '#037180',
    PinkTheme: '#A3155F',
  };

  const placeholderColors = {
    YellowTheme: '#BDB150',
    BlueTheme: '#40AEBD',
    PinkTheme: '#CF4A8E',
  };

  // Funções de manipulação
  const handleNext = () => {
    switch (currentScreen) {
      case 'first':
        setCurrentScreen('second');
        break;
      case 'second':
        setCurrentScreen('third');
        break;
      case 'third':
        console.log('Registrar com:', { fullName, phone, birthDate, location });
        navigation.navigate('Landing');
        break;
      default:
        setCurrentScreen('first');
    }
  };

  const handleBack = () => {
    switch (currentScreen) {
      case 'second':
        setCurrentScreen('first');
        break;
      case 'third':
        setCurrentScreen('second');
        break;
      default:
        setCurrentScreen('first');
    }
  };

  const handleChooseImage = () => {
    // Função para escolher imagem
  };

  // Renderização da tela
  const renderScreen = () => {
    switch (currentScreen) {
      case 'first':
        return (
          <>
            <GradientInput
              placeholder="Nome de Usuário"
              value={user}
              onChangeText={(event) => setUser(event)}
              secureTextEntry={false}
              placeholderColor={placeholderColors[theme]}
            />
            <GradientInput
              placeholder="E-mail"
              value={email}
              onChangeText={(event) => setEmail(event)}
              secureTextEntry={false}
              placeholderColor={placeholderColors[theme]}
            />
            <GradientInput
              placeholder="Senha"
              value={password}
              onChangeText={(event) => setPassword(event)}
              secureTextEntry={true}
              placeholderColor={placeholderColors[theme]}
            />
            <GradientInput
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChangeText={(event) => setConfirmPassword(event)}
              secureTextEntry={true}
              placeholderColor={placeholderColors[theme]}
            />
            <View style={styles.themeContainer}>
              <Text style={styles.label}>Tema:</Text>
              <View style={styles.radioGroup}>
                <RadioButton
                  value="YellowTheme"
                  status={theme === 'YellowTheme' ? 'checked' : 'unchecked'}
                  onPress={() => setTheme('YellowTheme')}
                  color={themeColors.YellowTheme}
                />
                <Text style={[styles.radioLabel, { color: theme === 'YellowTheme' ? themeColors.YellowTheme : '#000' }]}>
                  Amarelo
                </Text>

                <RadioButton
                  value="BlueTheme"
                  status={theme === 'BlueTheme' ? 'checked' : 'unchecked'}
                  onPress={() => setTheme('BlueTheme')}
                  color={themeColors.BlueTheme}
                />
                <Text style={[styles.radioLabel, { color: theme === 'BlueTheme' ? themeColors.BlueTheme : '#000' }]}>
                  Azul
                </Text>

                <RadioButton
                  value="PinkTheme"
                  status={theme === 'PinkTheme ' ? 'checked' : 'unchecked'}
                  onPress={() => setTheme('PinkTheme')}
                  color={themeColors.PinkTheme}
                />
                <Text style={[styles.radioLabel, { color: theme === 'PinkTheme' ? themeColors.PinkTheme : '#000' }]}>
                  Rosa
                </Text>
              </View>
            </View>
          </>
        );
      case 'second':
        return (
          <>
            <GradientInput
              placeholder="Nome Completo"
              value={fullName}
              onChangeText={(event) => setFullName(event)}
              secureTextEntry={false}
              placeholderColor={placeholderColors[theme]}
            />
            <GradientInput
              placeholder="Telefone"
              value={phone}
              onChangeText={(event) => setPhone(event)}
              secureTextEntry={false}
              placeholderColor={placeholderColors[theme]}
            />
            <GradientInput
              placeholder="Data de Nascimento"
              value={birthDate}
              onChangeText={(event) => setBirthDate(event)}
              secureTextEntry={false}
              placeholderColor={placeholderColors[theme]}
            />
            <GradientInput
              placeholder="Localização"
              value={location}
              onChangeText={(event) => setLocation(event)}
              secureTextEntry={false}
              placeholderColor={placeholderColors[theme]}
            />
          </>
        );
      case 'third':
        return (
          <>
            <TouchableOpacity style={[styles.userImageContainer, { backgroundColor: '#CFCFCF', borderColor: '#808080'}]} onPress={handleChooseImage}>
              <Image source={require('../assets/default_user.png')} style={styles.defaultUserImage} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cameraContainer, { borderColor: themeColors[theme]}]}>
              <Icon name="camera" size={30} style={[styles.camera, { color: themeColors[theme]}]} />
            </TouchableOpacity>
          </>
        );
      default:
        return null;
    }
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    const userObj = {
      nomeCompleto: fullName,
      nomeDeUsuario: user,
      email: email,
      senha: password,
      telefone: phone,
      estado: location,
      dataNascimentoUsuario: birthDate,
      tema: theme,
      isAdmin: false, // Defina como necessário
      linkFotoPerfil: '', // Adicione a lógica para obter o link da foto
    };

    fetch('https://conectamaes-api.glitch.me/insertUser ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userObj),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.error) {
          alert('Erro ao registrar usuário: ' + json.error);
        } else {
          navigation.navigate('Login');
        }
      })
      .catch(err => {
        console.log(err);
        alert('Erro ao conectar com o servidor');
      });
  };

  // Retorno do componente
  return (
    <View style={styles.container}>
      {currentScreen !== 'first' ? (
        <TouchableOpacity style={styles.cancel} onPress={handleBack}>
          <Icon name="arrow-left-circle-outline" size={30} color={themeColors[theme]} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.cancel} onPress={() => navigation.navigate('Landing')}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      )}

      <Image source={require('../assets/logo_icon.png')} style={styles.logo} />
      <Text style={[styles.title, currentScreen === 'third' ? { marginBottom: 50 } : { marginBottom: 20 }]}>
        Venha fazer parte desta comunidade!
      </Text>

      {renderScreen()}

      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: themeColors[theme],
            shadowColor: themeColors[theme],
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 15,
            elevation: 10,
          },
        ]}
        onPress={currentScreen === 'third' ? handleRegister : handleNext}>
        <Text style={styles.buttonText}>
          {currentScreen === 'third' ? 'Confirmar' : 'Próximo'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Já possui uma conta?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.loginLink, { color: themeColors[theme] }]}>
            Entre
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
  },
  themeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 14,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#BDB150',
    padding: 15,
    borderRadius: 100,
    marginBottom: 80,
    width: 225,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancel: {
    position: 'absolute',
    top: 10,
    left: 10,
    marginTop: 30,
  },
  cancelText: {
    color: '#C84A60',
    fontSize: 16,
  },
  loginText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  loginLink: {
    color: '#BDB150',
    textDecorationLine: 'underline',
  },
  userImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  defaultUserImage: {
    width: 175,
    height: 175,
  },
  cameraContainer: {
    width:50,
    height:50,
    borderRadius: 25,
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    right:-75,
    top:-80,
  }
});

export default Register;
