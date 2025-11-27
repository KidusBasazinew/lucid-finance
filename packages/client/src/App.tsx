import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from './components/ui/button';

const App = () => {
   const [test, setTest] = useState<string>('');

   useEffect(() => {
      async function getTest() {
         const res = await axios.get('/api/test'); // Vite proxy → backend
         setTest(res.data);
      }
      getTest();
   }, []);

   return (
      <div>
         {test}
         <Button>hi</Button>
      </div>
   );
};

export default App;
