import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
// import {uuid} from 'uuidv4';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';
import firestore from '@react-native-firebase/firestore';

const itemsCollection = firestore().collection('Items');

const milkItem = await firestore().collection('Items').doc('Milk').get();

const Stack = createNativeStackNavigator();


const MyStack = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Stats" component={StatsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return(
    <Button
      title="Test"
      onPress={() => 
        navigation.navigate('Stats', { name: 'MILK' })
      }
    />
  );
};

const StatsScreen = ({ navigation, route }) => {
  return(
    <Text>Här finns lite stats om {route.params.name}</Text>
  );
};

const App = () => {

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
  });

  const [checkedItems, checkedItemChange] = useState([]);

  const deleteItem = id => {
    setItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  // Submit the users edits to the overall items state
  const saveEditItem = (id, text) => {
    setItems(prevItems => {
      return prevItems.map(item =>
        item.id === editItemDetail.id ? {id, text: editItemDetail.text} : item,
      );
    });
    // Flip edit status back to false
    editStatusChange(!editStatus);
  };

  // Event handler to capture users text input as they edit an item
  const handleEditChange = text => {
    editItemDetailChange({id: editItemDetail.id, text});
  };

  const addItem = text => {
    if (text === itemsCollection.find(item => item.name === text).name){
      Alert.alert('Item found');
    }/*
    if (!text) {
      Alert.alert(
        'No item entered',
        'Please enter an item when adding to your shopping list',
        [
          {
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
    }*/
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
      <View style={styles.container}>
        <Header title="Fridge Inventory" />
        <AddItem addItem={addItem} />
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
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;