import React, { useState } from 'react';
import Nav from '../../component/Nav';
import Aside from '../../component/Aside';
import OverviewG from '../../component/Groupcomponent/OverviewG'; 
import GroupManagement from '../../component/Groupcomponent/Manage_Group'; 
import Aside_v2 from '../../component/Aside_v2';

function Groups() {
  const [activeTab, setActiveTab] = useState('overview');
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewG />;
      case 'manage':
        return <GroupManagement />;
      default:
        return <OverviewG />;
    }
  };

  return (
    <div className=" h-screen">

      <Aside_v2  />

      <div className=" mt-15 ml-24 transition-all duration-300 peer-hover:ml-64  h-screen">
 
        <Nav />

        <div className="p-4  pt-20 border-b border-gray-200 dark:border-gray-700 ">
          <ul className="flex justify-center flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li className="me-2">
              <button
                onClick={() => setActiveTab('overview')} 
                className={`focus:text-blue-600 focus:border-blue-600 inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${activeTab === 'overview' ? 'text-blue-600 border-blue-600' : ''}`}
              >
                <svg
                  className="group-focus:text-blue-600 w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                  />
                </svg>
                Overview
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => setActiveTab('manage')}
                className={`focus:text-blue-600 focus:border-blue-600 inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${activeTab === 'manage' ? 'text-blue-600 border-blue-600' : ''}`}
              >
                <svg
                  className="w-4 h-4 me-2 group-focus:text-blue-600 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                Manage Groups
              </button>
            </li>
          </ul>
        </div>

        <div className="p-4">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default Groups;
