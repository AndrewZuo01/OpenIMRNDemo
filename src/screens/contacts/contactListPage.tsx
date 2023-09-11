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
import { GetFriendList } from '../api/openimsdk';

const ContactListPage = () => {
  const [search, setSearch] = useState('');
  const [alphabetHints, setAlphabetHints] = useState([]);
  const [contactSections, setContactSections] = useState<{ title: string, data: any }[]>([]);
  const [scrollEnabled, setScrollEnabled] = useState(true); // Add scrollEnabled state
  const sectionListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let rawData = await GetFriendList();
        let data = JSON.parse(rawData.data);
        data = data.sort((a, b) => a.friendInfo.nickname.localeCompare(b.friendInfo.nickname));
        // Extract unique first characters from friend names to create alphabet hints
        const hints = Array.from(new Set(data.map((item) => {
          const firstChar = item.friendInfo.nickname.charAt(0).toUpperCase();
          return firstChar.match(/[A-Z]/) ? firstChar : '#'; // Use '#' for non-alphabet characters
        })));

        setAlphabetHints(hints);

        // Group contacts by first character of their names, recognizing non-alphabet characters
        const groupedContacts = groupContactsByFirstCharacter(data);
        setContactSections([{
          title: '',
          data: [{
            "blackInfo": null,
            "friendInfo":
            {
              "addSource": 2, "attachedInfo": "", "createTime": 1694072100, "ex": "", "faceURL": "New Friend", "nickname": "New Friend", "operatorUserID": "4458656648",
              "ownerUserID": "6960562805", "remark": "", "userID": "create"
            },
            "publicInfo": null
          }, {
            "blackInfo": null,
            "friendInfo":
            {
              "addSource": 2, "attachedInfo": "", "createTime": 1694072100, "ex": "", "faceURL": "New Group", "nickname": "New Group", "operatorUserID": "4458656648",
              "ownerUserID": "6960562805", "remark": "", "userID": "create"
            },
            "publicInfo": null
          },
          ]
        }, {
          title: ' ',
          data: [{
            "blackInfo": null,
            "friendInfo":
            {
              "addSource": 2, "attachedInfo": "", "createTime": 1694072100, "ex": "", "faceURL": "My Groups", "nickname": "My Groups", "operatorUserID": "4458656648",
              "ownerUserID": "6960562805", "remark": "", "userID": "create"
            },
            "publicInfo": null
          }]
        }
          , ...groupedContacts]);
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
    let hasNonAlphabet = false;

    contacts.forEach((contact) => {
      let firstChar = contact.friendInfo.nickname.charAt(0).toUpperCase();

      // Recognize non-alphabet characters
      if (!firstChar.match(/[A-Z]/)) {
        firstChar = '#'; // Non-alphabet characters go to the '#' category
        hasNonAlphabet = true;
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
    sections.sort((a, b) => {
      if (a.title === '#') {
        return hasNonAlphabet ? 1 : -1; // Move '#' to the end if it exists and there are non-alphabet characters
      }
      if (b.title === '#') {
        return hasNonAlphabet ? -1 : 1; // Move '#' to the end if it exists and there are non-alphabet characters
      }
      return a.title.localeCompare(b.title);
    });

    return sections;
  };

  const scrollToSection = (sectionIndex) => {
    console.log("index", sectionIndex)
    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
      });
    }
  };

  const handleHintItemPress = (index) => {
    // Disable scrolling when hint item is pressed
    setScrollEnabled(false);
    scrollToSection(index);

    // Re-enable scrolling after a delay (you can adjust the delay time as needed)
    setTimeout(() => {
      setScrollEnabled(true);
    }, 1000); // 1000 milliseconds delay
  };




  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
          placeholder="Search"
          onChangeText={updateSearch}
          value={search}
        />
      </View>
      <SectionList nestedScrollEnabled
        ref={sectionListRef}
        sections={contactSections}
        keyExtractor={(item, index) =>
          item.friendInfo && item.friendInfo.userID
            ? item.friendInfo.userID + index.toString()
            : index.toString()
        }
        renderItem={({ item }) => <NameCards item={item} />}
        renderSectionHeader={({ section }) => {
          if (section.title !== '')
            return <Text style={styles.sectionHeader}>{section.title}</Text>
          else
            return null
        }
        }
        onScroll={(event) => {
          const offsetY = event.nativeEvent.contentOffset.y;
          const sectionIndex = contactSections.findIndex(
            (section) => offsetY >= section.offset
          );
          if (sectionIndex !== -1) {
            // You can customize how you want to display the hint here

            const hint = contactSections[sectionIndex].title;
            console.log(`Scrolling to section: ${hint}`);
          }
        }}
        // Disable scrolling if scrollEnabled is false
        scrollEnabled={scrollEnabled}
      />
      <ScrollView
        style={styles.hintContainer}
        contentContainerStyle={styles.hintContentContainer} // Apply contentContainerStyle
      >
        {alphabetHints.map((hint, index) => (
          <TouchableOpacity
            key={index}
            style={styles.hintItem}
            onPress={() => handleHintItemPress(index)}
          >
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
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#F6F6F6FF',
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 16,
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
    // marginBottom: 16,
    paddingLeft: 8,
    backgroundColor: '#E5E5E5FF',
    textAlign: "center"
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#F6F6F6FF',
    padding: 8,
  },
  hintContainer: {
    position: 'absolute',
    right: 0,
    top: '30%',
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  hintContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hintItem: {
    padding: 4,
  },
});

export default ContactListPage;
