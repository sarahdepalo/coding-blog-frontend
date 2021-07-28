import { BrowserRouter as Router } from 'react-router-dom';
import BlogList from './components/BlogList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1> // Ned's Declassified Coding Survival Guide </h1>
      <p>On the fence about attending a coding bootcamp? Choose one of the blogs below to learn more about other coder's journies to help you decide if a bootcamp is the right path for you.</p>
      <Router>
        <BlogList />
      </Router>
    </div>
  );
}

export default App;
