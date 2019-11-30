import { gql } from 'apollo-boost';

const citiesQuery = gql`
  {
    therapists {
      city
    }
  }
`;

const allTherapistsQuery = gql`
  {
    therapists {
      id
      avalibility
      city
      email
      fullName
      image
      postCode
      priceRange
      remote
      skype
      insurance
      language
      approch
      type
    }
  }
`;

const therapistQuery = gql`
  query($id: ID) {
    therapist(id: $id) {
      avalibility
      city
      email
      fullName
      image
      postCode
      priceRange
      remote
      skype
      insurance
      language
      approch
      type
    }
  }
`;

export { citiesQuery, therapistQuery, allTherapistsQuery };
