const todoList = [];
        function addtask() {
            const taskInput = document.querySelector('#task');
            const dateInput = document.querySelector('#date');

            const taskName = taskInput.value;
            const taskDate = dateInput.value;

            if (taskName && taskDate) { // Ensure both fields are filled
                todoList.push({ name: taskName, Time: taskDate });
                console.log(todoList);

                // Clear input fields
                taskInput.value = '';
                dateInput.value = '';

                // Create a new task item
                const taskItem = document.createElement('div');
                taskItem.className = 'task-item';

                const text = document.createElement('p');
                text.textContent = `Task: ${taskName}`;

                const date = document.createElement('p');
                date.textContent = `Time: ${taskDate}`;

                const deleteButton = document.createElement('button');
                deleteButton.className='delete-button'
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function() {
                    taskItem.remove();
                    tasks.style='border:none;background-color: transparent;' 
                };
                const editButton = document.createElement('button');
                editButton.className='edit-button';
                editButton.style='background-color:rgb(226, 226, 23);color:black'
                editButton.textContent = 'Edit';
                editButton.onclick = function() {
                    const editedText=prompt("enter task");
                     text.textContent=`Task: ${editedText}`
                };
                const completedButton = document.createElement('button');
                completedButton.className = 'completed-button';
                completedButton.style='background-color:green;';    
                completedButton.textContent = 'completed';
                completedButton.onclick = function(){
                    taskItem.remove();
                    tasks.style='border:none;background-color: transparent;'
                    const ctaskItem = document.createElement('div');
                    ctaskItem.className = 'completed-task-item';

                    const ctext = document.createElement('p');
                    ctext.textContent = `Task: ${taskName} (completed)`;

                    const cdate = document.createElement('p');
                    cdate.textContent = `Time: ${getCurrentTime() }`;

                    const cdeleteButton = document.createElement('button');
                    cdeleteButton.className='delete-button'
                    cdeleteButton.textContent = 'Delete';
                    cdeleteButton.onclick = function() {
                        ctaskItem.remove(); // Remove the task item from the DOM
                    };

                    ctaskItem.appendChild(ctext);
                    ctaskItem.appendChild(cdate);
                    ctaskItem.appendChild(cdeleteButton);

                    document.getElementById('completed-tasks').appendChild(ctaskItem);
                }

                // Append elements to the task item
                taskItem.appendChild(text);
                taskItem.appendChild(date);
                taskItem.appendChild(deleteButton);
                taskItem.appendChild(editButton);
                taskItem.appendChild(completedButton);


                // Append the task item to the tasks container
                const tasks=document.getElementById('tasks');
                tasks.style='border: 1px solid black;background-color: white;';
                tasks.appendChild(taskItem);
            } else {
                alert("Please enter both a task and a date."); // Alert if fields are empty
            }
        }
        function getCurrentTime() {
            const time = new Date();
            let hours = time.getHours();
            const minutes = time.getMinutes();
            const seconds = time.getSeconds();
            const meridian = hours >= 12 ? 'PM' : 'AM';
        
            hours = hours % 12 || 12;
            return `${zeropad(hours)}:${zeropad(minutes)}:${zeropad(seconds)} ${meridian}`;
             function zeropad(number){
            return (number < 10 ? '0' : '') + number;
        }
        }