import './App.css';
import SideBar from './components/SideBar';
import DataPage from './components/DataPage';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

function App() {

  const [page, setPage] = useState<number>(0)

  return (<>
  <Helmet>
    <title>Probafeladat</title>
    <link rel="icon" type="image/png" href="8274432.png" sizes="16x16" />
  </Helmet>
      <div style={styles.container}>
        <SideBar setPage={setPage} />
        <DataPage setPage={setPage} page={page} style={{width:'80vw'}} />
      </div>
    </>);
}

export const styles = {
  container: {
    display: 'flex',
    flex: 'row',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#100'
  },
  p: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Arial',
    padding: 5
  }
}

export default App;
