<script lang="js">

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
            <tr>
                <td>Layout</td>
                <td>Flexbox</td>
                <td>Ability to create responsive layouts using flexbox</td>
                <td>Advanced</td>
                <td><a href="#">View Example</a></td>
            </tr>
            <tr>
                <td>Layout</td>
                <td>Grid</td>
                <td>Ability to create complex grid-based layouts</td>
                <td>Intermediate</td>
                <td><a href="#">View Example</a></td>
            </tr>
            <tr>
                <td>Styling</td>
                <td>Animations</td>
                <td>Creating smooth animations using keyframes</td>
                <td>Beginner</td>
                <td><a href="#">View Example</a></td>
            </tr>
        </tbody>
    </table>
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


</style>