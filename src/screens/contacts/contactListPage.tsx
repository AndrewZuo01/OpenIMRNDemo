import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  SectionList,
  ScrollView,
} from 'react-native';
import NameCards from '../../components/nameCards';
import OpenIMSDKRN from 'open-im-sdk-rn';

const ContactListPage = () => {
  const [search, setSearch] = useState('');
  const [contacts, setContacts] = useState([]);
  const [alphabetHints, setAlphabetHints] = useState([]);
  const [contactSections, setContactSections] = useState([]);
  const sectionListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = JSON.parse(await OpenIMSDKRN.getFriendList("12345"));
        data = data.sort((a, b) => a.friendInfo.nickname.localeCompare(b.friendInfo.nickname));

        // Extract unique first characters from friend names to create alphabet hints
        const hints = Array.from(new Set(data.map((item) => item.friendInfo.nickname.charAt(0).toUpperCase())));
        setAlphabetHints(hints);

        // Group contacts by first character of their names, recognizing non-alphabet characters
        const groupedContacts = groupContactsByFirstCharacter(data);
        setContactSections(groupedContacts);
      } catch (error) {
        console.error('Error getFriendList:', error); // Log the error
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  const updateSearch = (text) => {
    setSearch(text);
    // You can implement search functionality here
  };

  const groupContactsByFirstCharacter = (contacts) => {
    const grouped = {};

    contacts.forEach((contact) => {
      let firstChar = contact.friendInfo.nickname.charAt(0).toUpperCase();

      // Recognize non-alphabet characters
      if (!firstChar.match(/[A-Z]/)) {
        firstChar = '#'; // Non-alphabet characters go to the '#' category
      }

      if (!grouped[firstChar]) {
        grouped[firstChar] = [];
      }
      grouped[firstChar].push(contact);
    });

    // Convert the grouped object into an array of sections
    const sections = Object.keys(grouped).map((key) => ({
      title: key,
      data: grouped[key],
    }));

    // Sort the sections by title (the first character)
    sections.sort((a, b) => a.title.localeCompare(b.title));

    return sections;
  };

  const scrollToSection = (sectionIndex) => {
    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
      });
    }
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
      <SectionList
        ref={sectionListRef}
        sections={contactSections}
        keyExtractor={(item, index) => (item.friendInfo && item.friendInfo.userID) ? item.friendInfo.userID + index.toString() : index.toString()}
        renderItem={({ item }) => (
          <NameCards item={item} />
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        onScroll={(event) => {
          const offsetY = event.nativeEvent.contentOffset.y;
          const sectionIndex = contactSections.findIndex((section) => offsetY >= section.offset);
          if (sectionIndex !== -1) {
            // You can customize how you want to display the hint here
            const hint = contactSections[sectionIndex].title;
            console.log(`Scrolling to section: ${hint}`);
          }
        }}
      />
      <ScrollView
        style={styles.hintContainer}
        contentContainerStyle={styles.hintContentContainer} // Apply contentContainerStyle
      >
        {alphabetHints.map((hint, index) => (
          <TouchableOpacity key={index} style={styles.hintItem} onPress={() => scrollToSection(index)}>
            <Text>{hint}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#eee',
    padding: 8,
  },
  hintContainer: {
    position: 'absolute',
    right: 0,
    top: "30%",
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  hintContentContainer: {
    justifyContent: 'center', // Apply justifyContent here
    alignItems: 'center', // Apply alignItems here
  },
  hintItem: {
    padding: 4,
  },
  
});

export default ContactListPage;
