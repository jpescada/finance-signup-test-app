import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { uploadDocument } from '../api/application';

interface UploadData {
  certificate: FileList;
}

interface FileUploadProps {
  onSuccess?: () => void;
}

const FileUpload: FC<FileUploadProps> = ({ onSuccess }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<UploadData>();

  const onSubmit = async (data: UploadData) => {
    const formData = new FormData();
    formData.append('document_type', 'Certificate of Incorporation');
    formData.append('certificate', data.certificate[0]);

    try {
      await uploadDocument(formData);
      if (onSuccess) onSuccess();
    } catch (error) {
      alert(`Upload failed. ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <hr />
      <div>
        <label>Certificate of Incorporation (PDF or image)</label>
        <input
          type="file"
          accept=".pdf,.jpg,.png"
          {...register('certificate', { required: 'File is required' })}
        />
        {errors.certificate && (
          <span className="error">{errors.certificate.message}</span>
        )}
      </div>
      <button type="submit">Upload file</button>
    </form>
  );
};

export default FileUpload;