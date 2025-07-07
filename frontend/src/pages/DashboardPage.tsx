import { LogoutButton } from '../components/LogoutButton';
import StatusDashboard from '../components/StatusDashboard';

const DashboardPage = () => {
  return (
    <div className="page">
      <div>
        <h1>Dashboard</h1>
        <StatusDashboard />
        <footer>
          <LogoutButton />
        </footer>
      </div>
    </div>
  );
};

export default DashboardPage;