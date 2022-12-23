import React, {useState, Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet, FlatList, Alert, Button, Dimensions, Text, TextInput, ScrollView, SafeAreaView} from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart, Grid} from "react-native-chart-kit";

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

const SubScreen = ({navigation}) =>{
    
  //states
  const [valx, setValx] = React.useState();
  const [valy, setValy] = React.useState();
  const  [xarr , setArrX] = React.useState([]);   //[2,4,6,8]
  const  [yarr , setArrY] = React.useState([0]);  //[60,20,40,120,-40]

  // labels are x axis
  // data are y axis
  let x = 10;
  let y = 10;
// setInterval(addData(x+=10,y+=10), 15000);

  const addData = (x ,y) =>{
    xarr.push(x);
    setArrX(arrx =>[...xarr]);
    yarr.push(y);
    setArrY(arry => [...yarr]);
    // Axios.post("http://localhost:3001/insert", {x,y});
  }
//func to run map
const showArrayItem = (item) => {
}
  
  // settings graph attribs
  const data = {
    labels: [xarr],
    datasets: [
      {
        data: [],
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
        strokeWidth:5 // optional
      }
    ],
  };

// getting screen width to draw graph
const screenWidth = Dimensions.get("window").width;


// inserting data into graph
data.datasets[0].data = yarr.map(value => value);  
  

  return (
    <View>
    
     {/* getting x input*/}
      <TextInput
        style={styles.input}
        onChangeText={(valx) => setValx(valx)}
        placeholder="enter x here..."
        value={valx}
        keyboardType="numeric"
      />

      {/* getting y input*/}
      <TextInput
        style={styles.input}
        onChangeText={(valy) => setValy(valy)}
        placeholder="enter y here..."
        value={valy}
        keyboardType="numeric"
      />
      {/* inserting x and y into arrays*/}
      <Button
        title="Draw"
       onPress={() =>addData(valx,valy)}
      />


      {/* display of graph*/}
    <Text>
    {"\n\n"}
      </Text>
      <LineChart
          data={data}
          width={screenWidth}
          height={200}
          chartConfig={{
      backgroundGradientFrom: "#ffffff",
      backgroundGradientTo: "#ffffff",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "5",
      }
    }}
      />

      <Text>
      <ScrollView>
          {
            xarr.map((item, key) => (

              <Text key={key} onPress={showArrayItem.bind(this)}>
                <Text > {item} </Text>
              </Text>

            ))
          }
        </ScrollView>
        {"\n\n"}
           <ScrollView>
          {
            yarr.map((item, key) => (

              <Text key={key} onPress={showArrayItem.bind(this)}>
                <Text > {item} </Text>
              </Text>

            ))
          }
        </ScrollView>
        </Text>
    </View>
    
  );
};
   
  

  const ProfileScreen = ({ navigation, route }) => {
    return <Text>This is {route.params.name}'s profile</Text>;
  };

  const [items, setItems] = useState([
    {
      id: 0,
      text: 'Milk',
      protein: 5.0,
    },
    {
      id: 1,
      text: 'Eggs',
      protein: 8.0,
    },
    {
      id: 2,
      text: 'Bread',
      protein: 2.0,
    },
    {
      id: 3,
      text: 'Juice',
      protein: 1.0,
    },
  ]);
  /*function ListExample() {
    return (
      <FlatList
        data={[items, setItems]}
        renderItem={({ item }) => (
          <View>
            <Text>{item.id}</Text>
            <Text>{item.text}</Text>
            <Text>{item.protein}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    );
  }*/
  


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
  exampleText: {
    fontSize: 20,
    fontWeight: "bold",
  }
});

export default App;