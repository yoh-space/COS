import React from 'react';
import Breadcrumb from '@/components/Common/Breadcrumb';

export default function LibraryPage() {
  return (
    <>
      <Breadcrumb
        pageName="Library Services"
        description="Access our comprehensive library resources and services"
      />
      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Library Services</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Coming soon...
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
