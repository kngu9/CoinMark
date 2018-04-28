import React from 'react';
import { StyleSheet, View, TextInput, Modal, TouchableHighlight } from 'react-native';
import { Header, Left, Body, Right, Button, Title, List, Subtitle, Text } from 'native-base';
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';

import NewPortfolioModal from '../components/NewPortfolioModal';
import { addPortfolio } from '../actions/portfolio';
class PortfolioScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="md-list" size={32} color={tintColor} />
    ),
  };

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  addPortfolio(name) {
    this.props.addPortfolio(name);
    this.setModalVisible(false);
  }

  render () {
    return (
      <View style={styles.container}>
        <Header>
          <Left />
          <Body>
            <Title>
              Portfolio
            </Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.setModalVisible(true)}>
              <Ionicons name="md-add" size={24}/>
            </Button>
          </Right>
        </Header>
        
        <NewPortfolioModal
          close={() => this.setModalVisible(false)}
          add={(name) => this.addPortfolio(name)}
          visible={this.state.modalVisible}
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
    portfolio: state.portfolio
  };
}

function mapDispatchToProps (dispatch) {
  return {
    addPortfolio: (name) => dispatch(addPortfolio(name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioScreen);