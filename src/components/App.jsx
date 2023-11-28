import React, { Component } from 'react';
import Statistics from './Statistics/StatisticFeeadback';
import FeedbackOptions from './Feedback/FeedbackOptions';
import Section from './Notification/Section';
import Notification from './Notification/NotificationFeedback';
import styles from './App.module.css';
class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleFeedback = option => {
    this.setState(prevState => ({
      [option]: prevState[option] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + bad + neutral;
  };

  countPositiveFeedbackPercentage = () => {
    const totalFeedback = this.countTotalFeedback();
    const { good } = this.state;
    return totalFeedback === 0 ? 0 : Math.round((good / totalFeedback) * 100);
  };

  render() {
    const { good, neutral, bad } = this.state;
    const totalFeedback = this.countTotalFeedback();
    const countPositive = this.countPositiveFeedbackPercentage();

    const options = ['good', 'neutral', 'bad'];

    return (
      <div class={styles.container}>
        <div>
          <Section title="Give Feedback">
            <FeedbackOptions
              options={options}
              onLeaveFeedback={this.handleFeedback}
            />
          </Section>
        </div>
        {totalFeedback === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <div>
            <Section title="Statistics">
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={totalFeedback}
                positivePercentage={countPositive}
              />
            </Section>
          </div>
        )}
      </div>
    );
  }
}

export default App;
