import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Header, Left, Body, Right, Button, Title, List, Subtitle } from 'native-base';
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { VictoryLine, VictoryTheme, VictoryCursorContainer } from "victory-native";

import { random, range, round } from "lodash";
import { getHistorical } from '../api/coinmarketcap';

class CryptoDetailScreen extends React.Component {
  async componentDidMount() {
    console.log('test');
    let { id } = this.props.navigation.state.params.crypto;

    let data = await getHistorical(id, 0);
  }

  generateRandomData(points = 6) {
    return range(1, points + 1).map((i) => ({ x: i, y: i + random(-1, 2) }));
  }

  render () {
    let { name, symbol } = this.props.navigation.state.params.crypto;

    return (
      <View style={styles.container}>
        <Header>
          <Left>
            <Button style={{padding: 5}} transparent onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="ios-arrow-back" size={24}/>
            </Button>
          </Left>
          <Body>
            <Title>
              { name }
            </Title>
            <Subtitle>
              { symbol }
            </Subtitle>
          </Body>
          <Right />
        </Header>
        <VictoryLine
          theme={VictoryTheme.material}
          animate={{
            duration: 1000,
            onLoad: { duration: 500 }
          }}
          data={this.generateRandomData()}
          containerComponent={
            <VictoryCursorContainer
              onTouchStart={() => console.log('test')}
              onTouchEnd={() => console.log('test')}
              // cursorLabel={(d) => (`${round(d.x, 2)} , ${round(d.y, 2)}`)}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

function mapStateToProps (state) {
  return {
    
  };
}

function mapDispatchToProps (dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoDetailScreen);