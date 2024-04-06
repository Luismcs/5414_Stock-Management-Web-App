# Eletrodomestic Stock Management Web App

## Objective

The objective of this project is to develop a web application for managing a stock of household appliances. The application allows users to perform operations such as adding, editing, removing, and viewing appliances in stock.

## Features

### Redirection and Login

- Upon opening any page, if the user's name is not stored in the Cookies, redirect the user to the login page.
- The login page should include a form to input a username and password.
- Simulate a successful login if you enter "[your name]" and a "[password of your choice]". Any other name or password will result in a login failure.
- Upon successful login, the user's name should be stored in Cookies, with a validity of 8 hours, and redirect to the main page.

### Main Page and Stock Management

- The main page should display a list of household appliances and an option to add a new appliance.
- The data for each appliance includes: id, name, brand, model, price, quantity in stock.
- Use Local Storage to store appliance data.
- If the quantity in stock is less than 2, the number should be displayed in red.

### Editing and Removal

- It should be possible to edit and remove appliance records from the list.

### Additional Table Functionality

- Implement a search functionality by the name of an appliance.
- Implement the ability to sort the list by quantity in stock.

### User Interface

- All pages should display the project name as a logo (an icon or an image and/or text of your choice).
- Include a navigation menu.
- Display a greeting message with the user's name (example: "Hello, John Doe!").
- Include a footer with your "signature" and the tools your Web App utilizes.
- You can use a library or framework of styles, but NOT a template.

### Final Adjustments

- Code review and cleanup.
- User feedback.
- User interface.
- Other relevant features you find necessary.

## Technologies Used

- JavaScript
- HTML
- CSS

## Instructions

1. Clone the repository.
2. Open the project in your preferred code editor.
3. Run the application using a web server.
4. Access the application through a web browser.

## Future Updates

- Add the ability to track the history of stock changes.
- Enhance the user interface with interactive charts and graphs for better data visualization.


<div align="center">
  <img src="https://github.com/Luismcs/5414_Stock-Management-Web-App/blob/main/Appliance%20Stock%20Management%20Web%20App/images/login.png" alt="Stock Management Login">
</div>

<div align="center">
  <img src="https://github.com/Luismcs/5414_Stock-Management-Web-App/blob/main/Appliance%20Stock%20Management%20Web%20App/images/list.png" alt="Stock Management List">
</div>

<div align="center">
  <img src="https://github.com/Luismcs/5414_Stock-Management-Web-App/blob/main/Appliance%20Stock%20Management%20Web%20App/images/add.png" alt="Stock Management Add">
</div>
