import React from 'react';
import Stats from './StatsA';
import classes from "../assets/presentation.png";
import student from "../assets/graduation.png";
import teacher from "../assets/school.png";
import table from "../assets/schedule.png";
import group from "../assets/multiple-users-silhouette.png";
import department from "../assets/structure.png";
import subject from "../assets/justify-paragraph.png";
import Note from './Note';
import Cal from './Cal';
import { Badge, Card } from 'antd';
import { AnimatedTooltip } from './dashcomp/animated-tooltip';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Aside_v2 from './Aside_v2_admin';
import Pie from './Pie';
import Usage from './Usage';
import DataTransferStats from './DataTransferStats';
import MongoStats from './MongoStats';

function SuperAdminDash() {
    const sessionId = useSelector((state) => state.session.value);

    return (
        <>
            <Aside_v2 />
            <main className="ml-24 mt-15 pt-14 transition-all duration-300 peer-hover:ml-64 h-screen p-4" style={{ height: "100vh" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div>
                        <Stats img={classes} api="http://localhost:5000/session-count" subject={false}
                               text="Total Universities"/>
                    </div>
                    <div>
                        <Stats img={student} api="http://localhost:5000/get-total-student" subject={false}
                               text="Total Student"/>
                    </div>
                    <div>
                        <Stats img={teacher} api="http://localhost:5000/get-total-teacher" subject={false}
                               text="Total Teacher"/>
                    </div>
                    <div>
                        <Stats img={table} api="http://localhost:5000/get-total-admins" subject={false}
                               text="Total Admins"/>
                    </div>
                    <div>
                        <Stats img={table} api="http://localhost:5000/total-users" subject={false}
                               text="Total Users On firebase"/>
                    </div>
                </div>

                <h3 className="my-16 mb-4 text-xl font-bold tracking-tight leading-none text-gray-900 dark:text-white">
                    Mongo Db Stats
                </h3>

                <div className="p-9 flex rounded-lg gap-10 border-gray-300 dark:border-gray-600 h-[90%] mb-4">
                    <Pie />
                    <Usage />
                </div>

                <div className="my-10 w-full rounded-lg shadow-lg border-gray-300 dark:border-gray-600 gap-10 p-6">
                    <MongoStats />
                </div>

                <div className="flex w-full h-[90%] rounded-lg shadow-lg border-gray-300 dark:border-gray-600 mb-4">
                    <DataTransferStats />
                </div>
            </main>
        </>
    );
}

export default SuperAdminDash;
