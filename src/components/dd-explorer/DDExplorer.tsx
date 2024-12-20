import * as React from 'react';
import DDTable from './DDTable'

export default class DDExplorer extends React.Component {
  render(): JSX.Element {
    return (
      <div className="mt-4 mb-4">
        <h2 className="font-heading font-bold text-heading text-xl">Degree of Difficulty Explorer</h2>
        <DDTable />
      </div>
    )
  }
}
