import React, { Component, PropTypes } from 'react';
import { View,
         Text } from 'react-native';

export default class ShowResponse extends Component {
  /**
   * This should match the static childContextTypes
   * method. Without this method we can't access
   * context at all. Too bad that we go against DRY
   */
  static contextTypes = {
    response: PropTypes.string,
  };

  render() {
    return (
      <View>
        <Text>
          {this.context.response}
        </Text>
      </View>
    )
  }
}

/*
if you want to use context in stateless functional component
const ShowResponse = ({children}, context) => (
  <View>
    <Text>
      {context.response}
    </Text>
  </View>
);

ShowResponse.contextTypes = {
  response: PropTypes.string,
};
*/
