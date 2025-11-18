import StatsCard from "../components/dashboard/StatsCard.jsx";
import StatsChart from "../components/dashboard/StatsChart.jsx";
// import TodayTasks from "../components/dashboard/TodayTask.jsx";
// import RecentActivities from "../components/dashboard/RecentActivies.jsx";
// import LatestRequests from "../components/dashboard/LatestRequests.jsx";
import { useDashboard } from "../context/DashboardContext.jsx";
import { motion } from "framer-motion";
import TasksSection from "../components/dashboard/TaskSection.jsx";
import RecentActivity from "../components/widgets/RecentActivity.jsx";
import RecentRequests from "../components/widgets/RecentRequests.jsx";
import TodayTasks from "../components/widgets/TodayTasks.jsx";
import LatestRequests from "../components/widgets/LatestRequests.jsx";
import MarketCard from "../components/widgets/marketcard.jsx";
import ProjectStatusCard from "../components/widgets/StatusTasks.jsx";
import TaskStatsCard from "../components/widgets/TaskStatusCard.jsx";
import React from "react";
import TaskDetail from "../components/widgets/taskdetails.jsx";

// Example animated card wrapper
const AnimatedCard = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="rounded-2xl shadow-lg bg-white dark:bg-gray-900 p-5 border border-gray-100 dark:border-gray-700"
  >
    {children}
  </motion.div>
);

export default function Dashboard() {
  return (
    <div className="p-6 space-y-10 transition-all duration-300 bg-white-50 min-h-screen">
      {/* === Top Stats Cards === */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatedCard delay={0.05}>
            <StatsCard title="کاربران فعال" value="1" icon="👤" />
          </AnimatedCard>
          <AnimatedCard delay={0.1}>
            <StatsCard title="تسک‌ها" value="12" icon="📝" />
          </AnimatedCard>
          <AnimatedCard delay={0.15}>
            <StatsCard title="نرخ رشد" value={"127,000"} icon="📈" />
          </AnimatedCard>
          <AnimatedCard delay={0.2}>
            <MarketCard />
          </AnimatedCard>
        </div>
      </section>

      {/* === Charts Section === */}
      <section>
        <AnimatedCard>
          <StatsChart />
        </AnimatedCard>
      </section>

      {/* === Tasks Overview === */}
      <section>
        <AnimatedCard>
          <TodayTasks />
        </AnimatedCard>
      </section>

      {/* === Project & Tasks Summary === */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedCard>
            <ProjectStatusCard />
          </AnimatedCard>
          <AnimatedCard delay={0.05}>
            <TaskStatsCard />
          </AnimatedCard>
        </div>
      </section>

      {/* === Activity Columns === */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
          {/* today's tasks */}

            <AnimatedCard>
              <RecentActivity />
            </AnimatedCard>
            <AnimatedCard delay={0.05}>
              <RecentRequests />
            </AnimatedCard>
          {/* middle — activity */}

          {/* right — latest requests */}
        </div>
        <div className="grid mt-6 gap-6">
          <AnimatedCard>
            <LatestRequests />
          </AnimatedCard>
        </div>
      </section>
    </div>
  );
}
