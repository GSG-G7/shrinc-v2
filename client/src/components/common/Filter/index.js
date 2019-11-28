/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Select, Form, Button, Switch, notification } from 'antd';

import getCities from '../../queries';
import Loader from '../Loader';
import { types, ranges } from './staticData';
import './style.css';

const { Option } = Select;

class Filter extends Component {
  state = {
    cities: [],
    citiesIsReseved: false,
  };

  componentDidUpdate = async prevProps => {
    const { loading: prevLoading } = prevProps;
    const {
      data: { therapists, loading },
    } = this.props;
    const { citiesIsReseved } = this.state;
    try {
      if (!loading && prevLoading !== loading && !citiesIsReseved) {
        const availableCities = therapists.map(therapy => therapy.city);
        this.setCitiesState(availableCities, true);
      }
    } catch (error) {
      this.openNotificationWithIcon(
        error,
        'Internal Server Error Try another time'
      );
    }
  };

  setCitiesState = (cities, citiesIsReseved) =>
    this.setState({ cities, citiesIsReseved });

  handleSubmit = e => {
    e.preventDefault();
    const {
      handleSubmit,
      form: { validateFieldsAndScroll },
    } = this.props;

    validateFieldsAndScroll((err, data) => {
      if (!err) {
        handleSubmit(data);
      } else {
        this.openNotificationWithIcon(
          err,
          "can't make filter new try agian later"
        );
      }
    });
  };

  openNotificationWithIcon = (e, message) => {
    notification.error({
      message,
      description: e.message,
      duration: 2,
    });
  };

  render() {
    const { cities } = this.state;
    const {
      form: { getFieldDecorator, resetFields },
      disabled,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="filter__form">
        <Form.Item label="Type of therapy">
          {getFieldDecorator('type')(
            <Select>
              {types.map(type => (
                <Option value={type.key} key={type.full}>
                  {type.full}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Location">
          {getFieldDecorator('city')(
            <Select>
              {cities.length ? (
                cities.map(type => (
                  <Option value={type} key={type}>
                    {type}
                  </Option>
                ))
              ) : (
                <Option key="no-result" value="no-result">
                  <Loader />
                </Option>
              )}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Price">
          {getFieldDecorator('priceRange')(
            <Select>
              {ranges.map(type => (
                <Option value={type} key={type}>
                  {type}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Remote options" className="label__swich-btn">
          {getFieldDecorator('remote')(<Switch defaultChecked />)}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="filter__submit-button"
            disabled={disabled}
          >
            Filter
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={() => resetFields()} className="filter__reset">
            Clear
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Filter);

Filter.propTypes = {
  form: PropTypes.shape({
    validateFieldsAndScroll: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func.isRequired,
    resetFields: PropTypes.func.isRequired,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
export default graphql(getCities)(WrappedRegistrationForm);
