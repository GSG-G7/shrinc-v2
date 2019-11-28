import { gql } from 'apollo-boost';

const citiesQuery = gql`
  {
    therapists {
      city
    }
  }
`;

export default citiesQuery;
