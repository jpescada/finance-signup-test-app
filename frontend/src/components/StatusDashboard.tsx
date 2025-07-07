import { FC, useEffect, useState } from 'react';
import { APPLICATION_STATUS, getStatus } from '../api/application';
import FileUpload from './FileUpload';
import StatusLabel from './StatusLabel';
import { BASE } from '../api/config';
import StatusMessage from './StatusMessage';

interface Document {
  id: number;
  document_type: string;
  file: string;
  reason: string | null;
  uploaded_at: string;
}

interface User {
  id: number;
  username: string;
}

interface Application {
  id: number;
  status: string;
  documents: Document[];
  user: User;
}

const getFileName = (filePath: string): string => {
  const parts = filePath.split('/');
  return parts[parts.length - 1];
}

const getFileUrl = (filePath: string): string => {
  return `${BASE}${filePath}`;
}

const StatusDashboard: FC = () => {
  const [application, setApplication] = useState<Application | null>(null);
  const [lastDocument, setLastDocument] = useState<Document | null>(null);

  // Fetch application status
  const fetchStatus = () => {
    getStatus()
      .then((data) => setApplication(data))
      .catch(() => alert('Could not get your application status'));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    fetchStatus();

    // Start polling if the application status is PENDING
    if (application?.status === APPLICATION_STATUS.PENDING) {
      interval = setInterval(fetchStatus, 60000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [application?.status]);

  useEffect(() => {
    if (application && application.documents.length > 0) {
      setLastDocument(application.documents[application.documents.length - 1]);
    }
  }, [application]);

  if (!application) return <div className="loading">Loading...</div>;

  return (
    <div className="container status-container">
      {application.status !== APPLICATION_STATUS.PUSHBACK && (
        <>
          <h2>Application Status: <StatusLabel status={application.status} /></h2>
          <StatusMessage status={application.status} reason={lastDocument?.reason} />
        </>
      )}

      {application.status === APPLICATION_STATUS.PUSHBACK && (
        <>
          <h2>Your application was pushed back</h2>
          <p>
            <b>We need more information to proceed.</b> 
          </p>
          {lastDocument && <p>The last document submitted:</p>}
          <hr />
          <p>
            {lastDocument && (
              <a href={getFileUrl(lastDocument?.file)} target="_blank" rel="noopener noreferrer">
                {getFileName(lastDocument?.file)}
              </a>
            )}
          </p>
          <p className="reason">
            {lastDocument?.reason || 'No reason provided'}
          </p>
          <FileUpload onSuccess={fetchStatus} />
        </>
      )}
    </div>
  );
};

export default StatusDashboard;