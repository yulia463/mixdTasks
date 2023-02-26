import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type todolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [

            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(todoListID:string,id: string) {
        setTasks({...tasks,[todoListID]:tasks[todoListID].filter(f => f.id != id)})

        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(todoListID:string,title: string) {
         let newTask = {id: v1(), title: title, isDone: false};
         setTasks({...tasks,[todoListID]:[...tasks[todoListID],newTask]  })

        // let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(todoListID:string,taskId: string, isDone: boolean) {

        setTasks({...tasks,[todoListID]:tasks[todoListID].map(el=>el.id ===taskId ?{...el,isDone}  : el)})
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
    }

    function changeFilter(todoListID:string,value: FilterValuesType) {
        setTodolists(todolists.map(filtered => filtered.id === todoListID ? {...filtered, filter:value } :filtered));
    }


    return (
        <div className="App">
            {todolists.map(el => {
                let tasksForTodolist = tasks [el.id];
                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }

                return (
                    <Todolist key={el.id}
                        todoListID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;
