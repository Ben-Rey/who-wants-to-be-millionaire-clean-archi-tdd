import { CurrentQuestion } from "./who-wants-to-be-millionaire/adapters/primary/components/currentQuestion.component";
import { Jokers } from "./who-wants-to-be-millionaire/adapters/primary/components/jokers.component";
import { Pyramid } from "./who-wants-to-be-millionaire/adapters/primary/components/pyramid.component";

function App() {
  return (
    <div className="App">
      <div className="flex justify-between mx-3">
        <div className="flex flex-col w-6/12">
          <CurrentQuestion />
        </div>
        <div className="flex flex-col w-3/12">
          <Jokers />
          <Pyramid />
        </div>
      </div>
    </div>
  );
}

export default App;
