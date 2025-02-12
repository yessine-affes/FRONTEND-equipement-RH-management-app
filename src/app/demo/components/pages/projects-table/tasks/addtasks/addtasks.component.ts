import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addtasks',
  templateUrl: './addtasks.component.html', // Corrected HTML reference
  styleUrls: ['./addtasks.component.scss'],
})
export class AddTasksComponent implements OnInit {
  task = {
    description: '',
    start_date: '',
    end_date: '',
    status: 'pending',
  };

  statuses = [
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' },
  ];

  constructor() {}

  ngOnInit(): void {}

  // Placeholder for future save function
  saveTask(): void {
    console.log('Task saved:', this.task);
  }

  // Placeholder for future cancel function
  cancel(): void {
    console.log('Cancelled');
  }
}
