import './App.css';
import Alphabet from './Alphabet';
import Button from './Button';
import { useState } from 'react';
import Input from './Input';

const App = () => {
  const [myOnlyVowel, setOnlyVowel] = useState(false);
  const [myText, setMyText] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <Alphabet onlyVowels={myOnlyVowel}>
          <div className="flex gap-5 flex-col">
            <Button onClick={() => setOnlyVowel(prevState => !prevState)}>
              {myOnlyVowel ? 'Voyelle' : 'Tout'}
            </Button>

            <Input text={myText} onChange={setMyText} />
            {myText}
          </div>
        </Alphabet>
      </header>
    </div>
  );
}

export default App;
