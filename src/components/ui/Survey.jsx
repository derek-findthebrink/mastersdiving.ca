import React, { useState, useEffect } from 'react';
// import sc from 'survey-core';
// import sru from 'survey-react-ui';
import 'survey-core/survey-core.min.css';
import surveyStructure from './idive-program-cancellation-survey.js';

const API_URL = 'http://localhost:8000/api';
const IS_ENABLED = false;

class SurveyAPI {
  async anon() {
    await fetch(`${API_URL}/anon/`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
  }
  async surveyCompletions(body) {
    const response = await fetch(`${API_URL}/email-completions/`, {
      body,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    return [response, await response.json()];
  }
}

const EmptyMessage = () => <p>This is still under development. Check back soon!</p>;

export default function Survey({ isEnabled = IS_ENABLED }) {
  const [surveyInstance, setSurveyInstance] = useState(null);
  const api = new SurveyAPI();
  const SURVEY_KEY = 'survey__idive-cancellation__responses';

  useEffect(() => {
    const importComponent = async () => {
      const surveyUI = await import('survey-react-ui');
      const surveyCore = await import('survey-core');
      const model = new surveyCore.Model(surveyStructure);

      const prevData = window.localStorage.getItem(SURVEY_KEY);
      if (prevData) {
        model.data = JSON.parse(prevData);
      }

      model.onComplete.add(async (sender, options) => {
        options.showSaveInProgress();
        const surveyResponses = JSON.stringify(sender.data, null, 2);
        console.log(surveyResponses);
        window.localStorage.setItem(SURVEY_KEY, surveyResponses);
        try {
          const [response, data] = await api.surveyCompletions(surveyResponses);
          if (response.status === 200) {
            options.showDataSavingSuccess();
          } else {
            options.showDataSavingError('Looks like there was an error saving your data. Please try again later.');
          }
        } catch (e) {
          options.showSaveError('Looks like there was an error saving your data. Please try again later.');
        }
      });

      setSurveyInstance(<surveyUI.Survey model={model} />);
    };
    if (isEnabled) {
      importComponent();
    }
  }, []);

  useEffect(() => {
    api.anon();
  }, []);
  return (
    <div>
      <h3>Email Builder</h3>
      {surveyInstance || <EmptyMessage />}
    </div>
  );
}
