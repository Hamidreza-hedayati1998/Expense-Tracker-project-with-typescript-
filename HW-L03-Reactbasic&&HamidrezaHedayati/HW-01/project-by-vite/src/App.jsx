import CardProduct from './components/CardProduct';
import './App.css'
const items=[{name:"laptop",price:999,description:"High-performance laptop"},
  {name:"Phone",price:699,description:"Lastet smartPhone"},
  {name:"headphone",price:199,description:"Noise-cancelling"},
];
function App() {

  return (
    <>
     <CardProduct products={items} />
    </>
  )
}

export default App
