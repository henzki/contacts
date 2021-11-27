import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList  } from 'react-native';
import* as Contacts from 'expo-contacts';

export default function App() {

  
  const [contacts, setContacts] = useState([]);

  const getContacts = async() => {
    const {status} = await Contacts.requestPermissionsAsync();
      if (status === 'granted'){
          const {data} = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers],
          });
          if (data.length> 0) {
            setContacts(data);
          }
      }
  }

  console.log(contacts);

  return (
    <View style={styles.container}>
    <StatusBar style="auto"/>
    <FlatList style={styles.list}
        data={contacts}
        renderItem={({ item }) => {
        return (
        <Text style= {{fontSize: 18}}>{`${item.name} (${item.phoneNumbers ? item.phoneNumbers[0].number : ''})`}</Text> 

        )
        }}
      />
    <Button title="Get Contacts" onPress={getContacts} />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    marginBottom: 75,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
