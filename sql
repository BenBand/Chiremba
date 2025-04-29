/*  CREATING THE CHIREMBA DATABASE */
CREATE DATABASE chiremba_db

/*  CREATING THE SIGN IN TABLE */
CREATE TABLE chiremba_user_in (user_id INT AUTO_INCREMENT,
                               Username INT,
                               user_password VARCHAR (225),
                               PRIMARY KEY (user_id, user_password));

/*  CREATING THE intro TABLE */
CREATE TABLE intro_tb(society_aid VARCHAR(25),
                      treatment_cause VARCHAR(25),
                      NEEDS TO HAVE AN ID OF THE USER AS A FOREIGN KEY);


/*  CREATING THE chiremba TABLE */
CREATE TABLE chiremba_tb(student_name VARCHAR(100) NOT NULL,
                         parents_number VARCHAR(15),
                         student_id INT,
                         student_number VARCHAR(15),
                         gender VARCHAR(6),
                         PRIMARY KEY(parents_number, student_number, student_id))



                         



/*  CREATING THE chirembaAU TABLE */
CREATE TABLE chirembaAU_tb(date_of_birth VARCHAR(50) NOT NULL,
                           faculty_or_department  VARCHAR(30) NOT NULL,
                           allergies VARCHAR(100),
                           nationality VARCHAR(50),
                           marital_status VARCHAR(25));

/*  CREATING THE reception TABLE */
CREATE TABLE reception_tb (
                        body_temperature VARCHAR(50),
                        blood_pressure VARCHAR(50),
                        body_weight VARCHAR(225) DEFAULT 180,
                        body_height VARCHAR(225) DEFAULT 175);

/*  CREATING THE doctor TABLE */
CREATE TABLE doctor_tb (
                        diagnosis VARCHAR(225),
                        medication VARCHAR(225),
                        times_taken INT,
                        times_per_day_week VARCHAR(10),
                        days_of_week VARCHAR(10),
                        med_frequency VARCHAR(10));


