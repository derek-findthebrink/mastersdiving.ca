import React, { useState, useEffect } from 'react';
// import sc from 'survey-core';
// import sru from 'survey-react-ui';
import 'survey-core/modern.min.css';
import surveyStructure from './idive-program-cancellation-survey.js';

export default function Survey() {
  const [surveyInstance, setSurveyInstance] = useState(null);

  useEffect(() => {
    const importComponent = async () => {
      const surveyUI = await import('survey-react-ui');
      const surveyCore = await import('survey-core');
      const model = new surveyCore.Model(surveyStructure);
      model.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
      });

      setSurveyInstance(<surveyUI.Survey model={model} />);
    };
    importComponent();
  }, []);
  return <div>{surveyInstance}</div>;
}
