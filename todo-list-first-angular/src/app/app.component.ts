import { Component } from '@angular/core';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  config: { [key: string]: string } = null;
  editMode = false;
  taskName = 'Sugerowane zadanie codziennie: odkurzanie';
  taskDate: '';
  tasks: Task[] = [
    {
      name: 'Silownia',
      deadline: '2020-01-02',
      done: false,
    },
    {
      name: 'Nauka Angulara',
      deadline: '2020-01-03',
      done: true,
    },
    {
      name: 'Sprzatanie kuwety',
      deadline: '2020-01-04',
      done: false,
    },
    {
      name: 'Obiad',
      deadline: '2020-01-06',
      done: false,
    },
    {
      name: 'Praca',
      deadline: '2020-01-04',
      done: false,
    }
  ];

  constructor() {
    setTimeout(() => {
      this.config = {
        title: 'Lista zadan',
        footer: ' Lista zadan zbudowana w Angularze',
        date: new Date().toDateString()
      };
    }, 500);
    this.sortTasks();
  }

  clearTasks(){
    this.tasks = [];
  }

  createTask(){
    const task: Task = {
      name: this.taskName,
      deadline: this.taskDate,
      done: false
    };
    this.tasks.push(task);
    this.taskName = '';
    this.taskDate = '';
    this.sortTasks();
  }

  switchEditMode(){
    this.editMode = !this.editMode;
  }

  markTaskAsDone(task: Task){
    task.done = true;
    this.sortTasks();
  }

  deleteTask(task: Task){
    this.tasks = this.tasks.filter(e => e !== task);
    this.sortTasks();
  }

  private sortTasks(){
    this.tasks = this.tasks.sort((a: Task, b: Task) =>
    a.done === b.done ? 0 : a.done ? 1: -1
    );
  }
}
