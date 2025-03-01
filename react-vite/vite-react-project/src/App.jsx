/* eslint-disable no-unused-vars */
import './App.css'
import Button from './components/Button';
import Card from './components/card';
import List from './components/List';
const componies=[{name:"BMW",price:33000},{name:"BENZ",price:73000}];
function App() {
 const handelselectItem=(item)=>{
  console.log("item",item);
 };
  return (
  <>
    <label style={{color:"red"}}>Hello friends</label>
    <Card>
      <List items={componies} onClick={handelselectItem}  label="list of companies machine"/>
      <Button/>
    </Card>
  </>
  );
};

export default App
