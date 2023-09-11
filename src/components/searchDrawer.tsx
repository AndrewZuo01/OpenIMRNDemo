// SearchDrawer.tsx

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;
const SearchDrawer = React.forwardRef(({ visible, onClose, onSearch }, ref) => {
  return (
    <View style={styles.drawerContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={onSearch}
      />
      {/* Add other content for the drawer */}
      <TouchableOpacity onPress={onClose}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  drawerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: windowHeight * 0.7,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    elevation: 4, // Add elevation for a shadow effect (Android)
    shadowColor: 'black', // Add shadow properties for iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 8,
  },
});

export default SearchDrawer;
