import React from 'react';
import { View, Text} from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'



export default function SettingsScreen() {

  const ME_QUERY = gql`
  {
    me {
      firstName
      lastName
      email
    }
  }
`

  return(

    <Query query={ME_QUERY}>
      {({loading, error, data}) => {
        if(loading) return <Text>Loading Profile!</Text>
        if(error) return <Text>Whoops! Something went wrong.</Text>

        return (
        <View>
          <Text>It's the profile page!</Text>
          <Text>First Name: {data.firstName}</Text>
          <Text>Last Name: {data.lastName}</Text>
          <Text>Email: {data.email}</Text>
      </View>
        )
      }}

    </Query>

  )
}

SettingsScreen.navigationOptions = {
  title: 'Profile',
};
