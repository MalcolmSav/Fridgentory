import React, {useState, Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View, StyleSheet, FlatList, Alert, Button} from 'react-native';
// import {uuid} from 'uuidv4';

import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';

const Stack = createNativeStackNavigator();
//const navigation= this.props.navigation;
const App = () => {

function MainScreen({navigation}) {
  return (
    <View style={styles.container}>
    <Header title="Fridge Inventory" />
    <Button 
    title="Stats" 
    onPress={() => navigation.navigate('SubScreen')}
    />
    <AddItem addItem={ addItem} />
    <FlatList
      data={items}
      renderItem={({item}) => (
        <ListItem
          item={item}
          deleteItem={deleteItem}
          editItem={editItem}
          isEditing={editStatus}
          editItemDetail={editItemDetail}
          saveEditItem={saveEditItem}
          handleEditChange={handleEditChange}
          itemChecked={itemChecked}
          checkedItems={checkedItems}
        />
      )}
    />
  </View>
  );
}

function SubScreen({navigation}) {
  return (
    <View style={styles.container}>
    <Header title="Fridge outventory" />
    <Button 
    title="Main" 
    onPress={() => navigation.navigate('MainScreen')}
    />
    <AddItem addItem={ addItem} />
    <AddItem addItem={ addItem} />
    <FlatList
      data={items}
      renderItem={({item}) => (
        <ListItem
          item={item}
          deleteItem={deleteItem}
          editItem={editItem}
          isEditing={editStatus}
          editItemDetail={editItemDetail}
          saveEditItem={saveEditItem}
          handleEditChange={handleEditChange}
          itemChecked={itemChecked}
          checkedItems={checkedItems}
        />
      )}
    />
  </View>
  );
}

/*function GraphicScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Header title="Stats and Graphs" />
      <Button
      title="Main"
      onPress={() => navigation.navigate('MainScreen')} 
      />

    </View>
  );
}*/


 
  //const HomeScreen = ({ navigation }) => {

  

  const ProfileScreen = ({ navigation, route }) => {
    return <Text>This is {route.params.name}'s profile</Text>;
  };

  const [items, setItems] = useState([
    {
      id: 0,
      text: 'Milk',
      protein: 8,
    },
    {
      id: 1,
      text: 'Eggs',
    },
    {
      id: 2,
      text: 'Bread',
    },
    {
      id: 3,
      text: 'Juice',
    },
  ]);

  // Flag true if user is currently editing an item
  const [editStatus, editStatusChange] = useState(false);

  // State to capture information about the item being edited
  const [editItemDetail, editItemDetailChange] = useState({
    id: null,
    text: null,
    protein: null,
  });

  const [checkedItems, checkedItemChange] = useState([]);

  const deleteItem = id => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  // Submit the users edits to the overall items state
  const saveEditItem = (id, text, protein) => {
    setItems(prevItems => {
      return prevItems.map(item =>
        item.id === editItemDetail.id ? {id, text: editItemDetail.text, protein} : item,
      );
    });
    // Flip edit status back to false
    editStatusChange(!editStatus);
  };

  // Event handler to capture users text input as they edit an item
  const handleEditChange = text => {
    editItemDetailChange({id: editItemDetail.id, text});
  };

  const addItem = ({ navigation, text }) => {
    if (!text) {
      navigation.navigate('Profile', {name: 'jane'})
      Alert.alert(
        'No item entered',
        'Please enter an item when adding to your shopping list',
        [
          {

            text: "pog",
            text: 'Understood',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    } else {
      setItems(prevItems => {
        x = Math.random() * 1000;
        return [{id: text, text}, ...prevItems];
      });
    }
  };

  // capture old items ID and text when user clicks edit
  const editItem = (id, text) => {
    editItemDetailChange({
      id,
      text,
    });
    return editStatusChange(!editStatus);
  };

  const itemChecked = (id, text) => {
    const isChecked = checkedItems.filter(checkedItem => checkedItem.id === id);
    isChecked.length
      ? // remove item from checked items state (uncheck)
        checkedItemChange(prevItems => {
          return [...prevItems.filter(item => item.id !== id)];
        })
      : // Add item to checked items state
        checkedItemChange(prevItems => {
          return [...prevItems.filter(item => item.id !== id), {id, text}];
        });
  };

  return (
    <NavigationContainer>
            <Stack.Navigator>
      
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="SubScreen" component={SubScreen} />
        {/* <Stack.Screen name="Graphic Screen" component={GraphicScreen} /> */}
      </Stack.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;