import { createRoot } from 'react-dom/client';
import { HomePage } from './pages/home/home';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<HomePage />);
