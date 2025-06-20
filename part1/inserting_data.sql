INSERT INTO Users (username, email, password_hash, role) VALUES
('alice123','alice@example.com','hashed123','owner'),
('bobwalker','bob@example.com','hashed456','walker'),
('carol123','carol@example.com','hashed789','owner'),
('phucnguyen23', 'phucnguyen23@gmail.com', 'hashed609', 'walker'),
('uyen97','uyenha@gmail.com','hashed166','owner');

INSERT INTO Dogs (owner_id, name, size) VALUES
((SELECT user_id FROM Users WHERE username='alice123'), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username='carol123'), 'Bella', 'small'),
((SELECT user_id FROM Users WHERE username='uyen97'), 'Devin', 'large'),
((SELECT user_id FROM Users WHERE username='phucnguyen23'), 'Kiki', 'small'),
((SELECT user_id FROM Users WHERE username='uyen97'), 'Darge', 'medium');

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
((SELECT dog_id FROM Dogs WHERE name='Max' AND owner_id = (SELECT user_id FROM Users WHERE username='alice123')), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
((SELECT dog_id FROM Dogs WHERE name='Bella' AND owner_id = (SELECT user_id FROM Users WHERE username='carol123')), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),
((SELECT dog_id FROM Dogs WHERE name='Kiki' AND owner_id = (SELECT user_id FROM Users WHERE username='phucnguyen23')), '2025-06-20 18:30:00', 120, 'CBD', 'open'),
((SELECT dog_id FROM Dogs WHERE name='Darge' AND owner_id = (SELECT user_id FROM Users WHERE username='uyen97')), '2025-06-20 06:00:00', 60, 'Lockleys', 'open'),
((SELECT dog_id FROM Dogs WHERE name='Devin' AND owner_id = (SELECT user_id FROM Users WHERE username='uyen97')), '2025-06-11 10:00:00', 60, 'Aquinas college', 'accepted');
