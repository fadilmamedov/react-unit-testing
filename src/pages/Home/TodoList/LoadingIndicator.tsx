import { Dots } from 'react-activity';
import 'react-activity/dist/Dots.css';

export const LoadingIndicator = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <Dots size={30} color="#3b82f6" />
  </div>
);
