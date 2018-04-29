import React from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Modal,
  FlatList,
  TouchableOpacity
} from 'react-native';

import {
  Column as Col,
  Row
} from 'react-native-flexbox-grid';

import { 
  Container,
  Header,
  Content,
  Item,
  Input,
  Button,
  Text
} from 'native-base';

export default class CryptoListItem extends React.PureComponent {
  state ={
    name: ''
  };

  renderItem ({item, index}) {
    return (
      <View style={styles.listItem}>
        <TouchableOpacity onPress={() => this.props.onSelect(index)}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.props.visible}>
        <View style={[StyleSheet.absoluteFill, styles.background]}>
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <FlatList
                keyExtractor={(item, index) => index}
                data={this.props.data}
                renderItem={(item) => this.renderItem(item)}
              />
              <View style={{alignItems: 'center', paddingHorizontal: 5}}>
                <Button
                  full
                  light
                  onPress={() => this.props.close()}
                >
                  <Text style={{color: 'black'}}>Cancel</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: 'white',
    width: 300,
    height: 300,
    borderRadius: 5,
    padding: 10
  },
  listItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: 10
  }
})