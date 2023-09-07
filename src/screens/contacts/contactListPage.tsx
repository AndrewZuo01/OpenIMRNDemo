import OpenIMSDKRN, { OpenIMEmitter } from 'open-im-sdk-rn';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native';

const ContactListPage = () => {
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState([
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    // Add more contact data as needed
  ]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await OpenIMSDKRN.getFriendList("12345");
        console.log(data);

        // Update the state with the fetched data
        setContacts(data); // Assuming `data` is the format you want for contacts
      } catch (error) {
        console.error('Error getFriendList:', error); // Log the error
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once on mount

  const updateSearch = (text) => {
    setSearch(text);
    // You can implement search functionality here
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.button}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Contacts</Text>
        <TouchableOpacity style={styles.button}>
          <Text>Add Friend</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <Text>{item.name}</Text>
            {/* Add more contact details or actions here */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 8,
  },
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ContactListPage;
