USE TamaFit_db;

INSERT INTO accounts(user_name, user_password) VALUES ("exampleName1", "testPassword1");
INSERT INTO accounts(user_name, user_password) VALUES ("exampleName2", "testPassword2");

INSERT INTO workouts(workout_log, user_id, time_stamp) VALUES ("Ran ten minutes", 1, CURDATE());
INSERT INTO workouts(workout_log, user_id, time_stamp) VALUES ("Ran eleven minutes", 1, CURDATE());
INSERT INTO workouts(workout_log, user_id, time_stamp) VALUES ("Ran twelve minutes", 1, CURDATE());

INSERT INTO workouts(workout_log, user_id, time_stamp) VALUES ("Ran twenty minutes", 2, CURDATE());
INSERT INTO workouts(workout_log, user_id, time_stamp) VALUES ("Ran twenty two minutes", 2, CURDATE());
INSERT INTO workouts(workout_log, user_id, time_stamp) VALUES ("Ran twenty five minutes", 2, CURDATE());