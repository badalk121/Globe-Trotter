import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (message, type = 'info') => {
  toast[type](message);
};

const Notification = () => {
  return <ToastContainer />;
};

export default Notification;
