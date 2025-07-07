import { FC } from 'react';
import { APPLICATION_STATUS } from '../api/application';

interface StatusMessageProps {
  status: string;
  reason?: string | null;
}

const StatusMessage: FC<StatusMessageProps> = ({ status, reason }) => {
  return (
    <div className="status-message">
      {reason && <p>{reason}</p>}

      {!reason && status === APPLICATION_STATUS.PENDING && (
        <p>We are currently reviewing your application.</p>
      )}
      
      {!reason && status === APPLICATION_STATUS.APPROVED && (
        <p>Congratulations! Your application has been approved.</p>
      )}
      
      {!reason && status === APPLICATION_STATUS.REJECTED && (
        <p>Sorry, your application has been rejected.</p>
      )}
    </div>
  );
};

export default StatusMessage;
