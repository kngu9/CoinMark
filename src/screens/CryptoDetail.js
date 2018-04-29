import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Header, Left, Body, Right, Button, Title, List, Subtitle, Text } from 'native-base';
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryChart, VictoryLabel, VictoryAxis } from "victory-native";
import Spinner from 'react-native-loading-spinner-overlay';
import SegmentedControlTab from 'react-native-segmented-control-tab'

import { random, range, round } from "lodash";
import { getHistorical } from '../api/coinmarketcap';
import { addToPortfolio } from '../actions/portfolio';

import PortfolioSelect from '../components/PortfolioSelect';

import moment from 'moment';

class CryptoDetailScreen extends React.Component {
  state = {
    loading: false,
    priceData: [],
    selectedIndex: 0,
    modalVisible: false
  };

  constructor (props) {
    super(props);

    this.timer = null;
  }

  async componentDidMount () {
    // On load, pulls the data for graphign based on the crypto coin user has selected
    this.setState({loading: true}, async () => {
      let { id } = this.props.navigation.state.params.crypto;

      let data = await getHistorical(id, 0);
 
      // Does basic ETL to display the graph
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

  renderGraph () {
    let { percent_change_24h } = this.props.navigation.state.params.crypto;
    let { priceData } = this.state;

    const percentChanged = parseFloat(percent_change_24h);
    // Make sure that there is data to draw
    if (this.state.priceData.length > 0)
      return (
        <View>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={{ x: 10, y: 10 }}
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

    return <View />;
  }

  changeGraph (i) {
    // Handler to handle the different types of user options such as 1 year, 3 months, etc...
    let { id } = this.props.navigation.state.params.crypto;

    this.setState({selectedIndex: i, loading: true}, async () => {
      let priceData = [];
      let data = [];
      let days = 0;

      switch(i) {
        case 0: // All
          days = 0;
          break;
        case 1: // YTD
          const start = moment().startOf('year');

          days = moment(new Date()).diff(start, 'days');
          break;
        case 2: // 1y
          days = 365;
          break;
        case 3: // 3m
          days = 90;
          break;
        case 4: // 1m
          days = 30;
          break;
        case 5: // 7d
          days = 7;
          break;
        case 6: // 1d
          days = 1;
          break;
        default:
          days = 0;
          break;
      }

      data = await getHistorical(id, days);

      priceData = data.price_usd.map((price) => {
        return {
          x: price[0],
          y: price[1],
          date: moment(price[0]/1000).format("MM/YYYY")
        }
      });

      this.setState({priceData: priceData, loading: false});
    });
  }

  addPortfolio (index) {
    this.props.addToPortfolio(index, this.props.navigation.state.params.crypto.symbol)
  }

  render () {
    let { name, symbol } = this.props.navigation.state.params.crypto;
    
    // Draws the component
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
        <View style={styles.innerContainer}>
          { this.renderGraph() }
          <View>
            <SegmentedControlTab
              values={['All', 'YTD', '1y', '3m', '1m', '7d', '1d']}
              selectedIndex={this.state.selectedIndex}
              onTabPress={(i) => this.changeGraph(i)} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              block
              onPress={() => this.setState({modalVisible: true})}
            >
              <Text>Add To Portfolio</Text>
            </Button>
          </View>
        </View>

        <PortfolioSelect
          visible={this.state.modalVisible}
          close={() => this.setState({modalVisible: false})}
          data={this.props.portfolio.portfolios}
          onSelect={(item) => this.addPortfolio(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  innerContainer: {
    marginHorizontal: 10
  },
  buttonContainer: {
    marginTop: 20
  }
});

function mapStateToProps (state) {
  return {
    portfolio: state.portfolio
  };
}

function mapDispatchToProps (dispatch) {
  return {
    addToPortfolio: (index, symbol) => dispatch(addToPortfolio(index, symbol))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoDetailScreen);
