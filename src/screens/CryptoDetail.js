import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Header, Left, Body, Right, Button, Title, List, Subtitle } from 'native-base';
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryChart, VictoryLabel, VictoryAxis } from "victory-native";
import Spinner from 'react-native-loading-spinner-overlay';

import { random, range, round } from "lodash";
import { getHistorical } from '../api/coinmarketcap';

import moment from 'moment';

class CryptoDetailScreen extends React.Component {
  state = {
    loading: false,
    priceData: []
  };

  constructor (props) {
    super(props);

    this.timer = null;
  }

  async componentDidMount() {
    this.setState({loading: true}, async () => {
      let { id } = this.props.navigation.state.params.crypto;

      let data = await getHistorical(id, 0);
  
      let priceData = data.price_usd.map((price) => {
        return {
          x: price[0],
          y: price[1],
          date: moment(price[0]/1000).format("MM/YYYY")
        }
      });
  
      this.setState({priceData: priceData, loading: false});
    })
  }

  startListener () {
    this.timer = setTimeout(this.startListener.bind(this), 1);
  }

  stopListener () {
    clearTimeout(this.timer);
  }

  render () {
    let { name, symbol, percent_change_24h } = this.props.navigation.state.params.crypto;

    const percentChanged = parseFloat(percent_change_24h);

    return (
      <View style={styles.container}>
        <Spinner visible={this.state.loading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
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
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 50, y: 10 }}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryVoronoiContainer
              labels={(d) => `$${round(d.y, 2)}`}
            />
          }
        >
          <VictoryAxis
            active={false}
            theme={VictoryTheme.material}
          />
          <VictoryAxis
            theme={VictoryTheme.material}
            dependentAxis
          />
          <VictoryLine
            theme={VictoryTheme.material}
            data={this.state.priceData}
            style={{
              data: { stroke: percentChanged < 0.0 ? '#F45532' : '#30CC9A' }
            }}
          />
        </VictoryChart>
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