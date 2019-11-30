import React, { Component, Fragment } from 'react';
import { Icon, Avatar } from 'antd';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';

import { AvailableityTime, Loader } from '../../common';
import { therapistQuery } from '../../common/query';
import fullTypeName from './staticData';
import './style.css';

class Profile extends Component {
  renderCompanies = data => data.map(item => <p key={item}>{item}</p>);

  render() {
    const {
      data: { therapist, loading },
    } = this.props;
    if (loading) return <Loader />;
    if (!Object.entries(therapist || {}).length) return <p>Nothing</p>;

    const {
      data: {
        therapist: {
          avalibility,
          city,
          email,
          fullName,
          image,
          postCode,
          priceRange,
          remote,
          skype,
          insurance,
          language,
          approch,
          type,
        },
      },
    } = this.props;

    return (
      <section className="font">
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <section className="profile_card_container">
          <div className="profile_card">
            <Avatar
              shape="circle"
              src={image[0].url}
              className="profile_avatar"
              size={120}
              icon="user"
            />
            <div className="profile_card_main_info">
              <h1 className="profile_username">{fullName}</h1>
              <h4 className="profile_user_info">{approch}</h4>
              <h4 className="profile_user_info">{fullTypeName[type]}</h4>
            </div>
          </div>
          <div className="profile_card_fees">
            <h3>
              <Icon type="dollar" />
              &nbsp; &nbsp;
              <span>Fees {priceRange} / Session</span>
            </h3>
          </div>
        </section>
        <AvailableityTime availableityTime={avalibility} />
        <section className="profile_contact_container">
          <h2>
            <Icon type="wifi" /> Is remotly
          </h2>
          <div className="profile_contact_info">
            <p>{remote ? 'Yes' : 'No'}</p>
          </div>
        </section>
        <section className="profile_contact_container">
          <h2>
            <Icon type="read" /> Languages
          </h2>
          <div className="profile_contact_info">
            <p>{language.join(' , ')}</p>
          </div>
        </section>
        <section className="profile_contact_container">
          <h2>
            <Icon type="phone" /> Contact Info
          </h2>
          <div className="profile_contact_info">
            <h4>
              <span aria-hidden>-</span> Email
            </h4>
            <p>{email}</p>
            {skype && (
              <Fragment>
                <h4>
                  <span aria-hidden>-</span> Skype
                </h4>
                <p>{skype}</p>
              </Fragment>
            )}
          </div>
        </section>
        <section className="profile_contact_container">
          <h2>
            <Icon type="bank" /> Insurance Companies
          </h2>
          <div className="profile_contact_info">
            {this.renderCompanies(insurance)}
          </div>
        </section>
        <section className="profile_contact_container">
          <h2>
            <Icon type="global" /> Location
          </h2>
          <div className="profile_contact_info">
            <h4>
              <span aria-hidden>-</span> City
            </h4>
            <p>{city}</p>
            <h4>
              <span aria-hidden>-</span> Postal code
            </h4>
            <p>{postCode}</p>
          </div>
        </section>
      </section>
    );
  }
}
Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  data: PropTypes.shape({
    therapist: PropTypes.shape({
      avalibility: PropTypes.string,
      city: PropTypes.string,
      email: PropTypes.string,
      fullName: PropTypes.string,
      image: PropTypes.string,
      postCode: PropTypes.string,
      priceRange: PropTypes.string,
      remote: PropTypes.string,
      skype: PropTypes.string,
      insurance: PropTypes.string,
      language: PropTypes.string,
      approch: PropTypes.string,
      type: PropTypes.string,
    }),
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};
export default graphql(therapistQuery, {
  options: props => {
    return {
      variables: {
        id: props.match.params.id,
      },
    };
  },
})(Profile);
