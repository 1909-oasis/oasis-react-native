import React from 'react';
import { View, Text} from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'



export default function ProfileScreen() {

  const QUERY = gql`
  {
    me {
      firstName
      lastName
      email
    }

    recommendationList {
      cocktail {
        id
        imageUrl
        name
        ingredients{
          ingredient{
            name
          }
          measure
        }
        id
      }
    }
  }
`
  return(

    <Query query={QUERY}>
      {({loading, error, data}) => {
        if(loading) return <Text>Loading Profile!</Text>
        if(error) return <Text>Whoops! Something went wrong.</Text>

        return (
        <View>
          <Text>It's the profile page!</Text>
          <Text>First Name: {data.me.firstName}</Text>
          <Text>Last Name: {data.me.lastName}</Text>
          <Text>Email: {data.me.email}</Text>
          {data.recommendationList.map((element) => {
          <Text key={element.cocktail.id}>{element.cocktail.name}</Text>
          })}
      </View>
        )
      }}

    </Query>

  )
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};
