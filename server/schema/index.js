const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} = graphql;

const therapistType = new GraphQLObjectType({
  name: 'Therapist',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    fullName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    postCode: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
    priceRange: { type: new GraphQLNonNull(GraphQLString) },
    language: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    insurance: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    approch: { type: new GraphQLNonNull(GraphQLString) },
    avalibility: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: new GraphQLNonNull(GraphQLString) },
    remote: { type: new GraphQLNonNull(GraphQLBoolean) },
    skype: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'therapistQuery',
  fields: {
    therapists: {
      type: therapistType,
    //   resolve(parent, args) {
    //     // return Therapists
    //   },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTherapist: {
      type: therapistType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        fullName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        postCode: { type: new GraphQLNonNull(GraphQLString) },
        type: { type: new GraphQLNonNull(GraphQLString) },
        priceRange: { type: new GraphQLNonNull(GraphQLString) },
        language: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        insurance: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        approch: { type: new GraphQLNonNull(GraphQLString) },
        avalibility: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
        remote: { type: new GraphQLNonNull(GraphQLBoolean) },
        skype: { type: GraphQLString },
      },
    //   resolve(parent, args) {
    //     // make some functions(password hashing, host image by Cloudinary) on data
    //     //  save data (therapist account) in MongoDB
    //   },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
