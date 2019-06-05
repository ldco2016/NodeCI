// SurveyFormReview shows users their form inputs for review
import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import formFields from "./formFields";
import * as actions from "../../actions";

class SurveyFormReview extends Component {
  state = { file: null };

  renderFields() {
    const { formValues } = this.props;

    return _.map(formFields, ({ name, label }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <label>{formValues[name]}</label>
        </div>
      );
    });
  }

  renderButtons() {
    const { onCancel } = this.props;

    return (
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
    );
  }

  onSubmit(event) {
    event.preventDefault();

    const { submitSurvey, history, formValues } = this.props;

    submitSurvey(formValues, this.state.file, history);
  }

  onFileChange(event) {
    this.setState({ file: event.target.files[0] });
    console.log(event.target.files);
  }

  render() {
    return (
      <div>
        <h5>Please confirm your entries</h5>
        {this.renderFields()}
        <h5>Add an Image</h5>
        <input
          onChange={this.onFileChange.bind(this)}
          type="file"
          accept="image/*"
        />
        {this.renderButtons()}
        <button
          onClick={this.onSubmit.bind(this)}
          className="green btn-flat right white-text"
        >
          Send Survey<i className="material-icons right">email</i>
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
