import React from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Modal
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

  render() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.props.visible}>
        <View style={[StyleSheet.absoluteFill, styles.background]}>
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <Input
                placeholder="Name"
                text={this.state.name}
                onChangeText={(text) => this.setState({name: text})}/>
              <Row style={{alignItems: 'center'}}>
                <Col sm={6} md={6} lg={6}>
                  <View style={{alignItems: 'center', paddingHorizontal: 5}}>
                    <Button
                      full
                      light
                      onPress={() => this.props.close()}
                    >
                      <Text style={{color: 'black'}}>Cancel</Text>
                    </Button>
                  </View>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <View style={{alignItems: 'center', paddingHorizontal: 5}}>
                  <Button
                      full
                      primary
                      onPress={() => this.props.add(this.state.name)}
                    >
                      <Text style={{color: 'white'}}>Add</Text>
                    </Button>
                  </View>
                </Col>
              </Row>
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
    height: 150,
    borderRadius: 5,
    padding: 10
  }
})