import DDTable from './DDTable';

const DDExplorer = () => (
  <div className="mt-4 mb-4">
    <DDTable />

    <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="font-bold text-xl md:text-2xl leading-tight tracking-tight mb-2">
        About
      </h3>
      <div className="prose prose-lg dark:prose-invert">
        <p>
          Explore diving degrees of difficulty across all boards. This dataset was loaded from the November 2024 issue
          of World Aquatics Competition regulations.
        </p>
      </div>
    </div>
  </div>
);

export default DDExplorer;
