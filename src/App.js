import './App.css';
import Navbar from './components/Navbar.jsx';
import MintComponent from './components/MintComponent.jsx';
import ShowNfts from './components/ShowNfts';
import CanvasScroll from './components/ScrollSection';
import ScrollingText from './components/ScrollingText';
import Footer from './components/Footer';
import AboutSection from './components/About';

function App() {
  return (
    <div className="App">
      <div style={{ position: 'relative' }}>
        <ScrollingText />
        <CanvasScroll
          firstFrame="https://raw.githubusercontent.com/raggi-eth/frames/main/frames3/canvas00001.webp"
          frameCount="192"
          frameScrollArea="8000"
        />
      </div>
      <Navbar />
      <div className="responsive-container">
        <MintComponent />
        <ShowNfts />
      </div>
      <AboutSection />
      <Footer />

    </div>
  );
}

export default App;
