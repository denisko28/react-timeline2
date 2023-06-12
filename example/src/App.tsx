import React from "react";
import { Task, ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "./components/view-switcher";
import { getStartEndDateForProject, initTasks } from "./helper";
import "gantt-task-react/dist/index.css";

function NameComponent(t: any) {
  return <div>{t.name}</div>;
}

// Init
const App = () => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Hour);
  const [tasks, setTasks] = React.useState<Task[]>(initTasks());
  const [isChecked, setIsChecked] = React.useState(true);
  let columnWidth = 65;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const handleTaskChange = (task: Task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm("Are you sure about " + task.groupName + " ?");
    if (conf) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task: Task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(
      task.groupName + " has " + (isSelected ? "selected" : "unselected")
    );
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  const tasksdef: Task[] = [
    {
      start: new Date("2023-05-28T00:00:00.000Z"),
      end: new Date("2023-05-28T06:00:00.000Z"),
      project: "dcfdf",
      userName: "Mykola",
      groupName: "Idea",
      id: "Task 0",
      type: "task",
      progress: 100,
      isDisabled: true,
      styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
    },
    {
      start: new Date("2023-05-28T08:00:00.000Z"),
      end: new Date("2023-05-28T10:00:00.000Z"),
      project: "dcfdf",
      groupName: "Idea",
      id: "Task 1",
      type: "task",
      progress: 100,
      isDisabled: true,
      styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
    },
    {
      start: new Date("2023-05-28T04:00:00.000Z"),
      end: new Date("2023-05-28T07:00:00.000Z"),
      project: "dcfdf",
      groupName: "Idea 1",
      id: "Task 2",
      type: "task",
      progress: 100,
      isDisabled: true,
      styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
    },
  ];

  return (
    <div>
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <h3>Gantt With Unlimited Height</h3>
      <Gantt
        tasks={tasksdef}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "200px" : ""}
        columnWidth={columnWidth}
        nameCellComponent={NameComponent}
        viewDate={new Date("2023-05-28T03:00:00.000Z")}
        todayColor="#ff00003d"
        hasScrollbars={{ bottom: true }}
      />
      {/* <h3>Gantt With Limited Height</h3>
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "400px" : ""}
        ganttHeight={300}
        columnWidth={columnWidth}
        nameCellComponent={<div>stringa componente</div>}
      /> */}
    </div>
  );
};

export default App;
