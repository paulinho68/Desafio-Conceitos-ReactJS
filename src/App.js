import React,{useState, useEffect} from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState(null);

  useEffect(() => {
    api.get('/repositories').then( res => {
      setRepositories(res.data);
    });
  }, [])

  async function handleAddRepository() {
    await api.post('/repositories', {
      title:"Teste 99",
      url:"www.github.com/paulinho68/teste00",
      techs:["logica", "js", "java"]
    }).then(res => {
      console.log(res);
      setRepositories([
        ...repositories,
        res.data
      ])
    })
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories( repositories.filter(item => item.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories ? repositories.map(repo => (
          <li key={repo.id}>{repo.title} <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </li>
        ))
        :null}
      </ul>
      <div>
        <label htmlFor=""></label>
      </div>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
