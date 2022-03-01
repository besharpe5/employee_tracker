use employees;

INSERT INTO department (name)
VALUES
    ("Sales"), -- 1
    ("Marketing"), -- 2
    ("Engineering"), -- 3
    ("Support"), -- 4
    ("Human Resources"), -- 5
    ("Product"), -- 6
    ("Success"), -- 7
    ("Leadership"); -- 8

INSERT INTO roles (title, salary, department_id)
VALUES
    ("SMB Sales Representative", 55000, 1), -- 1
    ("SMB Sales Representative II", 55000, 1), -- 2
    ("Enterprise Sales Representative", 48000, 1), -- 3
    ("Sales Manager: SMB", 75000, 1), -- 4
    ("Sales Manager: Enterprise", 80000, 1), -- 5
    ("Social Media Manager", 45000, 2), -- 6
    ("SEO Specialist", 40000, 2), -- 7
    ("Public Relations Specialist", 42500, 2), -- 8
    ("Marketing Assistant", 38750, 2), -- 9
    ("Marketing Manager", 80000, 2), -- 10
    ("Junior Software Developer: Front End", 65500, 3), -- 11
    ("Junior Software Developer: Back End", 65500, 3), -- 12
    ("Software Developer: Front End", 75500, 3), -- 13
    ("Software Developer: Back End", 75500, 3), -- 14
    ("Senior Software Developer: Full Stack", 92000, 3), -- 15
    ("Engineering Manager", 110000, 3), -- 16
    ("Support Representative", 40000, 4), -- 17
    ("Support Representative II", 40000, 4), -- 18
    ("Support Representative III", 40000, 4), --19
    ("Product Support Specialist", 50000, 4), -- 20
    ("Support Manager", 62300, 4), -- 21
    ("HR Representative", 43500, 5), -- 22
    ("HR Representative II", 43500, 5), -- 23
    ("HR Manager", 70000, 5), -- 24
    ("Product Designer", 75000, 6), -- 25
    ("Junior Product Designer", 62500, 6), -- 26
    ("Product Marketer", 55000, 6), -- 27
    ("Product Owner", 58750, 6), -- 28
    ("Product Researcher", 58750, 6), -- 29
    ("Product Manager", 95000, 6), -- 30
    ("Account Manager: SMB", 55000, 7), -- 31
    ("Account Manager: SMB II", 55000, 7), -- 32
    ("Account Manager: Enterprise", 60000, 7), -- 33
    ("Account Manager: Enterprise II", 60000, 7), -- 34
    ("Project Manager", 65500, 7), -- 35
    ("Project Manager II", 65000, 7), -- 36
    ("Customer Success Manager", 80000, 7), -- 37
    ("CEO", 750000, 8), -- 38
    ("CFO", 250000, 8), -- 39
    ("CTO", 300000, 8), -- 40
    ("CLO", 250000, 8), -- 41
    ("CMO", 200000, 8), -- 42
    ("COO", 550500, 8); -- 43

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES
    ("Curtis", "Graham", 1, 4), -- SMB Sales Representative
    ("Zoe", "Short", 2, 4), -- SMB Sales Representative
    ("Kaitlyn", "Bass", 3, 5), -- Enterprise Sales Representative
    ("Ava", "Whalen", 4, 39), -- Sales Manager - SMB
    ("Andrew", "Casey", 5, 39), -- Sales Manager - Enterprise
    ("Bryson", "Hicks", 6, 10), -- Social Media Manager
    ("Mila", "Shepard", 7, 10), -- SEO Specialist
    ("Porter", "Sharpe", 8, 10), -- Public Relations Specialist
    ("Katie", "Stein", 9, 10), -- Marketing Assistant
    ("Jason", "Anderson", 10, 42), -- Marketing Manager
    ("Addison", "Norman", 11, 16), -- Junior Software Developer - Front End
    ("Chloe", "King", 12, 16), -- Junior Software Developer - Back End
    ("Justin", "Wiley", 13, 16), -- Software Developer - Front End
    ("Jakub", "Bolton", 14, 16), -- Software Developer - Back End
    ("Avery", "Mitchell", 15, 16), -- Senior Software Developer - Full Stack
    ("Sadie", "Snyder", 16, 40), -- Engineering Manager
    ("Jennifer", "Moss", 17, 21), -- Support Representative
    ("Alexus", "Kennedy", 18, 21), -- Support Representative
    ("Griffin", "Farley", 19, 21), -- Support Representative
    ("Aya", "Gomez", 20, 21), -- Product Support Specialist
    ("Austin", "Green", 21, 43), -- Support Manager
    ("Michael", "Decker", 22, 24), -- HR Representative
    ("Olivia", "Huff", 23, 24), -- HR Representative
    ("Amanda", "Tate", 24, 43), -- HR Manager
    ("Paul", "Goldstein", 25, 30), -- Product Designer
    ("Connor", "Potts", 26, 30), -- Junior Product Designer
    ("Maddie", "Dunn", 27, 30), -- Product Marketer
    ("Morgan", "Pratt", 28, 30), -- Product Owner
    ("Elizabeth", "Jennings", 29, 30), -- Product Researcher
    ("Daniel", "Fink", 30, 40), -- Product Manager
    ("Kevin", "Cain", 31, 37), -- Account Manager - SMB
    ("Layla", "Wright", 32, 37), -- Account Manager - SMB
    ("Sarah", "Nielson", 33, 37), -- Account Manager - Enterprise
    ("Ashlen", "Nisley", 34, 37), -- Account Manager - Enterprise
    ("Piper", "Blake", 35, 37), -- Project Manager
    ("Vince", "Johnson", 36, 37), -- Project Manager
    ("Caden", "Gray", 37, 43), -- Customer Success Manager
    ("Bailey", "Williams", 38, NULL), -- CEO
    ("Tova", "Goodman", 39, 38), -- CFO
    ("Carter", "Collins", 40, 38), -- CTO
    ("Tess", "Brandt", 41, 38), -- CLO
    ("Rory", "Henry", 42, 38), -- CMO
    ("Max", "Goodwin", 43, NULL); -- COO