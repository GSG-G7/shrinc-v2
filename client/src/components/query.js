import { gql } from 'apollo-boost';

const citiesQuery = gql`
  {
    AllTherapists {
      city
    }
  }
`;

export default citiesQuery;
