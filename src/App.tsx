import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Dex } from "./pages/Dex";

const App = () => {
  return (
    <div className="flex flex-col h-full bg-neutral-100 overflow-auto">
      <Header />
      <div className="mb-5">
        <Dex />
      </div>
      <Footer />
    </div>
  );
};

export default App;
