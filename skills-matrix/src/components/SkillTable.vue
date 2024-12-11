<script setup>
import { ref } from 'vue'; // Import ref for reactivity

const skills = ref([
  { category: "Layout", area: "Flexbox", description: "Ability to create responsive layouts", level: "Intermediate", demo: "#" },
  { category: "Layout", area: "Grid", description: "Ability to create complex grid-based layouts", level: "Intermediate", demo: "#" },
  { category: "Styling", area: "Animations", description: "Creating smooth animations using keyframes", level: "Beginner", demo: "#" },
]);

function addRow() {
  skills.value.push({
    category: "New Category",
    area: "New Skill Area",
    description: "New Description",
    level: "Beginner",
    demo: "#",
  });
}
</script>


<template>
    <div class="container">
      <table class="table">
        <caption>CSS Skills Matrix</caption>
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Skill Area</th>
            <th scope="col">Description</th>
            <th scope="col">Skill Level</th>
            <th scope="col">Demonstration</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(skill, index) in skills" :key="index">
            <td>{{ skill.category }}</td>
            <td>{{ skill.area }}</td>
            <td>{{ skill.description }}</td>
            <td>{{ skill.level }}</td>
            <td><a :href="skill.demo">View Example</a></td>
          </tr>
        </tbody>
      </table>
      <button @click="addRow">Add Skill</button>
    </div>
  </template>
  
  

<style scoped>
.container {
    padding: 20px;
    font-family: 'Arial', sans-serif; /* Modern sans-serif font */
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 16px;
    text-align: left;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adds shadow for depth */
}

.table caption {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
}

.table thead {
    background: linear-gradient(90deg, #4caf50, #81c784); /* Adds gradient */
    color: white;
}

.table th, .table td {
    padding: 15px;
}

.table tbody tr:nth-child(even) {
    background-color: #f9f9f9; /* Alternating row color */
}

.table tbody tr:hover {
    background-color: #f1f1f1; /* Row highlight on hover */
    cursor: pointer;
}

.table th {
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.table td {
    color: #555;
}

.table a {
    text-decoration: none;
    color: #4caf50; /* Modern link color */
    font-weight: bold;
}

.table a:hover {
    text-decoration: underline;
    color: #388e3c;
}

button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease, transform 0.2s ease;
    display: block; /* Aligns below the table */
    margin: 20px auto; /* Centers the button horizontally */
}

button:hover {
    background-color: #45a049;
    transform: scale(1.05); /* Slight scaling effect */
}



</style>