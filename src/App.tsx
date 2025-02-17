import { useEffect, useState } from 'react';
import getAllIssues from './services/Issues';
import getAllMilestones from './services/Milestone';
import { Issue } from './interfaces/Issue';
import { Milestone } from './interfaces/Milestone';
import Burndown from './components/Burndown';
import './App.css';

function App() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [sprint, setSprint] = useState<string>();
  const [selectedSprint, setSelectedSprint] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchIssues() {
      const issues = await getAllIssues();
      console.log('Issues:', issues);
      setIssues(issues);
    }

    async function fetchMilestone() {
      const milestones = await getAllMilestones();
      console.log('Milestones:', milestones);
      setMilestones(milestones);
      setSprint(milestones[0].title);
    }
    fetchIssues();
    fetchMilestone();
  }, []);

  const handleSprintChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sprint = event.target.value;
    setSelectedSprint(sprint);
    setSprint(sprint);
    // Carregar dados adicionais, se necessário
  };
  return (
    <>
      <header>
        <h1 className='title'>
          Dashboard Khali
        </h1>
        <div className='config'>
          <select value={selectedSprint} onChange={handleSprintChange}>
            {milestones.map(milestone => (
              <option key={milestone.number} value={milestone.title}>
                {milestone.title}
              </option>
            ))}
          </select>
        </div>
      </header>
      <main>
        <div className='conteiner'>
          <div className='burndown'>
            <Burndown labels={["01", "02", "03", "04", "05"]} distribution={[12, 6, 3, 1, 0]} points={[12, 10, 8, 6, 3]} />
          </div>
        </div>
      </main>
      {/* <div>
        Iniciando projeto
      </div>
      <div>
        <h2>Issues:</h2>
        {issues.map(issue => (
          <div key={issue.id}>{issue.title}</div>
        ))}
      </div>
      <br></br>
      <div>
        <h2>Milestones:</h2>
        {milestones.map(milestone => (
          <div key={milestone.number}>{milestone.title}</div>
        ))}
      </div> */}
    </>
  );
}


export default App;