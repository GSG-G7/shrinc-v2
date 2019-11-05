import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Select,
  Switch,
  Icon,
  Upload,
  Button,
  Checkbox,
} from 'antd';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import Avalibility from '../../common/availabilityTable';
import Map from '../../common/Location';
import staticData from './staticData';
import './style.css';

class SignupForm extends Component {
  state = {
    remote: false,
    confirmDirty: false,
    available: [
      { day: 'Mon', from: '', to: '' },
      { day: 'Tue', from: '', to: '' },
      { day: 'Wen', from: '', to: '' },
      { day: 'Thu', from: '', to: '' },
      { day: 'Fri', from: '', to: '' },
      { day: 'Sat', from: '', to: '' },
      { day: 'Sun', from: '', to: '' },
    ],
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
    } = this.props;
    const { remote, available } = this.state;
    validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const formData = new FormData();
        const data = { ...values };
        data.remote = remote;
        const file = this.image.state.fileList[0].originFileObj;
        formData.append('data', JSON.stringify(data));
        formData.append('avalibility', JSON.stringify(available));
        formData.append('image', file);
        await axios.post('/api/v1/signup', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  uploadInput = file => {
    this.image = file;
  };

  handleRemote = checked => {
    this.setState({ remote: checked });
  };

  onChange = (time, timeString, key, point) => {
    this.setState(previous => {
      const newAvailable = [...previous.available];
      newAvailable[key] = { ...newAvailable[key], [point]: timeString };
      return { available: newAvailable };
    });
  };

  handleCity = city => {
    const {
      form: { setFieldsValue },
    } = this.props;
    setFieldsValue({
      city,
    });
  };

  insuranceValidation = (rule, value, callback) => {
    if (value && value.length < 2) {
      callback('you should select more than one');
    } else {
      callback();
    }
  };

  render() {
    const { Option } = Select;
    const { remote } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { languages, prices, insurance } = staticData;
    return (
      <div className="signup-page">
        <Helmet>
          <title>Sign Up</title>
        </Helmet>
        <h2 className="signup-page__title">Therapist Signup</h2>
        <Form onSubmit={this.handleSubmit} className="signup-page__form">
          <Form.Item label="Full Name:">
            {getFieldDecorator('fullName', {
              rules: [
                {
                  message: 'The name is not valid!',
                },
                {
                  required: true,
                  message: 'Please input your full name!',
                },
                {
                  min: 7,
                  message: 'must be at least 7 character',
                },
              ],
            })(<Input placeholder="Enter your full name" />)}
          </Form.Item>
          <Form.Item label="Email:">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input placeholder="Enter your email" />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 8,
                  message: 'at least 8 character',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password placeholder="Enter your password" />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator(
              'confirm',
              { initialValue: '' },
              {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              }
            )(
              <Input.Password
                placeholder="Confirm your password"
                onBlur={this.handleConfirmBlur}
              />
            )}
          </Form.Item>
          <Form.Item label="City:">
            {getFieldDecorator('city', {
              initialValue: {},
              rules: [
                {
                  message: 'Please mark your location on map',
                },
              ],
            })(<Map handleCity={this.handleCity} />)}
          </Form.Item>
          <Form.Item label="Type Of Therapy:">
            {getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                  message: 'Please select type!',
                },
              ],
            })(
              <Select placeholder="Select a type" onChange={this.handleType}>
                <Option value="CBT">Cognitive behavioural therapy</Option>
                <Option value="PD">Psyhcodynamic therapy</Option>
                <Option value="Hu">Humanistic psychotherapy</Option>
                <Option value="In">Integrative psychotherapy</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Price Range:">
            {getFieldDecorator('priceRange', {
              rules: [
                {
                  required: true,
                  message: 'Please select price range!',
                },
              ],
            })(
              <Select placeholder="Select a range" onChange={this.handlePrice}>
                {prices.map(price => (
                  <Option value={price} key={price}>
                    {price}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Post Code:">
            {getFieldDecorator('postCode', {
              rules: [
                {
                  required: true,
                  message: 'Please input post code!',
                },
              ],
            })(<Input placeholder="Enter post code" />)}
          </Form.Item>
          <Form.Item label="Languages spoken:">
            {getFieldDecorator('language', {
              rules: [
                {
                  required: true,
                  message: 'Please select your languages!',
                },
              ],
            })(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="select your country"
                optionLabelProp="label"
              >
                {languages.map(language => (
                  <Option value={language} label={language} key={language}>
                    {language}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Health insurance:">
            {getFieldDecorator('insurance', {
              rules: [
                {
                  required: true,
                  message: 'Please fill this field',
                },
                {
                  validator: this.insuranceValidation,
                },
              ],
            })(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select multi insurance"
                optionLabelProp="label"
              >
                {insurance.map(item => (
                  <Option value={item} label={item} key={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Approach:">
            {getFieldDecorator('approch', {
              rules: [
                {
                  message: 'The Approach is not valid!',
                },
                {
                  required: true,
                  message: 'Please input your Approach!',
                },
                {
                  max: 200,
                  message: 'Maximum 200 characters',
                },
              ],
            })(<Input.TextArea placeholder="Enter your approch" />)}
          </Form.Item>
          <Form.Item>
            <Avalibility onChange={this.onChange} />
          </Form.Item>
          <Form.Item label="Add Photo:">
            <Upload
              accept="image/*"
              style={{ width: '100%' }}
              customRequest={() => {}}
              listType="picture"
              ref={this.uploadInput}
            >
              <Button size="large">
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Remote Therapy:">
            <Switch name="remote" onChange={this.handleRemote} />
          </Form.Item>
          {remote ? (
            <Form.Item label="Skype:">
              {getFieldDecorator('skype', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your skype!',
                  },
                ],
              })(<Input name="skype" placeholder="Enter your skype" />)}
            </Form.Item>
          ) : (
            ''
          )}
          <Form.Item>
            {getFieldDecorator('terms', {
              rules: [
                {
                  required: true,
                  message: 'Please accept the terms of services ',
                },
              ],
            })(<Checkbox>I Accept the Terms of Services</Checkbox>)}
          </Form.Item>
          <Button
            type="primary"
            className="signup-page__button"
            htmlType="submit"
          >
            Signup
          </Button>
        </Form>
      </div>
    );
  }
}

SignupForm.propTypes = {
  form: PropTypes.objectOf(PropTypes.func).isRequired,
  getFieldDecorator: PropTypes.func.isRequired,
  setFieldsValue: PropTypes.func.isRequired,
};

const Signup = Form.create({ name: 'Signup' })(SignupForm);

export default Signup;
