## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Back End Setup](#back-end-setup)
* [Front End Setup](#front-end-setup)
* [Contact](#contact)

## General info
This is a simple user-facing webapp that allows the user to filter for restaurants open by date time as well as restaurant name. On top of that, users can save restaurants into their own named collections (eg. Vegetarian favourites, Meat-lovers etc.).

## Technologies
Project is created with:
* [React.js](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Material UI](https://v4.mui.com/)
* [Django REST framework](https://www.django-rest-framework.org/)
* [PostgreSQL](https://www.postgresql.org/)

## Back End Setup
To run this project, run the following commands:  
#### Note: 
1. Please add your PostgreSQL server credential in ~/rsms.api/rsms/rsms/settings.py file's ```DATABASES``` object
2. Please create a database named "rsms"
```
cd ~/rsms.api/
pip install -r requirements.txt
cd ~/rsms.api/rsms/
python manage.py migrate
python manage.py loaddata restaurant.json
python manage.py loaddata restaurant_open_closed_info.json
python manage.py runserver
```
###### You can view the api documentation here : 
```schema-swagger-ui:``` http://127.0.0.1:8000/ 
```schema-redoc:``` http://127.0.0.1:8000/redoc

## Front End Setup
To run this project, install it locally using npm:

```
cd ~/rsms.web/rms/
npm install
npm start
```

## Contact

Md Nurul Hasan - [@Linkedin](https://www.linkedin.com/in/hasan999/) - hasan.sust.cse13@gmail.com
