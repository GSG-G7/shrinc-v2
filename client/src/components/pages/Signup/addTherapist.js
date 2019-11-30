import { gql } from 'apollo-boost';

const addTherapist = gql`
  mutation(
    $fullName: String!
    $email: String!
    $password: String!
    $city: String!
    $postCode: String!
    $type: String!
    $priceRange: String!
    $language: [String!]!
    $insurance: [String!]!
    $approch: String!
    $image: String!
    $avalibility: String!
    $remote: Boolean!
    $skype: String
  ) {
    addTherapist(
      fullName: $fullName
      email: $email
      password: $password
      city: $city
      postCode: $postCode
      type: $type
      priceRange: $priceRange
      language: $language
      insurance: $insurance
      approch: $approch
      image: $image
      avalibility: $avalibility
      remote: $remote
      skype: $skype
    ) {
      fullName
    }
  }
`;

export default addTherapist;
