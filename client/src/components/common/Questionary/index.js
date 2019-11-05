import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import './style.css';
import { Form, Steps, Button, message } from 'antd';
// import renderSteps from './renderSteps';
import Q from './Question';
import options from './qustionsStatic';
import rateHighestTypeTherapy from '../../../utils';

const { Step } = Steps;

class BarBrogress extends React.Component {
  state = {
    current: 0,
    value: {
      Q1: '0',
      Q2: '0',
      Q3: '0',
      Q4: '0',
      Q5: '0',
      Q6: '0',
      Q7: '0',
      Q8: '0',
      Q9: '0',
      Q10: '0',
    },
    messageForUser: 'Done',
  };

  onChange = e => {
    this.setState(prevState => ({
      ...prevState,
      value: { ...prevState.value, [e.target.id]: e.target.value },
    }));
  };

  handleSubmit = e => {
    const {
      history: { push },
    } = this.props;
    e.preventDefault();
    const { value: answers } = this.state;
    const resultPoints = rateHighestTypeTherapy(answers);
    push({
      pathname: '/result',
      state: { resultPoints },
    });
  };

  // getQuestionProps = index => {
  //   return {
  //     ...this.state.value[`Q${index + 1}`],
  //   };
  // };

  next() {
    this.setState(prevState => ({
      current: prevState.current + 1,
    }));
  }

  prev() {
    this.setState(prevState => ({
      current: prevState.current - 1,
    }));
  }

  render() {
    // const steps = renderSteps({
    //   onChange: this.onChange,
    //   state: this.state,
    //   options,
    // });
    const { current, messageForUser, value } = this.state;
    const currentStep = current + 1;
    const values = Object.keys(value);
    return (
      <Form
        onSubmit={this.handleSubmit}
        className="Questionary__form"
        {...this.props}
      >
        <Steps current={current}>
          {values.map(item => {
            return <Step key={`${item}key`} />;
          })}
        </Steps>
        <div className="steps-content">
          <Q
            keyValue={`q${currentStep}`}
            onChange={this.onChange}
            // value={this.state.value[`Q${currentStep}`]}
            options={options}
            id={`Q${currentStep}`}
          />
        </div>
        <div className="steps-action">
          {current < values.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === values.length - 1 && (
            <Button
              htmlType="submit"
              onClick={() => message.success(messageForUser)}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </Form>
    );
  }
}

BarBrogress.propTypes = {
  history: PropTypes.objectOf().isRequired,
};

export default withRouter(BarBrogress);
