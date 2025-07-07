import { FC } from 'react';

interface StatusLabelProps {
  status: string;
}

const StatusLabel: FC<StatusLabelProps> = ({ status }) => {
  const statusClass = `status-label ${status.toLowerCase()}`;

  return (
    <span className={statusClass}>
      {status}
    </span>
  );
};

export default StatusLabel;
